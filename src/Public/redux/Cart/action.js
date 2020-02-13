import axios from 'axios';
import { SERVER_API } from 'react-native-dotenv';

export const addCart = data => {
  return {
    type: 'ADD_CART',
    data
  };
};

export const removeCart = data => {
  return {
    type: 'REMOVE_CART',
    data
  };
};

export const emptyCart = () => {
  return {
    type: 'EMPTY_CART'
  };
};

export const incrementCart = id => {
  return {
    type: 'INCREMENT_CART',
    id
  };
};

export const decrementCart = id => {
  return {
    type: 'DECREMENT_CART',
    id
  };
};

export const createOrder = body => {
  return {
    type: 'POST_CART',
    payload: axios.post(`${SERVER_API}/orders/`, body)
  };
};
