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

export { getAllGroups, AddGroup }
