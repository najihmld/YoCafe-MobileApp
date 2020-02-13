const initialState = {
  cartData: [],
  grandTotal: 0
};

// let datas = []
// action.payload.data.data.map((item, index) => {
//   datas.push({value: item.id, label: item.name})
// })

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART':
      let arrExist = [];
      state.cartData.map((data, i) => {
        if (data.id === action.data.id) {
          arrExist.push('1');
        }
      });
      if (arrExist.length === 0) {
        return {
          ...state,
          cartData: [
            ...state.cartData,
            {
              ...action.data,
              qty: 1,
              subtotal: 1 * action.data.price
            }
          ],

          grandTotal: state.grandTotal + 1 * action.data.price
        };
      } else {
        return {
          ...state
        };
      }
    case 'REMOVE_CART':
      let cartForDelete = state.cartData.filter(data => {
        return data.id !== action.data.id;
      });
      let priceDelete = state.cartData.filter(data => {
        return data.id === action.data.id;
      });
      return {
        cartData: cartForDelete,
        grandTotal: state.grandTotal - parseInt(priceDelete[0].subtotal)
      };
    case 'EMPTY_CART':
      return {
        cartData: [],
        grandTotal: 0
      };
    case 'INCREMENT_CART':
      let totalPlus = 0;
      let cartMapPlus = state.cartData.map((data, i) => {
        if (data.id === action.id) {
          totalPlus = state.grandTotal + parseInt(data.price);
          return {
            ...data,
            qty: data.qty + 1,
            subtotal: data.price * (data.qty + 1)
          };
        } else {
          return {
            ...data
          };
        }
      });
      return {
        ...state,
        cartData: cartMapPlus,
        grandTotal: totalPlus
      };
    case 'DECREMENT_CART':
      let totalMin = 0;
      let cartMapMin = state.cartData.map((data, i) => {
        if (data.id === action.id) {
          totalMin = state.grandTotal - parseInt(data.price);
          return {
            ...data,
            qty: data.qty - 1,
            subtotal: data.price * (data.qty - 1)
          };
        } else {
          return { ...data };
        }
      });
      return {
        ...state,
        cartData: cartMapMin,
        grandTotal: totalMin
      };
    case 'POST_CART_PENDING':
      return {
        ...state
      };
    case 'POST_CART_REJECTED':
      return {
        ...state
      };
    case 'POST_CART_FULFILLED':
      return {
        ...state
      };
    default:
      return state;
  }
};

export default cart;
