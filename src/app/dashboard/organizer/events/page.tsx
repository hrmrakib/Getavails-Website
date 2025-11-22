"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Edit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useCreateNewEventMutation,
  useEndEventMutation,
  useGetEventListQuery,
  useUpdateEventMutation,
} from "@/redux/features/events/eventsAPI";
import { toast } from "sonner";

interface Event {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  status: "UPCOMING" | "LIVE" | "COMPLETED" | "CANCELLED" | string;
  title: string;
  description: string;
  images: string[];
  location: string;
  ticket_price: number;
  start_date: string;
  end_date: string;
  artist_names: string[];
  organizer_id: string;
  capacity: number;
  available_capacity: number;
  can_buy_tickets: boolean;
  total_ticket_sold: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "event-list" | "completed" | "add-event" | "edit-event"
  >("event-list");
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    location: "",
    description: "",
    ticketPrice: "",
    capacity: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    image: "" as string | null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadImagePreview, setUploadImagePreview] = useState<string | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [eventId, setEventId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: eventList, refetch } = useGetEventListQuery({
    status: activeTab === "event-list" ? "running" : "completed",
  });

  useEffect(() => {
    if (activeTab === "add-event") {
      setFormData({
        title: "",
        artist: "",
        location: "",
        description: "",
        ticketPrice: "",
        capacity: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        image: "" as string | null,
      });
    }
  }, [activeTab]);

  const [endEventMutation, { isLoading: isEnding }] = useEndEventMutation();
  const [updateEventMutation] = useUpdateEventMutation();
  const [createNewEventMutation] = useCreateNewEventMutation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildEventPayload = () => {
    const startIso = new Date(
      `${formData.startDate}T${formData.startTime}:00`
    ).toISOString();
    const endIso = new Date(
      `${formData.endDate}T${formData.endTime}:00`
    ).toISOString();

    return {
      event_id: eventId ?? undefined,
      artist_names: formData.artist.split(",").map((a) => a.trim()),
      capacity: Number(formData.capacity),
      title: formData.title,
      description: formData.description,
      location: formData.location,
      ticket_price: Number(formData.ticketPrice),
      start_date: startIso,
      end_date: endIso,
      published_at: new Date().toISOString(),
      status: "UPCOMING",
    };
  };

  const handlePublishEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }

    const payload = buildEventPayload();

    const formDataToSend = new FormData();

    if (imageFile) {
      formDataToSend.append("images", imageFile);
    }
    formDataToSend.append("data", JSON.stringify(payload));

    console.log("FORM DATA:", payload);

    try {
      const res = await createNewEventMutation(formDataToSend).unwrap();
      console.log(res);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleEditEvent = (event: Event) => {
    setActiveTab("edit-event");
    setEventId(event.id);

    const start = new Date(event.start_date);
    const end = new Date(event.end_date);

    setFormData({
      title: event.title,
      artist: event.artist_names.join(", "),
      location: event.location,
      description: event.description,
      ticketPrice: event.ticket_price.toString(),
      capacity: event.capacity.toString(),

      startDate: start.toISOString().split("T")[0],
      startTime: start.toISOString().split("T")[1].slice(0, 5),

      endDate: end.toISOString().split("T")[0],
      endTime: end.toISOString().split("T")[1].slice(0, 5),

      image: event.images[0],
    });

    setImageFile(null);
    setPreviewImage(event.images[0]);
  };

  const handleEndEventModal = (eventId: string) => {
    setEventId(eventId);
    setOpenModal(true);
  };

  const handleUpdateEvent = async () => {
    const payload = buildEventPayload();

    const formDataToSend = new FormData();

    if (imageFile) {
      formDataToSend.append("images", imageFile);
    }

    formDataToSend.append("data", JSON.stringify(payload));

    try {
      const res = await updateEventMutation(formDataToSend).unwrap();

      console.log(res);
      if (res?.success) {
        refetch();
        setActiveTab("event-list");
        toast.success("Event updated successfully");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      console.log("finally");
    }
  };

  const handleEndEvent = async () => {
    console.log(eventId);
    try {
      const res = await endEventMutation({
        event_id: eventId,
      }).unwrap();

      console.log(res);
      if (res?.success) {
        refetch();
        toast.success("Event ended successfully");
      }
    } catch (error) {
      console.error("Error ending event:", error);
      toast.error("Error ending event");
    } finally {
      setOpenModal(false);
    }
  };

  return (
    <main className='min-h-screen bg-gray-50'>
      <div className='mx-auto container'>
        <div className='sticky top-0 z-40 bg-transparent'>
          <div className='px-4 py-6 sm:px-6 md:px-8'>
            <div className='flex gap-8'>
              <button
                onClick={() => setActiveTab("event-list")}
                className={`px-0 py-2 font-medium text-base transition-colors ${
                  activeTab === "event-list"
                    ? "text-[#235789] border-b-2 border-[#235789]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Event List
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-0 py-2 font-medium text-base transition-colors ${
                  activeTab === "completed"
                    ? "text-[#235789] border-b-2 border-[#235789]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Completed
              </button>

              <button
                onClick={() => setActiveTab("add-event")}
                className={`w-full px-4 py-2 ${
                  activeTab === "add-event"
                    ? "bg-[#235789] "
                    : "bg-[#235789] shadow-md"
                } font-medium rounded-lg hover:bg-[#114c68] text-white  transition-colors sm:w-auto cursor-pointer`}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>

        <div className='px-4 py-8 sm:px-6 md:px-8'>
          {(activeTab === "event-list" || activeTab === "completed") && (
            <div>
              <h2 className='mb-6 text-2xl font-bold text-gray-900'>
                {activeTab === "event-list"
                  ? "Ongoing Events"
                  : "Completed Events"}
              </h2>

              {eventList?.data?.length === 0 ? (
                <div className='rounded-lg border border-gray-200 bg-white p-8 text-center'>
                  <p className='text-gray-500'>
                    No {activeTab === "event-list" ? "ongoing" : "completed"}{" "}
                    events
                  </p>
                </div>
              ) : (
                <div className='grid gap-4 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                  {eventList?.data?.map((event: Event) => (
                    <div
                      key={event.id}
                      className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow'
                    >
                      <h3 className='mb-4 text-xl lg:text-2xl font-bold text-gray-900'>
                        {event.title}
                      </h3>
                      <ul className='mb-6 space-y-2 text-base text-[#1E1E1E] font-medium'>
                        <li>• Artist: {event.artist_names.join(", ")}</li>
                        <li>• Location: {event.location}</li>
                        <li>
                          • Start Date: {event.start_date.split("T")[0]} - (
                          {event.start_date.split("T")[1].split(".")[0]})
                        </li>
                        <li>
                          • End Date: {event.end_date.split("T")[0]} - (
                          {event.start_date.split("T")[1].split(".")[0]})
                        </li>
                        <li>• Capacity: ${event.capacity}</li>
                        <li>• Total spent: ${event.ticket_price}</li>
                      </ul>
                      <div className='flex items-center gap-5'>
                        <button
                          onClick={() =>
                            activeTab === "event-list" &&
                            handleEndEventModal(event.id)
                          }
                          disabled={activeTab === "completed"}
                          className={`w-full rounded-lg bg-gray-200 py-2 font-medium text-gray-900 hover:bg-gray-300 transition-colors ${
                            activeTab === "completed"
                              ? "bg-[#E9EEF3] disabled:cursor-not-allowed disabled:opacity-50"
                              : "cursor-pointer"
                          }`}
                        >
                          {activeTab === "event-list"
                            ? "End Event"
                            : "Completed Event"}
                        </button>
                        <button
                          disabled={activeTab === "completed"}
                          onClick={() => handleEditEvent(event)}
                          className='disabled:cursor-not-allowed disabled:opacity-50'
                        >
                          <Edit className='text-[#4b4d4e]' />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {(activeTab === "add-event" || activeTab === "edit-event") && (
            <div className='max-w-2xl mx-auto'>
              <h2 className='mb-8 text-2xl font-bold text-gray-900'>
                {activeTab === "add-event" ? "Add New Event" : "Edit Event"}
              </h2>

              <form onSubmit={handlePublishEvent} className='space-y-6'>
                {/* <div className='rounded-lg border-2 border-dashed border-gray-300 p-8'>
                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                  />

                  <button
                    type='button'
                    onClick={() => fileInputRef.current?.click()}
                    className='w-full'
                  >
                    {formData.image && previewImage ? (
                      <div className='space-y-4'>
                        <Image
                          src={
                            previewImage
                              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${previewImage}`
                              : "/default.jpg"
                          }
                          alt='Preview'
                          width={600}
                          height={300}
                          unoptimized
                          className='mx-auto h-40 w-full object-cover rounded'
                        />

                        <p className='text-sm text-[#235789] hover:text-[#235789]'>
                          Change Picture
                        </p>
                      </div>
                    ) : (
                      <div className='space-y-2'>
                        <div className='mx-auto h-32 w-full bg-blue-100 rounded flex items-center justify-center'>
                          <p className='text-gray-600'>Add Picture</p>
                        </div>
                      </div>
                    )}
                  </button>
                </div> */}

                <div className='rounded-lg border-2 border-dashed border-gray-300 p-8'>
                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                  />

                  <button
                    type='button'
                    onClick={() => fileInputRef.current?.click()}
                    className='w-full'
                  >
                    {previewImage || formData.image ? (
                      <div className='space-y-4'>
                        <Image
                          src={
                            // If selecting a new file → preview BASE64
                            previewImage
                              ? previewImage
                              : // If editing → show existing image URL
                                `${process.env.NEXT_PUBLIC_IMAGE_URL}${formData.image}`
                          }
                          alt='Preview'
                          width={600}
                          height={300}
                          unoptimized
                          className='mx-auto h-40 w-full object-cover rounded'
                        />

                        <p className='text-sm text-[#235789]'>Change Picture</p>
                      </div>
                    ) : (
                      <div className='space-y-2'>
                        <div className='mx-auto h-32 w-full bg-blue-100 rounded flex items-center justify-center'>
                          <p className='text-gray-600'>Add Picture</p>
                        </div>
                      </div>
                    )}
                  </button>
                </div>

                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <label
                      htmlFor='title'
                      className='text-gray-900 font-medium'
                    >
                      Event Title
                    </label>
                    <input
                      type='text'
                      name='title'
                      placeholder='Event Title'
                      value={formData.title}
                      onChange={handleFormChange}
                      className='w-full rounded-lg mt-2 border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='description'
                      className='text-gray-900 font-medium'
                    >
                      Description
                    </label>
                    <textarea
                      name='description'
                      placeholder='Event Description'
                      value={formData.description}
                      onChange={handleFormChange}
                      rows={3}
                      className='w-full rounded-lg mt-2 border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='location'
                      className='text-gray-900 font-medium'
                    >
                      Location
                    </label>
                    <input
                      type='text'
                      name='location'
                      placeholder='Enter Location'
                      value={formData.location}
                      onChange={handleFormChange}
                      className='w-full rounded-lg mt-2 border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='ticketPrice'
                      className='text-gray-900 font-medium'
                    >
                      Ticket Price
                    </label>
                    <input
                      type='number'
                      name='ticketPrice'
                      placeholder='Ticket Price'
                      value={formData.ticketPrice}
                      onChange={handleFormChange}
                      className='w-full rounded-lg mt-2 border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='capacity'
                      className='text-gray-900 font-medium'
                    >
                      Capacity
                    </label>
                    <input
                      type='number'
                      name='capacity'
                      placeholder='Capacity'
                      value={formData.capacity}
                      onChange={handleFormChange}
                      className='w-full rounded-lg mt-2 border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                    />
                  </div>

                  {/* start date and time */}
                  <div className='space-y-2'>
                    <label
                      htmlFor='startDate'
                      className='text-gray-900 font-medium'
                    >
                      Start Date
                    </label>
                    <input
                      type='date'
                      name='startDate'
                      value={formData.startDate}
                      onChange={handleFormChange}
                      className='w-full rounded-lg mt-2 border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='startTime'
                      className='text-gray-900 font-medium'
                    >
                      Start Time
                    </label>
                    <input
                      type='time'
                      name='startTime'
                      value={formData.startTime}
                      onChange={handleFormChange}
                      className='w-full rounded-lg mt-2 border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                    />
                  </div>

                  {/* end date and time */}
                  <div className='space-y-2'>
                    <label
                      htmlFor='endDate'
                      className='text-gray-900 font-medium'
                    >
                      End Date
                    </label>
                    <input
                      type='date'
                      name='endDate'
                      value={formData.endDate}
                      onChange={handleFormChange}
                      className='w-full rounded-lg mt-2 border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='endTime'
                      className='text-gray-900 font-medium'
                    >
                      End Time
                    </label>
                    <input
                      type='time'
                      name='endTime'
                      value={formData.endTime}
                      onChange={handleFormChange}
                      className='w-full rounded-lg mt-2 border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='title'
                      className='text-gray-900 font-medium'
                    >
                      Artist Name
                    </label>
                    <input
                      type='text'
                      name='artist'
                      placeholder='Artist Name'
                      value={formData.artist}
                      onChange={handleFormChange}
                      className='w-full rounded-lg mt-2 border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      required
                    />
                  </div>
                </div>

                <button
                  type='button'
                  onClick={(e) => {
                    if (activeTab === "edit-event") {
                      handleUpdateEvent();
                    } else {
                      handlePublishEvent(e);
                    }
                  }}
                  className='w-full rounded-lg mt-2 bg-[#235789] py-3 font-bold text-white hover:bg-[#14528b] transition-colors cursor-pointer'
                >
                  {activeTab === "edit-event"
                    ? "Update Event"
                    : "Publish Event"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <form>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle className='text-center mb-6'>
                <span>⚠️</span> End Event
              </DialogTitle>
              <DialogDescription className='text-lg text-center leading-8'>
                Once you end the event, you will not be able to undo this
                action. To make changes, you will need to create a new event.
              </DialogDescription>
            </DialogHeader>
            <p className='text-xl  text-center mt-2'>
              Are you sure you want to proceed with ending this event?
            </p>
            <DialogFooter className='py-6 w-full flex items-center justify-between gap-5'>
              <Button
                onClick={() => handleEndEvent()}
                className='flex-1 h-10 bg-[#235789] hover:bg-red-400 transform transition duration-300 ease-in-out'
                type='submit'
              >
                End Event {isEnding && <Loader2 className='animate-spin' />}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </main>
  );
}
