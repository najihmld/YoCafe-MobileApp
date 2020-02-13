import React from 'react';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { Thumbnail } from 'native-base';
import Home from '../../Home';
import Logout from '../../Auth/Logout';
import Cart from '../../Home/Cart';
import Setting from '../../Home/Profil';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faShoppingCart,
  faHome,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
const DrawerContent = props => (
  <SafeAreaView>
    <View>
      <View style={styles.header}>
        <Thumbnail
          style={styles.profil}
          source={{
            uri: 'http://127.0.0.1:3001/' + props.auth.data.image
          }}
        />
        <Text style={styles.name}>{props.auth.data.name}</Text>
      </View>
    </View>
    <DrawerItems {...props} />
  </SafeAreaView>
);

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const DrawerContentCon = connect(mapStateToProps)(DrawerContent);

export default createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <FontAwesomeIcon icon={faHome} size={20} color={'#732027'} />
        )
      }
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <FontAwesomeIcon icon={faShoppingCart} size={20} color={'#732027'} />
        )
      }
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <FontAwesomeIcon icon={faCog} size={20} color={'#732027'} />
        )
      }
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <FontAwesomeIcon icon={faSignOutAlt} size={20} color={'#732027'} />
        )
      }
    }
  },
  {
    contentComponent: DrawerContentCon
  }
);

const styles = StyleSheet.create({
  header: {},
  profil: {
    marginTop: 25,
    height: 100,
    width: 100,
    borderRadius: 500,
    alignSelf: 'center',
    zIndex: 20,
    borderWidth: 5,
    borderColor: '#E0E0E0',
    marginBottom: 12,
    padding: 32
  },
  name: {
    color: '#732027',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 12,
    textTransform: 'uppercase'
  }
});
