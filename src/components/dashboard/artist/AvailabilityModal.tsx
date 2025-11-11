"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, X } from "lucide-react";
import { useMemo, useState } from "react";

interface DateModalProps {
  availability: string[];
  onSelect?: (pickedIsoDate: string) => void;
}

const toIsoDate = (d: Date) => {
  return d.toISOString().slice(0, 10);
};

const isoToDateParts = (iso: string) => {
  const d = new Date(iso);
  return { year: d.getFullYear(), month: d.getMonth(), date: d.getDate() };
};

export const AvailabilityModal = ({
  availability,
  onSelect,
}: DateModalProps) => {
  const [open, setOpen] = useState(false);
  const [selectedIso, setSelectedIso] = useState<string | null>(null);

  // Convert availability ISO strings -> Set of YYYY-MM-DD for quick lookup
  const availableSet = useMemo(() => {
    const s = new Set<string>();
    (availability || []).forEach((iso) => {
      try {
        const isoDate = toIsoDate(new Date(iso));
        s.add(isoDate);
      } catch {
        // ignore parse errors
      }
    });
    return s;
  }, [availability]);

  const { yearToShow, monthToShow } = useMemo(() => {
    if (availability && availability.length > 0) {
      try {
        const first = new Date(availability[0]);
        return {
          yearToShow: first.getFullYear(),
          monthToShow: first.getMonth(),
        };
      } catch {
        const now = new Date();
        return { yearToShow: now.getFullYear(), monthToShow: now.getMonth() };
      }
    } else {
      const now = new Date();
      return { yearToShow: now.getFullYear(), monthToShow: now.getMonth() };
    }
  }, [availability]);

  const calendarDays = useMemo(() => {
    const year = yearToShow;
    const month = monthToShow;
    const firstDay = new Date(year, month, 1);
    const startWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // leading blanks
    const blanks = Array.from({ length: startWeekday }, (_, i) => null);

    // days
    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const iso = new Date(year, month, day).toISOString().slice(0, 10);
      const isAvailable = availableSet.has(iso);
      return { day, iso, isAvailable };
    });

    return [...blanks, ...days];
  }, [yearToShow, monthToShow, availableSet]);

  const handlePick = (iso: string, isAvailable: boolean) => {
    if (!isAvailable) return;
    setSelectedIso(iso);
    if (onSelect) onSelect(iso);
  };

  const monthName = new Date(yearToShow, monthToShow, 1).toLocaleString(
    undefined,
    {
      month: "long",
    }
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='flex items-center gap-2 text-[#235789] hover:text-[#1b4466] font-medium'
      >
        <Eye className='w-4 h-4' />
        <span>View Dates</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-md w-[min(95%,520px)] mx-auto'>
          <DialogHeader>
            <div className='flex items-center justify-between'>
              <DialogTitle className='text-center text-lg font-semibold text-[#235789]'>
                Agent Availability
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className='w-full flex flex-col items-center justify-center py-4'>
            <div className='text-center font-medium mb-3'>
              {monthName} {yearToShow}
            </div>

            <div className='grid grid-cols-7 gap-2 text-sm text-center w-full px-2'>
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <div key={d} className='font-semibold text-gray-500'>
                  {d}
                </div>
              ))}

              {calendarDays.map((cell, idx) =>
                cell === null ? (
                  <div key={`blank-${idx}`} />
                ) : (
                  <button
                    key={cell.iso}
                    onClick={() => handlePick(cell.iso, cell.isAvailable)}
                    disabled={!cell.isAvailable}
                    className={`flex items-center justify-center rounded-full w-9 h-9 mx-auto transition-colors duration-150
                      ${
                        cell.isAvailable
                          ? "cursor-pointer"
                          : "text-gray-300 cursor-not-allowed"
                      }
                      ${
                        cell.isAvailable && selectedIso === cell.iso
                          ? "bg-[#1b4466] text-white"
                          : ""
                      }
                      ${
                        cell.isAvailable && selectedIso !== cell.iso
                          ? "bg-[#235789] text-white hover:bg-[#1b4466]"
                          : ""
                      }
                    `}
                    aria-pressed={selectedIso === cell.iso}
                    aria-disabled={!cell.isAvailable}
                    title={cell.isAvailable ? "Available" : "Unavailable"}
                  >
                    {cell.day}
                  </button>
                )
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
