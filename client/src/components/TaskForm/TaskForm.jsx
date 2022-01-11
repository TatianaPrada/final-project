import React, { useState, useEffect } from "react";
import "./TaskForm.css";
import { Button, Grid, TextField, Alert } from "@mui/material";
import { createTask } from "../../services/tasks";

const TaskForm = ({ user, onSubmitSuccess }) => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(null);

  function timer() {
    setTimeout(() => setStatus(null), 2000);
  }

  useEffect(() => {
    if (status === true) {
      setDescription("");
      setStatus(true);
      onSubmitSuccess();
    }
  }, [status, onSubmitSuccess]);

  async function onSubmit() {
    const task = {
      description: description,
      userId : user._id,
    };
    const response = await createTask(task);
    setStatus(response.status);
    if (response.status === true) {
      onSubmitSuccess();
    }
    timer();
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12}></Grid>
        <TextField
          color="secondary"
          name="task"
          id="task"
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          multiline
          rows={4}
          placeholder="Write your task"
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          className="button_submit"
          color = "secondary"
          type="submit"
          onClick={onSubmit}
          sx={{marginTop: 3}}
        >
          Add Task
        </Button>
        {status && <Alert severity="success">Task created!</Alert>}
        {status === false && (
          <Alert severity="error">There was an error!</Alert>
        )}
      </Grid>
    </div>
  );
};

export default TaskForm;
