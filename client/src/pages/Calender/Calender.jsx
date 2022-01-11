import { Alert, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CalendarApp from "../../components/CalendarApp/CalendarApp";
import EventDetail from "../../components/EventDetail/EventDetail";
import { getMyRequests } from "../../services/calendarRequest";
import {
  approveTimeOff,
  deleteTimeOff,
  denyTimeOff,
} from "../../services/timeOff";
import "./Calender.css";

const Calender = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getMyRequests().then((res) => {
      setEvents(res.data);
    });
  }, [selectedEvent]);
  
  function timer() {
    setTimeout(()=>setStatus(null), 1500);
  }

  function onEventClick(event) {
    setSelectedEvent(event.event);
  }
  async function deleteClick() {
    const response = await deleteTimeOff(selectedEvent.extendedProps.id);

    setSelectedEvent(null);
    setStatus(response.status);
    timer();
  }
  async function approveClick() {
    const response = await approveTimeOff(selectedEvent.extendedProps.id);

    setSelectedEvent(null);
    setStatus(response.status);
    timer();
  }

  async function denyClick() {
    const response = await denyTimeOff(selectedEvent.extendedProps.id);

    setSelectedEvent(null);
    setStatus(response.status);
    timer();
  }

  return (
    <div className="Calender">
    <div>
      <h1>Calender </h1>
      <p>Read, approve, deny and delete all your time-off requests.</p>
    </div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <CalendarApp events={events} onEventClick={onEventClick} />
        </Grid>
        <div item xs={12} md={4}>
          {selectedEvent && (
            <EventDetail
              event={selectedEvent}
              denyClick={denyClick}
              approveClick={approveClick}
              deleteClick={deleteClick}
            />
          )}
          {status && (
            <Alert severity="success">
            Changes applied! 
            </Alert>
          )}

          {status===false && (
            <Alert severity="error">There was an error</Alert>
          )}
        </div>
      </Grid>
    </div>
  );
};

export default Calender;
