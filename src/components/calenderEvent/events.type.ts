export interface IGoogleCalendarEvent {
  kind: string; // "calendar#event"
  etag: string;
  id: string;
  status: "confirmed" | "tentative" | "cancelled";
  htmlLink: string;

  created: string; // ISO date string
  updated: string; // ISO date string
  summary?: string;
  location?: string;
  description?: string;

  creator: EventPerson;
  organizer: EventPerson;

  start: EventDateTime;
  end: EventDateTime;

  iCalUID: string;
  sequence: number;

  reminders?: EventReminders;
  eventType?: string; // usually "default"
}

export interface EventPerson {
  email: string;
  self?: boolean;
  displayName?: string;
}
export interface EventDateTime {
  dateTime?: string; // Used for timed events
  date?: string; // Used for all-day events
  timeZone?: string;
}
export interface EventReminders {
  useDefault: boolean;
  overrides?: EventReminderOverride[];
}

export interface EventReminderOverride {
  method: "email" | "popup";
  minutes: number;
}
