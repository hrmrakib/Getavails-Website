"use client";

interface EventTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  totalCount: number;
  pendingCount: number;
  completedCount: number;
}

export default function EventTabs({
  activeTab,
  onTabChange,
  totalCount,
  pendingCount,
  completedCount,
}: EventTabsProps) {
  const tabs = [
    { id: "create", label: "Create New" },
    { id: "total", label: `Total (${totalCount})` },
    { id: "pending", label: `Pending (${pendingCount})` },
    { id: "completed", label: `Completed (${completedCount})` },
  ];

  return (
    <div className='flex flex-wrap gap-2 md:gap-4'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            activeTab === tab.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
