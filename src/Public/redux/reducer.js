import { combineReducers } from 'redux';

import auth from '../../Auth/reducer';
import product from '../../Home/reducer';
import category from '../../Home/Category/reducer';
import cart from './Cart/reducer';

export default combineReducers({
  auth,
  product,
  category,
  cart
});
