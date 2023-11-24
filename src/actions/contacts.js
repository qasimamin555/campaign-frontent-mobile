import { ToastAndroid } from 'react-native';
import { serverURL }    from "../const";
import axios            from "axios";

const getAllContacts = async (associateGroup) => {
  let URL = serverURL + "/contacts";
  console.log("API is calling");
  return axios.get(URL, {
    params: { data: associateGroup }
  })
    .then(result => {
      if (result?.data?.success) {
        return result.data.data;
      }
    })
    .catch(err => {
      console.log(err.message, "!!!!!!!!!!!")
      ToastAndroid.showWithGravity(
        err.message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      )
    })
}

const AddContacts = async (data) => {
  return axios
    .post(serverURL + "/createContact", {
      data
    })
    .then(response => {
      if (response?.data?.success) {
        return response.data.success;
      }
    })
    .catch(err => {
      console.log(err.response.data);
      ToastAndroid.showWithGravity(
        err.message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      )
    })
}
const AddMultiContacts = async (data) => {
  return axios
    .post(serverURL + "/createBulkContact", {
      data
    })
    .then(response => {
      if (response?.data?.success) {
        return response.data;
      }
    })
    .catch(err => {
      console.log(err.response.data);
      ToastAndroid.showWithGravity(
        err.message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      )
    })
}
export { getAllContacts, AddContacts, AddMultiContacts }