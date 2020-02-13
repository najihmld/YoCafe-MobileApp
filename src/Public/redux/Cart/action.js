import axios from 'axios';

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
    payload: axios.post('http://127.0.0.1:3001/orders/', body)
  };
};
