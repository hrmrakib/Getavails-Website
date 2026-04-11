"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  preferredTime: string;
  budgetRange: string;
  notes: string;
}

// Available dates per month for 2025
const AVAILABLE_DATES_BY_MONTH: Record<number, number[]> = {
  0: [5, 6, 7, 12, 13], // January - 5 available dates
  1: [1, 2, 3, 4, 8, 9, 10, 15], // February - 8 available dates
  2: [1, 2, 3, 4, 5, 6, 7], // March - 7 available dates
  3: [2, 3, 4, 5, 9, 10], // April - 6 available dates
  4: [1, 2, 3, 8, 9, 10, 15], // May - 7 available dates
  5: [4, 5, 6, 11, 12, 13], // June - 6 available dates
  6: [2, 3, 4, 9, 10, 11], // July - 6 available dates
  7: [1, 2, 7, 8, 14, 15], // August - 6 available dates
  8: [3, 4, 5, 10, 11, 12], // September - 6 available dates
  9: [1, 2, 8, 9, 15, 16], // October - 6 available dates
  10: [3, 4, 5, 10, 11], // November - 5 available dates
  11: [2, 3, 9, 10, 16], // December - 5 available dates
};

// Booked dates per month for 2025
const BOOKED_DATES_BY_MONTH: Record<number, number[]> = {
  0: [14, 15, 16, 20, 21],
  1: [11, 12, 18, 19, 22],
  2: [8, 9, 10, 15, 16, 17],
  3: [6, 7, 8, 12, 13],
  4: [4, 5, 6, 11, 12],
  5: [2, 3, 7, 8, 9],
  6: [5, 6, 12, 13, 14],
  7: [3, 4, 9, 10, 11],
  8: [6, 7, 13, 14, 15],
  9: [3, 4, 10, 11, 12],
  10: [6, 7, 12, 13, 14],
  11: [4, 5, 11, 12, 13],
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function BookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // March (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [activeTab, setActiveTab] = useState<"available" | "booked">(
    "available",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    budgetRange: "",
    notes: "",
  });

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const daysInPreviousMonth = getDaysInMonth(
    previousMonth,
    currentMonth === 0 ? currentYear - 1 : currentYear,
  );

  const calendarDays = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPreviousMonth - i,
      isCurrentMonth: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
    });
  }

  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
    });
  }

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getAvailableDates = (month: number) =>
    AVAILABLE_DATES_BY_MONTH[month] || [];
  const getBookedDates = (month: number) => BOOKED_DATES_BY_MONTH[month] || [];

  const handleDateClick = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;

    const availableDates = getAvailableDates(currentMonth);
    const isAvailable = availableDates.includes(day);

    if (activeTab === "available" && isAvailable) {
      setSelectedDate(day);
      setIsModalOpen(true);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", {
      date: `${selectedDate} ${MONTHS[currentMonth]} ${currentYear}`,
      ...formData,
    });
    setIsModalOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      preferredTime: "",
      budgetRange: "",
      notes: "",
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 p-4 sm:p-8'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-6'>
          <button className='p-2 hover:bg-white/50 rounded-lg transition'>
            <ChevronLeft className='w-6 h-6' />
          </button>
          <h1 className='text-2xl sm:text-3xl font-bold'>Neko Case</h1>
        </div>

        {/* Tabs */}
        <div className='flex gap-3 mb-6 flex-wrap'>
          <button
            onClick={() => setActiveTab("available")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "available"
                ? "bg-[#4F79A1] text-white"
                : "bg-white text-gray-800 hover:bg-gray-50"
            }`}
          >
            Available Dates
          </button>
          <button
            onClick={() => setActiveTab("booked")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "booked"
                ? "bg-[#4F79A1] text-white"
                : "bg-white text-gray-800 hover:bg-gray-50"
            }`}
          >
            Upcoming Booked Date
          </button>
          <div className='ml-auto flex items-center gap-2 text-gray-600'>
            <div className='w-3 h-3 rounded-full bg-[#5CB72B]'></div>
            <span className='text-sm sm:text-base'>Available</span>
          </div>
        </div>

        <div
          className={`grid gap-6 ${activeTab === "booked" ? "grid-cols-1 lg:grid-cols-4" : "grid-cols-1"}`}
        >
          {/* Sidebar - Only visible on Booked tab */}
          {activeTab === "booked" && (
            <div className='lg:col-span-1'>
              <div className='bg-white rounded-2xl p-4 sm:p-6 shadow-sm'>
                <div className='mb-6 pb-4 border-b'>
                  <button className='w-full bg-slate-200 py-2 px-4 rounded-lg font-semibold text-gray-700 hover:bg-slate-300 transition'>
                    This Year
                    <br />
                    {currentYear}
                  </button>
                </div>

                <div className='space-y-2'>
                  {MONTHS.map((month, index) => {
                    const count = getBookedDates(index).length;

                    return (
                      <div
                        key={month}
                        className={`flex justify-between items-center p-2 rounded-lg transition ${
                          index === currentMonth
                            ? "bg-slate-200 font-semibold"
                            : "hover:bg-slate-100"
                        }`}
                      >
                        <span className='text-gray-800'>{month}</span>
                        <span className='text-[#5CB72B] font-semibold'>
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Calendar */}
          <div className={activeTab === "booked" ? "lg:col-span-3" : ""}>
            <div className='bg-white rounded-2xl p-4 sm:p-8 shadow-sm'>
              {/* Calendar Header */}
              <div className='flex justify-between items-center mb-8'>
                <button
                  onClick={handlePreviousMonth}
                  className='p-2 hover:bg-slate-100 rounded-lg transition'
                >
                  <ChevronLeft className='w-5 h-5' />
                </button>
                <h2 className='text-xl sm:text-2xl font-bold'>
                  {MONTHS[currentMonth]} {currentYear}
                </h2>
                <button
                  onClick={handleNextMonth}
                  className='p-2 hover:bg-slate-100 rounded-lg transition'
                >
                  <ChevronRight className='w-5 h-5' />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className='grid grid-cols-7 gap-2 sm:gap-3'>
                {/* Day Headers */}
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                  (day) => (
                    <div
                      key={day}
                      className='text-center text-xs sm:text-sm font-semibold text-gray-600 py-2'
                    >
                      {day}
                    </div>
                  ),
                )}

                {/* Days */}
                {calendarDays.map((dayObj, index) => {
                  const availableDates = getAvailableDates(currentMonth);
                  const bookedDates = getBookedDates(currentMonth);

                  const isAvailable =
                    dayObj.isCurrentMonth &&
                    availableDates.includes(dayObj.day);
                  const isBooked =
                    dayObj.isCurrentMonth && bookedDates.includes(dayObj.day);

                  const shouldHighlight =
                    activeTab === "available" ? isAvailable : isBooked;
                  const isClickable = activeTab === "available" && isAvailable;

                  return (
                    <button
                      key={index}
                      onClick={() =>
                        handleDateClick(dayObj.day, dayObj.isCurrentMonth)
                      }
                      disabled={!dayObj.isCurrentMonth || !isClickable}
                      className={`
                        aspectsquare w-10 h-10 flex items-center justify-center rounded-full font-semibold text-sm sm:text-base transition  
                        ${
                          !dayObj.isCurrentMonth
                            ? "text-gray-300 cursor-default"
                            : shouldHighlight
                              ? "bg-[#5CB72B] text-white hover:bg-[#5bc720] cursor-pointer hover:scale-105"
                              : "text-gray-800 hover:bg-slate-50 cursor-default"
                        }
                      `}
                    >
                      {dayObj.day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            {/* Modal Header */}
            <div className='flex justify-between items-center p-6 border-b sticky top-0 bg-white'>
              <h2 className='text-2xl font-bold'>Book Case</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className='p-2 hover:bg-slate-100 rounded-lg transition'
              >
                <X className='w-6 h-6' />
              </button>
            </div>

            {/* Modal Content */}
            <div className='p-6'>
              <p className='text-gray-600 mb-6'>
                Date: {selectedDate} {MONTHS[currentMonth]}, {currentYear}
              </p>

              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Name and Email Row */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      placeholder='Mr. John'
                      value={formData.name}
                      onChange={handleFormChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5CB72B]'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      placeholder='qwe123@gmail.com'
                      value={formData.email}
                      onChange={handleFormChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5CB72B]'
                      required
                    />
                  </div>
                </div>

                {/* Phone and Time Row */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phone
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      placeholder='01778298282'
                      value={formData.phone}
                      onChange={handleFormChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5CB72B]'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Preferred Time
                    </label>
                    <input
                      type='time'
                      name='preferredTime'
                      placeholder='7:00 PM'
                      value={formData.preferredTime}
                      onChange={handleFormChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5CB72B]'
                      required
                    />
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Budget Range
                  </label>
                  <input
                    type='text'
                    name='budgetRange'
                    placeholder='e.g. $1000 - $20000'
                    value={formData.budgetRange}
                    onChange={handleFormChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5CB72B]'
                    required
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Additional Notes
                  </label>
                  <textarea
                    name='notes'
                    placeholder='Write here'
                    value={formData.notes}
                    onChange={handleFormChange}
                    rows={4}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5CB72B] resize-none'
                  ></textarea>
                </div>

                {/* Buttons */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4'>
                  <button
                    type='button'
                    onClick={() => setIsModalOpen(false)}
                    className='px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-slate-50 transition'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2'
                  >
                    <span>Submit Booking Request</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
