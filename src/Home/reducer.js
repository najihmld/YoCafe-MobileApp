const initialState = {
  listProduct: [],
  isRejected: false,
  isFulfilled: false
};

//Insert initial state
const product = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCT_PENDING':
      return {
        ...state,
        isRejected: false,
        isFulfilled: false
      };

    case 'GET_PRODUCT_REJECTED':
      return {
        ...state,
        isRejected: true
      };

    case 'GET_PRODUCT_FULFILLED':
      return {
        ...state,
        isFulfilled: true,
        listProduct: action.payload.data.data
      };

    default:
      return state;
  }
};

export default product;
