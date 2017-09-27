import axios from 'axios';
import { WAN_URL } from './api.config';

export default {
  fetchAllMembersData() {
    return axios.get(WAN_URL+'/all_members')
    .then(dataFromServer => {
      return dataFromServer.data;
    })
    .catch(errorFromServer => {
      return errorFromServer.data;
    });
  },
  addNewMember(data) {
    return axios.post(WAN_URL+'/new_member', data)
    .then(dataFromServer => {
      return dataFromServer.data;
    })
    .catch(errorFromServer => {
      return errorFromServer.data;
    });
  }
}
