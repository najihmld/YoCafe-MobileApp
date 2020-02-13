import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid
} from 'react-native';
import { Form } from 'native-base';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import { SERVER_API } from 'react-native-dotenv';

class App extends Component {
  state = {
    email: '',
    password: ''
  };

  handleInput = (text, type) => {
    this.setState({ [type]: text });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    const body = {
      email,
      password
    };
    if (this.state.email === '' || this.state.password === '') {
      ToastAndroid.showWithGravity(
        "Username or password can't be empty",
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
    } else {
      axios
        .post(`${SERVER_API}/auth/login`, qs.stringify(body))
        .then(res => {
          this.props.navigation.navigate('App');
          this.props.setDataLogin(res.data.data);
        })

        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          ToastAndroid.showWithGravity(
            'Error',
            ToastAndroid.LONG,
            ToastAndroid.TOP
          );
        });
    }
  };

  signup = () => {
    this.props.navigation.navigate('Register');
  };
  render() {
    const { email, password } = this.setState;
    return (
      <View style={styles.container}>
        <Form>
          <Image
            source={require('../../Public/Assets/Image/logo.png')}
            style={styles.imgLogo}
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={text => this.handleInput(text, 'email')}
            value={email}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#FAF5EB"
          />

          <TextInput
            style={styles.inputBox}
            onChangeText={text => this.handleInput(text, 'password')}
            value={password}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#FAF5EB"
          />
          <TouchableOpacity onPress={this.handleLogin}>
            <View style={styles.button}>
              <Text style={styles.textLogin}>Login</Text>
            </View>
          </TouchableOpacity>
        </Form>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Dont have an account yet?</Text>
          <TouchableOpacity onPress={() => this.signup()}>
            <Text style={styles.signupButton}> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    product: state.product
  };
};

const mapDispatchToProps = dispatch => ({
  setDataLogin: payload =>
    dispatch({
      type: 'POST_LOGIN_FULFILLED',
      payload
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 80,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#731F22'
  },
  inputBox: {
    backgroundColor: '#852427',
    padding: 10,
    borderRadius: 40,
    margin: 10,
    color: '#F2E8D5',
    paddingLeft: 20
  },
  imgLogo: {
    height: 150,
    width: 150,
    alignSelf: 'center'
  },
  textLogin: {
    color: 'white',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#5C191B',
    padding: 15,
    borderRadius: 40,
    margin: 10,
    color: '#F2E8D5'
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 10,
    flexDirection: 'row'
  },
  signupText: {
    color: 'rgba(255,255,255,0.4)',
    margin: 10
  },
  signupButton: {
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
    margin: 10
  }
});
