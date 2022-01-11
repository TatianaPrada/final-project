import React, { useEffect, useState } from "react";
import FullCalendar, { addDays } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const CalendarApp = (props) => {

  const [parsedEvents, setParsedEvents] = useState([]);
  useEffect(() => {
    if (!props.events) return;
    const events = props.events.map((event) => {
      return {
        title: `${event.type} (${event.user.name} ${event.user.lastName})`,
        start: event.startDate,
        end: addDays(new Date(event.endDate), 1),
        color: event.approved ? "rgb(237, 247, 237)" : "rgb(255, 244, 229)",
        textColor:"rgb(102, 60, 0)",
        borderColor:"#b9b4b4",
        allDay: true,
        extendedProps: {
          summary: event.summary ? event.summary : "No description",
          user: `${event.user.name} ${event.user.lastName}`,
          id: event._id
        }
      };
    });
    setParsedEvents(events);
  }, [props.events]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={parsedEvents}
      eventClick={props.onEventClick}
      height={"60vh"}
    />
  );
};

export default CalendarApp;
