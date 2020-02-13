import axios from 'axios';
import { SERVER_API } from 'react-native-dotenv';

export const getUser = () => {
  return {
    type: 'GET_USER',
    payload: axios.get(`${SERVER_API}/users`)
  };
};

export const patchUser = (idUser, newValue) => {
  return {
    type: 'PATCH_USER',
    payload: axios.patch(`${SERVER_API}/users/${idUser}`, newValue)
  };
};

export const deleteUser = (event, idUser) => {
  return {
    type: 'DELETE_USER',
    payload: axios.delete(`${SERVER_API}/users/${idUser}`, event)
  };
};
