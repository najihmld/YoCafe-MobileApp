import axios from 'axios';
import { SERVER_API } from 'react-native-dotenv';

export const getCategory = () => {
  return {
    type: 'GET_CATEGORY',
    payload: axios.get(`${SERVER_API}/category`)
  };
};

export const postCategory = form => {
  return {
    type: 'POST_CATEGORY',
    payload: axios.post(`${SERVER_API}/category`, form)
  };
};

export const patchCategory = (idCategory, newValue) => {
  return {
    type: 'PATCH_CATEGORY',
    payload: axios.patch(`${SERVER_API}/category/${idCategory}`, newValue)
  };
};

export const deleteCategory = (event, idCategory) => {
  return {
    type: 'DELETE_CATEGORY',
    payload: axios.delete(`${SERVER_API}/category/${idCategory}`, event)
  };
};
