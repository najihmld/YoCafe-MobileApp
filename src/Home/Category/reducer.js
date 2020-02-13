const initialState = {
  listCategory: [],
  isRejected: false,
  isFulfilled: false
};

//Insert initial state
const category = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORY_PENDING':
      return {
        ...state,
        isRejected: false,
        isFulfilled: false
      };

    case 'GET_CATEGORY_REJECTED':
      return {
        ...state,
        isRejected: true
      };

    case 'GET_CATEGORY_FULFILLED':
      let datas = [];
      action.payload.data.data.map((item, index) => {
        datas.push({ value: item.id, label: item.name });
      });
      return {
        ...state,
        isFulfilled: true,
        listCategory: datas
      };

    case 'DELETE_CATEGORY_PENDING':
      return {
        ...state,
        isRejected: false,
        isFulfilled: false
      };

    case 'DELETE_CATEGORY_REJECTED':
      return {
        ...state,
        isRejected: true
      };

    case 'DELETE_CATEGORY_FULFILLED':
      return {
        ...state,
        isFulfilled: true,
        listCategory: state.listCategory
      };
    default:
      return state;
  }
};

export default category;
