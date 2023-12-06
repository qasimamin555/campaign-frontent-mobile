import { ToastAndroid } from 'react-native';
import { serverURL }    from "../const";
import axios            from "axios";

const getAllContacts = async (id) => {
  let URL = serverURL + "/contacts";
  return axios.get(URL, {
    params: { data: id }
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
        ToastAndroid.BOTTOM,
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
        ToastAndroid.BOTTOM,
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
        ToastAndroid.BOTTOM,
      )
    })
}

const deleteContacts = async (id) => {
  let URL = serverURL + `/deleteContacts/${ id }`;

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

export { getAllContacts, AddContacts, AddMultiContacts, deleteContacts }
