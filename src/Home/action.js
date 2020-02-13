import axios from 'axios';

export const getProduct = config => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get('http://127.0.0.1:3001/products/', config)
  };
};
