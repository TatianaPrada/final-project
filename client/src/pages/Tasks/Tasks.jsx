import React, { useEffect, useState, useCallback } from "react";
import { getMyTasks } from "../../services/tasks";
import "./Tasks.css";
import TaskForm from "../../components/TaskForm/TaskForm";
import TaskList from "../../components/TaskList/TaskList";
import { Grid } from "@mui/material";


const Tasks = (props) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = props;

  const fetchTasks = useCallback(() => {
    getMyTasks(user._id)
      .then((response) => {
        setTasks(response.data.tasks);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);


  return (
    <div className="Tasks">
      <h1>Tasks</h1>
      <h3>Create a list with your daily tasks</h3>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <TaskForm onSubmitSuccess={() => fetchTasks()} user={user} />
        </Grid>
        <Grid item xs={12} md={8}>
          <h3>Tasks List</h3>
          <TaskList tasks={tasks} isLoading={isLoading} fetchTasks={fetchTasks} user={user}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Tasks;
