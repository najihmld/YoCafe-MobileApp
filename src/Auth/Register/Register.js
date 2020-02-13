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

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  handleInput = (text, type) => {
    this.setState({ [type]: text });
  };

  handleSignup = () => {
    const { name, email, password } = this.state;
    const body = {
      name,
      email,
      password
    };
    if (
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.name === ''
    ) {
      ToastAndroid.showWithGravity(
        "Can't be empty",
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
    } else {
      axios
        .post('http://127.0.0.1:3001/auth/register', qs.stringify(body))
        .then(res => {
          this.props.navigation.navigate('Login');
        })
        .catch(err => {
          ToastAndroid.showWithGravity(
            'Error',
            ToastAndroid.LONG,
            ToastAndroid.TOP
          );
        });
    }
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
            onChangeText={text => this.handleInput(text, 'name')}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Name"
            keyboardType="default"
            placeholderTextColor="#FAF5EB"
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
          <TouchableOpacity onPress={this.handleSignup}>
            <View style={styles.button}>
              <Text style={styles.textLogin}>Register</Text>
            </View>
          </TouchableOpacity>
        </Form>
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
)(Register);

const styles = StyleSheet.create({
  container: {
    padding: 30,
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
  }
});
