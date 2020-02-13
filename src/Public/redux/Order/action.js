import axios from 'axios';
import { SERVER_API } from 'react-native-dotenv';

export const getOrders = () => {
  return {
    type: 'GET_ORDERS',
    payload: axios.get(`${SERVER_API}/orders`)
  };
};
