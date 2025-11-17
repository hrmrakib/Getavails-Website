"use client";

import { useState } from "react";
import { Menu, X, Check } from "lucide-react";

// Agent data
const agents = [
  {
    id: 1,
    name: "Jony",
    email: "name@gmail.com",
    address: "UK",
    venue: "sfdfsdf",
    artist: "fsdfg",
    date: "10-10-2025",
    time: "10 AM to 10 PM",
    amount: "$1296.20",
  },
  {
    id: 2,
    name: "DJkola",
    email: "djkola@gmail.com",
    address: "USA",
    venue: "Music Hall",
    artist: "DJ Fresh",
    date: "12-10-2025",
    time: "8 PM to 12 AM",
    amount: "$1500.00",
  },
  {
    id: 3,
    name: "Washijm",
    email: "washijm@gmail.com",
    address: "Canada",
    venue: "Concert Arena",
    artist: "The Wave",
    date: "15-10-2025",
    time: "6 PM to 11 PM",
    amount: "$2000.00",
  },
];

export default function AgentDetailsPage() {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleConfirmed = () => {
    setStatus("confirmed");
    setTimeout(() => setStatus(null), 3000);
  };

  const handleCancel = () => {
    setStatus("cancelled");
    setTimeout(() => setStatus(null), 3000);
  };

  const selectAgent = (agent: (typeof agents)[0]) => {
    setSelectedAgent(agent);
    setSidebarOpen(false);
  };

  return (
    <div className='flex h-screen bg-background text-foreground'>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 md:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop visible, Mobile as drawer */}
      <aside
        className={`fixed md:static w-64 h-screen bg-card border-r border-border transition-transform duration-300 z-50 md:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className='p-6'>
          <h2 className='text-lg font-semibold mb-6 text-foreground'>Agents</h2>
          <nav className='space-y-2'>
            {agents.map((agent, index) => (
              <button
                key={agent.id}
                onClick={() => selectAgent(agent)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedAgent.id === agent.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span className='font-medium'>{index + 1}.</span> {agent.name}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className='flex-1 flex flex-col overflow-hidden'>
        {/* Mobile header */}
        <div className='md:hidden flex items-center justify-between p-4 border-b border-border bg-card'>
          <h1 className='text-xl font-bold'>Details</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='p-2 hover:bg-muted rounded-lg transition-colors'
            aria-label='Toggle menu'
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
          <div className='p-6 md:p-12 max-w-2xl mx-auto w-full'>
            {/* Desktop heading */}
            <h1 className='hidden md:block text-4xl font-bold mb-12 text-foreground'>
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

            {/* Details grid */}
            <div className='space-y-6'>
              {/* Agent Name */}
              <div className='flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-border'>
                <label className='text-base font-medium text-muted-foreground mb-2 md:mb-0'>
                  Agent Name
                </label>
                <span className='text-lg font-medium text-foreground'>
                  {selectedAgent.name}
                </span>
              </div>

              {/* Email */}
              <div className='flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-border'>
                <label className='text-base font-medium text-muted-foreground mb-2 md:mb-0'>
                  Email
                </label>
                <span className='text-lg font-medium text-foreground'>
                  {selectedAgent.email}
                </span>
              </div>

              {/* Address */}
              <div className='flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-border'>
                <label className='text-base font-medium text-muted-foreground mb-2 md:mb-0'>
                  Address
                </label>
                <span className='text-lg font-medium text-foreground'>
                  {selectedAgent.address}
                </span>
              </div>

              {/* Venue */}
              <div className='flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-border'>
                <label className='text-base font-medium text-muted-foreground mb-2 md:mb-0'>
                  Venue
                </label>
                <span className='text-lg font-medium text-foreground'>
                  {selectedAgent.venue}
                </span>
              </div>

              {/* Artist */}
              <div className='flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-border'>
                <label className='text-base font-medium text-muted-foreground mb-2 md:mb-0'>
                  Artist
                </label>
                <span className='text-lg font-medium text-foreground'>
                  {selectedAgent.artist}
                </span>
              </div>

              {/* Date */}
              <div className='flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-border'>
                <label className='text-base font-medium text-muted-foreground mb-2 md:mb-0'>
                  Date
                </label>
                <span className='text-lg font-medium text-foreground'>
                  {selectedAgent.date}
                </span>
              </div>

              {/* Time */}
              <div className='flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-border'>
                <label className='text-base font-medium text-muted-foreground mb-2 md:mb-0'>
                  Time
                </label>
                <span className='text-lg font-medium text-foreground'>
                  {selectedAgent.time}
                </span>
              </div>

              {/* Amount */}
              <div className='flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-border'>
                <label className='text-base font-medium text-muted-foreground mb-2 md:mb-0'>
                  Amount
                </label>
                <span className='text-lg font-medium text-foreground'>
                  {selectedAgent.amount}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className='flex flex-col sm:flex-row gap-4 mt-12'>
              <button
                onClick={handleCancel}
                className='flex-1 px-6 py-3 border-2 border-foreground text-foreground font-semibold rounded-lg hover:bg-muted transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmed}
                className='flex-1 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity'
              >
                Confirmed
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
