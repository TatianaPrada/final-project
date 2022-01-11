import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { pink } from "@mui/material/colors";
import { Button } from "@mui/material";
import { deleteTask } from "../../services/tasks";
import { useState } from "react";

const TaskList = (props) => {
  const { tasks, user, fetchTasks, isLoading } = props;

  const [, setError] = useState(null);
  const [, setMessage] = useState("");

  const handleDelete = (taskId) => {
    deleteTask(user._id, taskId).then((res) => {
      if (!res.status) {
        return setError(res.errorMessage);
      }
      fetchTasks();
      setMessage("Task deleted succesfully");
      console.log(res);
    });
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {tasks?.map((tasks) => (
        <ListItem
          key={tasks._id}
          secondaryAction={
            <IconButton edge="end" aria-label="comments"></IconButton>
          }
          disablePadding
        >
          <ListItemButton role={undefined} dense>
            <ListItemText id={tasks}>{tasks.description}</ListItemText>
            <Button
              variant="outlined"
              className="button_submit"
              color="secondary"
              type="submit"
              onClick={() => handleDelete(tasks._id)}
            >
              Delete
            </Button>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
