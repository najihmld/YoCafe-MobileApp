import axios from 'axios';
import { SERVER_API } from 'react-native-dotenv';

export const getProduct = config => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get(`${SERVER_API}/products/`, config)
  };
};
