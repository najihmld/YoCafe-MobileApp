const initialState = {
  listCategory: [],
  isLoading: true,
  isRejected: false,
  isFulfilled: false
};

//Insert initial state
const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };

    case 'GET_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };

    case 'GET_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        listUser: action.payload.data
      };

    case 'DELETE_USER_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };

    case 'DELETE_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };

    case 'DELETE_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        listUser: state.listUser
      };
    default:
      return state;
  }
};

export default user;
