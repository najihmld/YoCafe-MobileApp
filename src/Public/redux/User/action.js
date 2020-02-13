import axios from 'axios';

export const getUser = () => {
  return {
    type: 'GET_USER',
    payload: axios.get('http://127.0.0.1:3001/users')
  };
};

export const patchUser = (idUser, newValue) => {
  return {
    type: 'PATCH_USER',
    payload: axios.patch(`http://127.0.0.1:3001/users/${idUser}`, newValue)
  };
};

export const deleteUser = (event, idUser) => {
  return {
    type: 'DELETE_USER',
    payload: axios.delete(`http://127.0.0.1:3001/users/${idUser}`, event)
  };
};
