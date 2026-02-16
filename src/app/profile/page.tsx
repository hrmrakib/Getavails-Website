"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  CreditCard,
  DollarSign,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Loader2,
  ArrowRight,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import {
  useConnectToStripeMutation,
  useDeleteProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useWithdrawMoneyMutation,
} from "@/redux/features/profile/profileAPI";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "@/service/authService";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

interface IUserProfile {
  id: string;
  created_at: string;
  updated_at: string;
  role: "user" | "admin";
  email: string;
  is_verified: boolean;
  is_active: boolean;
  is_admin: boolean;
  avatar: string;
  name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  location: string | null;
  balance: number;
  is_stripe_connected: boolean;
  subscription_name: string;
}

const libraries: any = ["places"];

export default function ProfilePage() {
  const [user, setUser] = useState<IUserProfile>({
    id: "",
    created_at: "",
    updated_at: "",
    role: "user",
    email: "",
    is_verified: false,
    is_active: false,
    is_admin: false,
    avatar: "",
    name: "",
    gender: "MALE",
    location: "",
    balance: 0,
    is_stripe_connected: false,
    subscription_name: "",
  });
  const router = useRouter();

  const [avatar, setAvatar] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [uploadImage, setUploadImage] = useState<File | null>(null);

  const [withdrawMoneyMutation] = useWithdrawMoneyMutation();
  const [connectToStripeMutation, { isLoading: isConnectingStripe }] =
    useConnectToStripeMutation();
  const [deleteProfileMutation, { isLoading: isDeletingProfile }] =
    useDeleteProfileMutation();
  const [hasToken, setHasToken] = useState(false);
  // google places auto-suggest
  const locationInputRef = useRef<HTMLInputElement>(null);
  const [mapsInstance, setMapsInstance] = useState<any>(null);
  // Add new state variables
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  // Google Autocomplete Ref
  const locationRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_PLACES_AUTO_SUGGESTION || "",
    libraries,
  });

  // google places auto-suggest
  // useEffect(() => {
  //   if (window.google?.maps) {
  //     setMapsInstance(window.google.maps);
  //     return;
  //   }

  //   const script = document.createElement("script");
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_AUTO_SUGGESTION}&libraries=places`;
  //   script.async = true;
  //   script.defer = true;

  //   script.onload = () => {
  //     setMapsInstance(window.google.maps);
  //   };

  //   document.head.appendChild(script);
  // }, []);

  useEffect(() => {
    if (!mapsInstance || !locationInputRef.current) return;

    const autocomplete = new mapsInstance.places.Autocomplete(
      locationInputRef.current,
      {
        types: ["geocode"], // homes + buildings
        fields: ["formatted_address", "geometry", "name"],
      },
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.formatted_address) {
        toast.error("Please select a location from the list");
        return;
      }

      setUser((prev) => ({
        ...prev,
        location: place.formatted_address,
      }));
    });

    return () => {
      mapsInstance.event.clearInstanceListeners(autocomplete);
    };
  }, [mapsInstance]);

  useEffect(() => {
    setHasToken(!!localStorage?.getItem("access_token"));
  }, []);

  const {
    data: profile,
    isLoading,
    refetch,
  } = useGetProfileQuery(undefined, {
    skip: !hasToken,
  });

  const [updateProfileMutation, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (profile?.data) {
      setUser({
        ...profile.data,
        location: profile.data.location ?? "",
      });
    }
  }, [profile]);

  const handleLogout = async () => {
    await logout();
    localStorage?.removeItem("access_token");
    localStorage?.removeItem("refresh_token");
    router.push("/login");
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);

    setUploadImage(file);
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      if (uploadImage) {
        formData.append("avatar", uploadImage!);
      }

      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("location_lat", lat !== null ? lat.toString() : "");
      formData.append("location_lng", lng !== null ? lng.toString() : "");
      formData.append("gender", user.gender);
      formData.append("location", user.location || "");

      const res = await updateProfileMutation(formData).unwrap();
      if (res?.success) {
        refetch();
        toast.success("Profile updated successfully");
      }
    } catch (error) {
    } finally {
      setIsUpdating(false);
    }
  };

  const handleConnectStripe = async () => {
    try {
      const res = await connectToStripeMutation({}).unwrap();

      if (res?.success) {
        window.open(res?.data?.url, "_blank");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Error connecting to Stripe");
    }
  };

  const handleWithdraw = async () => {
    const amount = Number.parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      return;
    }

    if (amount > user.balance) {
      return;
    }

    try {
      const res = await withdrawMoneyMutation({
        amount,
      }).unwrap();

      if (res?.success) {
        refetch();
        toast.success("Money withdrawn successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Error withdrawing money");
    } finally {
      setWithdrawAmount("");
      setShowWithdrawDialog(false);
      setIsWithdrawing(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") {
      return;
    }

    try {
      const res = await deleteProfileMutation({}).unwrap();

      if (res?.success) {
        toast.success("Account deleted successfully");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete account");
    }
  };

  const onPlaceChanged = () => {
    if (locationRef.current) {
      const place = locationRef.current.getPlace();

      setUser((prev) => ({
        ...prev,
        location: place.formatted_address || "",
      }));

      if (place.geometry && place.geometry.location) {
        setLat(place.geometry.location.lat());
        setLng(place.geometry.location.lng());
      }
    }
  };

  console.log(lat, lng);

  if (loadError) return <div>Error loading maps</div>;
  // if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100'>
      <div className='mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8'>
        {/* Profile Header */}
        <Card className='overflow-hidden border-0 shadow-sm'>
          <div className='h-16 sm:h-20' />
          <CardContent className='relative px-6 '>
            <div className='flex flex-col items-center sm:flex-row sm:items-end sm:gap-6'>
              <div className='relative -mt-16 sm:-mt-20'>
                {avatar ? (
                  <Avatar className='h-32 w-32 border-4 border-white shadow-xl ring-4 ring-white/50'>
                    <AvatarImage src={avatar} alt={user?.name} />
                    <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-500 text-3xl text-white'>
                      {user?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Image
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + user?.avatar}
                    alt={user?.name}
                    width={200}
                    height={200}
                    className='h-32 w-32 border-4 border-white shadow-xl ring-4 ring-white/50'
                  />
                )}

                <Button
                  size='icon'
                  className='absolute bottom-0 right-0 h-10 w-10 rounded-full shadow-lg'
                  onClick={handleAvatarClick}
                >
                  <Camera className='h-5 w-5' />
                </Button>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleAvatarChange}
                />
              </div>

              <div className='mt-4 flex-1 text-center sm:mt-0 sm:text-left'>
                <h1 className='text-2xl font-bold text-slate-900 sm:text-3xl'>
                  {user?.name}
                </h1>
                <p className='mt-1 text-sm text-slate-600'>{user?.email}</p>
                <div className='mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start'>
                  {user?.is_verified ? (
                    <Badge className='bg-green-100 text-green-700 hover:bg-green-100'>
                      <CheckCircle className='mr-1 h-3 w-3' />
                      Verified
                    </Badge>
                  ) : (
                    <Link href={`/verify-otp?email=${user?.email}`}>
                      <Badge className='bg-red-100 text-red-700 hover:bg-red-100'>
                        Not Verified
                      </Badge>
                    </Link>
                  )}
                  {user?.is_admin && (
                    <Badge className='bg-purple-100 text-purple-700 hover:bg-purple-100'>
                      Admin
                    </Badge>
                  )}
                  <Badge variant='secondary' className='capitalize'>
                    {user?.role}
                  </Badge>

                  {!user?.is_verified && (
                    <Link href={`/verify-otp?email=${user?.email}`}>
                      <Badge className='bg-red-100 text-red-700 hover:bg-red-100'>
                        Click to Verify <ArrowRight className='ml-1 h-3 w-3' />
                      </Badge>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className='mt-8 grid gap-6 lg:grid-cols-3'>
          {/* Left Column */}
          <div className='space-y-6 lg:col-span-2'>
            {/* Profile Information */}
            <Card className='border-0 shadow-lg'>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Full Name</Label>
                  <Input
                    id='name'
                    value={user?.name}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder='Enter your name'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email'>Email Address</Label>
                  <Input
                    id='email'
                    type='email'
                    value={user?.email}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder='Enter your email'
                  />
                </div>

                {/* Location / Address Field */}
                {isLoaded ? (
                  <Autocomplete
                    onLoad={(autocomplete) =>
                      (locationRef.current = autocomplete)
                    }
                    onPlaceChanged={onPlaceChanged}
                  >
                    <div className='space-y-2'>
                      <Label
                        htmlFor='location'
                        className='text-sm font-medium text-muted-foreground'
                      >
                        Location / Address
                      </Label>
                      <Input
                        id='location'
                        type='text'
                        placeholder='Enter Your Location / Address'
                        value={user.location ?? ""}
                        onChange={(e) =>
                          setUser((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                        required
                        className='h-12'
                      />
                    </div>
                  </Autocomplete>
                ) : (
                  <div className='space-y-2'>
                    <Label
                      htmlFor='location'
                      className='text-sm font-medium text-muted-foreground'
                    >
                      Location / Address
                    </Label>
                    <Input
                      id='location'
                      type='text'
                      placeholder='Enter Your Location / Address'
                      value={user.location ?? ""}
                      onChange={(e) =>
                        setUser((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      required
                      className='h-12'
                    />
                  </div>
                )}

                {/* Implement Google Location */}
                {/* <div className='space-y-2'>
                  <Label htmlFor='location'>Location</Label>
                  <Input
                    id='location'
                    type='text'
                    ref={locationInputRef}
                    value={user.location ?? ""}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, location: e.target.value }))
                    }
                    placeholder='Enter your location'
                  />
                </div> */}

                <div className='space-y-2'>
                  <Label htmlFor='gender'>Gender</Label>
                  <Select
                    value={user?.gender}
                    onValueChange={(value) =>
                      setUser((prev) => ({
                        ...prev,
                        gender: value as IUserProfile["gender"],
                      }))
                    }
                  >
                    <SelectTrigger id='gender'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='MALE'>Male</SelectItem>
                      <SelectItem value='FEMALE'>Female</SelectItem>
                      <SelectItem value='OTHER'>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex flex-row justify-between flex-wrap gap-5'>
                  <Button
                    onClick={handleUpdateProfile}
                    disabled={isUpdatingProfile}
                    className='w-full sm:w-auto bg-[#235789] hover:bg-[#235789]/90'
                  >
                    <span className='flex items-center'>
                      <Loader2
                        className={`mr-2 h-4 w-4 animate-spin ${
                          isUpdatingProfile ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <span>Save Changes</span>
                    </span>
                  </Button>

                  <Button
                    onClick={handleLogout}
                    className='w-full sm:w-auto bg-[#d35a2a] hover:bg-[#bb3d0b]/90'
                  >
                    Logout <LogOut />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Balance & Withdrawal */}
            <Card className='border-0 shadow-lg'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <div>
                    <CardTitle>Balance & Withdrawals</CardTitle>
                    <CardDescription>
                      Manage your earnings and payouts
                    </CardDescription>
                  </div>
                  <DollarSign className='h-8 w-8 text-green-600' />
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-6'>
                  <div>
                    <p className='text-sm font-medium text-slate-600'>
                      Available Balance
                    </p>
                    <p className='mt-2 text-4xl font-bold text-slate-900'>
                      ${user?.balance.toFixed(2)}
                    </p>
                  </div>
                </div>

                {!user?.is_stripe_connected ? (
                  <div className='space-y-3'>
                    <div className='flex items-start gap-3 rounded-lg bg-blue-50 p-4'>
                      <AlertTriangle className='mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600' />
                      <div className='text-sm text-blue-900'>
                        <p className='font-medium'>
                          Connect Stripe to withdraw funds
                        </p>
                        <p className='mt-1 text-blue-700'>
                          You need to connect your Stripe account to receive
                          payments
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleConnectStripe}
                      disabled={user?.is_stripe_connected}
                      className='w-full bg-[#235789] hover:bg-[#235789]/90'
                    >
                      {isConnectingStripe && (
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      )}
                      <CreditCard className='mr-2 h-4 w-4' />
                      Connect Stripe Account
                    </Button>
                  </div>
                ) : (
                  <div className='space-y-3'>
                    <div className='flex items-center gap-2 rounded-lg bg-green-50 p-3'>
                      <CheckCircle className='h-5 w-5 text-green-600' />
                      <span className='text-sm font-medium text-green-900'>
                        Stripe account connected
                      </span>
                    </div>
                    <Button
                      onClick={() => setShowWithdrawDialog(true)}
                      disabled={user.balance <= 0}
                      className='w-full'
                      variant='default'
                    >
                      <DollarSign className='mr-2 h-4 w-4' />
                      Withdraw Funds
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className='space-y-6'>
            {/* Subscription Card */}
            <Card className='border-0 shadow-lg'>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Your current plan</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 p-6'>
                  <p className='text-sm font-medium text-slate-600'>
                    Current Plan
                  </p>
                  <p className='mt-2 text-2xl font-bold text-slate-900'>
                    {user?.subscription_name || "Free"}
                  </p>
                  {/* <Badge
                    className={`mt-3 ${
                      user?.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user?.is_active ? "Active" : "Inactive"}
                  </Badge> */}
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className='border-0 border-red-200 bg-red-50/50 shadow-lg'>
              <CardHeader>
                <CardTitle className='text-red-700'>Danger Zone</CardTitle>
                <CardDescription>Irreversible account actions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant='destructive'
                  className='w-full'
                  disabled={isDeletingProfile}
                  onClick={() => setShowDeleteDialog(true)}
                >
                  {isDeletingProfile && <Trash2 className='mr-2 h-4 w-4' />}
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Withdraw Dialog */}
      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>
              Enter the amount you want to withdraw to your Stripe account
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='amount'>Amount ($)</Label>
              <Input
                id='amount'
                type='number'
                step='0.01'
                min='0'
                max={user?.balance}
                placeholder='0.00'
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
              <p className='text-sm text-slate-500'>
                Available balance: ${user?.balance.toFixed(2)}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => {
                setShowWithdrawDialog(false);
                setWithdrawAmount("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleWithdraw} disabled={isWithdrawing}>
              {isWithdrawing && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              Withdraw
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className='py-4'>
            <Label htmlFor='delete-confirm'>
              Type <span className='font-mono font-bold'>DELETE</span> to
              confirm
            </Label>
            <Input
              id='delete-confirm'
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder='DELETE'
              className='mt-2'
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteConfirmation("")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={deleteConfirmation !== "DELETE"}
              className='bg-red-600 hover:bg-red-700'
            >
              {isDeletingProfile && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
