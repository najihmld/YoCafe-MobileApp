import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import App from './app';
import Auth from './auth';
import Main from '../main';
import Cart from '../../Home/Cart';

const switchNavigator = createSwitchNavigator(
  {
    Main,
    App,
    Auth,
    Cart
  },
  {
    initialRouteName: 'Main'
  }
);

export default createAppContainer(switchNavigator);
