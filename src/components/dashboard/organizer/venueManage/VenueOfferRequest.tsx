/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Menu, X, Check, Loader2 } from "lucide-react";
import {
  useAcceptAgentOfferMutation,
  useGetVenueOfferRequestQuery,
} from "@/redux/features/organizer/organizerAPI";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IOfferRequest {
  id: string;
  created_at: string;
  updated_at: string;
  status: "PENDING" | "APPROVED" | "CANCELLED";
  approved_at: string | null;
  cancelled_at: string | null;
  amount: number;
  start_date: string;
  end_date: string;
  agent_id: string;
  artist_id: string;
  organizer_id: string;
  location: string;

  artist: {
    id: string;
    name: string;
    avatar: string;
    email: string;
    availability: string[];
  };

  agent: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    availability: string[];
  };
}

export default function AgentDetailsPage({
  searchQuery,
}: {
  searchQuery: string;
}) {
  const [selectedAgent, setSelectedAgent] = useState<IOfferRequest | null>(
    null
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const limit = 10;

  const [status, setStatus] = useState<string | null>(null);

  const { data: agentOffer, isLoading } = useGetVenueOfferRequestQuery({
    page,
    limit,
    search: searchQuery,
  });
  const [acceptAgentOfferMutation, { isLoading: isAccepting }] =
    useAcceptAgentOfferMutation();

  // Set first item automatically
  useEffect(() => {
    if (agentOffer?.data?.length) {
      setSelectedAgent(agentOffer.data[0]);
    }
  }, [agentOffer?.data]);

  const handlePaymentModal = (id: string) => {
    setOpenModal(true);
    setCurrentId(id);
  };

  const handleConfirmed = async () => {
    if (!selectedAgent) return;

    try {
      setOpenModal(true);
      const res = await acceptAgentOfferMutation({
        offer_id: currentId,
      }).unwrap();

      console.log(res);

      if (res?.success) {
        window.open(res?.data?.url, "_blank");
        setStatus("confirmed");
      }
    } catch (error) {
      console.error("Error accepting offer:", error);
    } finally {
      setStatus(null);
      setOpenModal(false);
    }
  };

  const handleCancel = () => {
    setStatus("cancelled");
    setTimeout(() => setStatus(null), 3000);
  };

  const selectAgent = (agent: IOfferRequest) => {
    setSelectedAgent(agent);
    setSidebarOpen(false);
  };

  if (isLoading) {
    return <p className='p-6 text-center'>Loading...</p>;
  }

  if (!agentOffer?.data?.length) {
    return <p className='p-6 text-center'>No offers found.</p>;
  }

  return (
    <div className='flex h-screen bg-background text-foreground'>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 md:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen bg-card border-r border-border transition-transform duration-300 z-50 md:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className='p-6'>
          <h2 className='text-lg font-semibold mb-6'>Venue Offers</h2>

          <nav className='space-y-2'>
            {agentOffer.data.map((agent: IOfferRequest, index: number) => (
              <button
                key={agent.id}
                onClick={() => selectAgent(agent)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedAgent?.id === agent.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "hover:bg-muted"
                }`}
              >
                <span className='font-medium'>{index + 1}.</span>{" "}
                {agent.artist.name}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className='flex-1 flex flex-col overflow-hidden'>
        {/* Mobile top bar */}
        <div className='md:hidden flex items-center justify-between p-4 border-b bg-card'>
          <h1 className='text-xl font-bold'>Details</h1>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='p-2 hover:bg-muted rounded-lg'
          >
            {sidebarOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>

        {/* Content area */}
        <div className='flex-1 overflow-auto'>
          <div className='p-6 md:p-12 max-w-2xl mx-auto'>
            {/* Desktop heading */}
            <h1 className='hidden md:block text-4xl font-bold mb-12'>
              Details
            </h1>

            {/* Status message */}
            {status && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
                  status === "confirmed"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                <Check className='w-5 h-5' />
                {status === "confirmed"
                  ? "Booking confirmed successfully!"
                  : "Booking cancelled."}
              </div>
            )}

            {/* Ensure selectedAgent exists */}
            {selectedAgent && (
              <div className='space-y-6'>
                <Field label='Agent Name' value={selectedAgent.agent.name} />
                <Field label='Agent Email' value={selectedAgent.agent.email} />

                <Field label='Artist Name' value={selectedAgent.artist.name} />
                <Field
                  label='Artist Email'
                  value={selectedAgent.artist.email}
                />

                <Field label='Location' value={selectedAgent.location} />
                <Field
                  label='Start Date'
                  value={selectedAgent.start_date.split("T")[0]}
                />
                <Field
                  label='End Date'
                  value={selectedAgent.end_date.split("T")[0]}
                />

                <Field label='Amount' value={`$${selectedAgent.amount}`} />
              </div>
            )}

            {/* Action buttons */}
            <div className='flex flex-col sm:flex-row gap-4 mt-12'>
              <button
                onClick={handleCancel}
                className='flex-1 px-6 py-3 border-2 border-foreground rounded-lg hover:bg-muted font-semibold'
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  selectedAgent && handlePaymentModal(selectedAgent.id)
                }
                className='flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <form>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle className='text-center text-2xl lg:text-5xl mb-5'>
                Payment
              </DialogTitle>
              <DialogDescription className='text-sm lg:text-lg'>
                You need to deposit $1250 to us for the artist you want to hire
                through XYZ agent. Once you send the request and the agent
                confirms, we’ll hold the amount securely. After you successfully
                complete the event, we’ll release the payment to the agent. If
                you agree, please click the “Pay Now” button below.
              </DialogDescription>
            </DialogHeader>
            <div className='flex items-center justify-between gap-4 my-5'>
              <h2 className='text-lg font-semibold'>Amount :</h2>
              <h2 className='text-lg font-semibold'>$780</h2>
            </div>
            <DialogFooter className='py-6'>
              <Button
                onClick={() => handleConfirmed()}
                type='submit'
                className='w-full h-11 bg-[#235789]'
              >
                Pay Now {isAccepting && <Loader2 className='animate-spin' />}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

/** Reusable field */
function Field({ label, value }: { label: string; value: any }) {
  return (
    <div className='flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b'>
      <label className='text-base font-medium text-muted-foreground mb-2 md:mb-0'>
        {label}
      </label>
      <span className='text-lg font-medium'>{value}</span>
    </div>
  );
}
