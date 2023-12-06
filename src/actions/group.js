import { serverURL } from "../const";
import axios         from "axios";

const getAllGroups = async () => {
  return axios
    .get(serverURL + "/groups")
    .then(result => {
      if (result?.data?.success) {
        return result.data.data;
      }
    })
    .catch(err => console.log(err))
}

const AddGroup = async (data) => {
  return axios
    .post(serverURL + "/createGroup", {
      data
    })
    .then(response => {
      if (response?.data?.success) {
        return response.data.success;
      }
    })
    .catch(err => {
      console.log(err.response.data)
    })
}

const updateGroup = async (value, id) => {
  let URL = serverURL + `/updateGroup/${ id }`;

  return axios
    .put(URL, {
      data: value
    })
    .then(response => {
      console.log(response.data.success, "$$$$$$$$$$$444")
      if (response?.data?.success) {
        return response.data.success;
      }
    })
    .catch(err => {
      console.log(err.response)
    })
}

const deleteGroup = async (id) => {
  let URL = serverURL + `/deleteGroup/${ id }`;

  return axios
    .delete(URL)
    .then(response => {
      if (response?.data?.success) {
        return response.data.success;
      }
    })
    .catch(err => {
      console.log(err.response)
    })
}

export { getAllGroups, AddGroup, updateGroup, deleteGroup }
