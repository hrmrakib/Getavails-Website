"use client";

export type Event = {
  id: string;
  agent: string;
  artist: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  amountRange: string;
  status: "pending" | "completed";
  documents?: string[];
};
interface EventsListProps {
  events: Event[];
  tab: string;
}

export default function EventsList({ events, tab }: EventsListProps) {
  const getTabTitle = () => {
    switch (tab) {
      case "total":
        return "All Events";
      case "pending":
        return "Pending Events";
      case "completed":
        return "Completed Events";
      default:
        return "Events";
    }
  };

  if (events.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-muted-foreground text-lg'>
          No {getTabTitle().toLowerCase()} found
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className='text-2xl font-bold text-foreground mb-6'>
        {getTabTitle()}
      </h2>
      <div className='grid gap-4 md:gap-6'>
        {events.map((event) => (
          <div
            key={event.id}
            className='bg-card border border-border rounded-lg p-4 md:p-6 hover:shadow-md transition-all'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
              {/* Left Column */}
              <div className='space-y-4'>
                <div>
                  <p className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                    Artist
                  </p>
                  <p className='text-lg font-bold text-foreground'>
                    {event.artist}
                  </p>
                </div>
                <div>
                  <p className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                    Venue
                  </p>
                  <p className='text-foreground'>{event.venue}</p>
                </div>
                <div>
                  <p className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                    Location
                  </p>
                  <p className='text-foreground'>{event.location}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className='space-y-4'>
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                      Agent
                    </p>
                    <p className='text-foreground'>{event.agent}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      event.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
                <div>
                  <p className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                    Date & Time
                  </p>
                  <p className='text-foreground'>{event.date}</p>
                  <p className='text-sm text-muted-foreground'>{event.time}</p>
                </div>
                <div>
                  <p className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                    Amount Range
                  </p>
                  <p className='text-foreground font-semibold'>
                    {event.amountRange}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
