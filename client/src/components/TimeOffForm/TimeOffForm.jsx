import React, { useState, useEffect } from "react";
import DatePicker from "../../components/DatePicker/DatePicker";
import "./TimeOffForm.css";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Alert,
} from "@mui/material";
import { createTimeOff } from "../../services/timeOff";

const TimeOffForm = ({ onSubmitSuccess }) => {
  const [dates, setDates] = useState([null, null]);
  const [summary, setSummary] = useState("");
  const [type, setType] = useState("Holidays");
  const [status, setStatus] = useState(null);

  function isValidForm() {
    return dates && dates[0] && dates[1] ? true : false;
  }

  function timer() {
    setTimeout(()=>setStatus(null), 2000);
  }

  useEffect(() => {
    if (status === true) {
      setSummary("")
      setDates([null, null])
      // setType("") //ToDo --> porque? 
      setStatus(true)
      onSubmitSuccess()
    }
  }, [status, onSubmitSuccess])


  async function onSubmit() { 
    if (isValidForm()) {
      const timeOff = {
        startDate: dates[0],
        endDate: dates[1],
        summary: summary,
        type: type,
      };
      const response = await createTimeOff(timeOff);
      setStatus(response.status);
      if (response.status === true) {

    
        onSubmitSuccess()
      }
      timer();
    }
  }

  return (
    <div className="TimeOffForm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DatePicker
            color="secondary"
            dates={dates}
            setDates={setDates}
            startText="Start"
            endText="End"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="secondary"
            name="summary"
            id="summary"
            label="Description"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            multiline
            rows={4}
            placeholder="Write your comment"
          />
        </Grid>

        <Grid item xs={12}>
          <Select
            color="secondary"
            id="time-off"
            value={type}
            label="Type"
            onChange={(event) => setType(event.target.value)}
          >
            <MenuItem value="Holidays">Holidays</MenuItem>
            <MenuItem value="Illness">Illness</MenuItem>
            <MenuItem value="Maternity / Paternity">
              Maternity / Paternity
            </MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="outlined"
            className="button_submit"
            type="submit"
            onClick={onSubmit}
          >
            Submit
          </Button>
          {status && (
            <Alert severity="success">
              Time Off created!
            </Alert>
          )}
          {status===false && (
            <Alert severity="error">
              Information incomplete, please try again.
            </Alert>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default TimeOffForm;
