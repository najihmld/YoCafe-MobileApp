import { Component } from 'react';
import { connect } from 'react-redux';

class Logout extends Component {
  render() {
    this.props.setDataLogout();
    this.props.navigation.navigate('Auth');
    return null;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  setDataLogout: payload =>
    dispatch({
      type: 'POST_LOGOUT',
      payload
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
