import axios from 'axios';

export const getOrders = () => {
  return {
    type: 'GET_ORDERS',
    payload: axios.get('http://127.0.0.1:3001/orders')
  };
};
