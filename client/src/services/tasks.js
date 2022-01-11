import axios from "axios";
import * as USER_HELPERS from "../utils/userToken";
import { internalServerError, successStatus } from "./auth";

const tasksService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/tasks`,
  headers: { Authorization: USER_HELPERS.getUserToken() },
});


export function createTask(task) {
  return tasksService
  .post("/create",{task}, {
    headers: { 
      Authorization: USER_HELPERS.getUserToken() 
    }
  })
  .then(successStatus)
  .catch(internalServerError)
}

export async function getMyTasks(id){
  try{
    const responseMyTasks = await tasksService.get(`/my-tasks/${id}`,{
      headers: {
        Authorization: USER_HELPERS.getUserToken()
      }
    });
    return successStatus(responseMyTasks);
  }catch(err){
    return internalServerError(err);
  }
}

// export function deleteTask(task) {
//   return tasksService
//   .post("/delete",{task}, {
//     headers: { 
//       Authorization: USER_HELPERS.getUserToken() 
//     }
//   })
//   .then(successStatus)
//   .catch(internalServerError)
// }

export async function deleteTask(userId, taskId) {
  return tasksService
  .patch(`/tasks/delete/${userId}/${taskId}`, {
      headers: {
        Authorization: USER_HELPERS.getUserToken()
      }
  })
    .then(successStatus)
    .catch(internalServerError);
}