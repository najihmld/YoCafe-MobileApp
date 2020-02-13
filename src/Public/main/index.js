import { Component } from 'react';
import { connect } from 'react-redux';

class index extends Component {
  componentDidMount() {
    if (this.props.auth.data.token) {
      this.props.navigation.navigate('App');
    } else {
      this.props.navigation.navigate('Auth');
    }
  }
  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(index);
