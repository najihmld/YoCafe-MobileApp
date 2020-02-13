/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Container, Content, Text } from 'native-base';

import { connect } from 'react-redux';
import { ScrollView, ToastAndroid, Image } from 'react-native';
import axios from 'axios';
import { getUser } from '../Public/redux/User/action';
import ImagePicker from 'react-native-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

class Profil extends React.Component {
  componentDidMount() {
    this.props.dataUser();
  }

  constructor(props) {
    super(props);
    this.state = {
      filePath: {}
    };
  }

  handleImgChange = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        this.setState({
          filePath: source
        });
      }
    });
  };

  handleInput = (text, type) => {
    this.setState({ [type]: text });
  };

  handleUpdate = () => {
    if (this.state.name === '' || this.state.password === '') {
      alert('All must filled !!!');
    } else {
      let body = new FormData();
      body.append('name', this.state.name);
      body.append('email', this.state.email);
      body.append('password', this.state.password);
      body.append('image', {
        uri: this.state.filePath.uri,
        type: this.state.filePath.type,
        name: this.state.filePath.fileName
      });

      axios
        .put(`http://127.0.0.1:3001/users/${this.props.auth.data.id}`, body)
        .then(response => {
          if (response.status === 200) {
            ToastAndroid.showWithGravity(
              'Success',
              ToastAndroid.LONG,
              ToastAndroid.TOP
            );
            this.props.dispatch(getUser());
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    // const { email, password } = this.setState;
    return (
      <Container style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headertext}>Setting Profile</Text>
        </View>
        <Content style={styles.content}>
          <ScrollView>
            <TouchableOpacity
              onPress={this.handleImgChange}
              style={styles.profil}>
              <FontAwesomeIcon
                icon={faCamera}
                size={28}
                color={'#732027'}
                style={styles.camera}
              />
              <Text style={{ color: '#606060' }}>Select Picture</Text>
              <Image
                style={styles.profil2}
                source={{
                  uri: 'data:image/jpeg;base64,' + this.state.filePath.data
                }}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.inputBox}
              onChangeText={text => this.handleInput(text, 'name')}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Name"
              keyboardType="default"
              placeholderTextColor="#606060"
            />
            <TextInput
              style={styles.inputBox}
              onChangeText={text => this.handleInput(text, 'email')}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#606060"
            />
            <TextInput
              style={styles.inputBox}
              onChangeText={text => this.handleInput(text, 'password')}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#606060"
            />
            <TouchableOpacity onPress={this.handleUpdate}>
              <View style={styles.button}>
                <Text style={styles.textLogin}>Change</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  dataUser: payload => dispatch(getUser(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profil);

const styles = StyleSheet.create({
  header: {
    paddingTop: 18,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 18,
    elevation: 4,
    alignSelf: 'center',
    zIndex: 200
  },
  container: {},
  profil: {
    height: 125,
    width: 125,
    borderRadius: 500,
    alignSelf: 'center',
    zIndex: 20,
    borderWidth: 5,
    borderColor: '#E0E0E0',
    marginBottom: 20,
    padding: 32
  },
  headertext: {
    fontWeight: 'bold',
    fontSize: 16
  },
  profil2: {
    height: 125,
    width: 125,
    borderRadius: 500,
    alignSelf: 'center',
    zIndex: 20,
    borderWidth: 5,
    borderColor: '#E0E0E0',
    padding: 32,
    marginTop: -76
  },
  inputBox: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 40,
    margin: 10,
    color: '#606060',
    paddingLeft: 20
  },
  content: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 5
  },
  name: {
    color: '#732027',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 10,
    marginBottom: 5
  },
  button: {
    backgroundColor: '#5C191B',
    padding: 12,
    borderRadius: 40,
    margin: 10,
    color: '#F2E8D5'
  },
  textLogin: {
    color: 'white',
    textAlign: 'center'
  },
  camera: {
    zIndex: 30,
    position: 'absolute',
    left: 100,
    bottom: 50
  }
});
