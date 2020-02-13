import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import {
  Text,
  Content,
  Container,
  List,
  ListItem,
  Grid,
  Col,
  Row
} from 'native-base';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import {
  incrementCart,
  decrementCart,
  removeCart,
  createOrder,
  emptyCart
} from '../Public/redux/Cart/action';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faTrashAlt,
  faPlusSquare,
  faMinusSquare
} from '@fortawesome/free-solid-svg-icons';
import Modal, { ModalContent } from 'react-native-modals';
import { getOrders } from './../Public/redux/Order/action';

class Cart extends React.Component {
  componentDidMount() {
    this.props.dispatch(getOrders());
  }

  state = {
    search: ''
  };

  updateSearch = search => {
    this.setState({ search });
  };

  handleOrder = () => {
    const body = [];
    this.props.cart.cartData.map((item, index) => {
      body.push({
        product_id: item.id,
        qty: item.qty,
        name: item.name,
        price: item.price,
        subtotal: item.subtotal
      });
    });
    const newBody = {
      order: body
    };

    if (newBody.order.length !== 0) {
      this.props.dispatch(createOrder(newBody));
      this.props.dispatch(emptyCart());
      this.setState({ visible: true });
    } else {
      ToastAndroid.showWithGravity(
        'Item Empty',
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headertext}>Cart</Text>
        </View>

        <Content style={styles.content}>
          <View style={styles.container}>
            <Modal
              visible={this.state.visible}
              onTouchOutside={() => {
                this.setState({ visible: false });
              }}>
              <ModalContent>
                <Text>Order Success</Text>
              </ModalContent>
            </Modal>
          </View>

          <List>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={this.props.cart.cartData}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => {
                return (
                  <ListItem>
                    <Grid>
                      <Row>
                        <Text style={styles.name}>{item.name}</Text>
                      </Row>
                      <Row>
                        <TouchableOpacity
                          style={styles.addMin}
                          disabled={item.qty === 1}
                          onPress={() => {
                            this.props.dispatch(decrementCart(item.id));
                          }}>
                          <FontAwesomeIcon
                            icon={faMinusSquare}
                            size={28}
                            color={'#606060'}
                          />
                        </TouchableOpacity>

                        <Text>{item.qty}</Text>

                        <TouchableOpacity
                          style={styles.addMin}
                          onPress={() => {
                            this.props.dispatch(incrementCart(item.id));
                          }}>
                          <FontAwesomeIcon
                            icon={faPlusSquare}
                            size={28}
                            color={'#606060'}
                          />
                        </TouchableOpacity>
                        <Col>
                          <NumberFormat
                            value={item.subtotal}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp '}
                            renderText={value => <Text>{value}</Text>}
                          />
                        </Col>
                        <TouchableOpacity
                          style={styles.addMin}
                          onPress={() => {
                            this.props.dispatch(removeCart(item));
                          }}>
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            size={22}
                            color={'#606060'}
                          />
                        </TouchableOpacity>
                      </Row>
                    </Grid>
                  </ListItem>
                );
              }}
            />
          </List>
        </Content>

        <ListItem>
          <Row>
            <Col>
              <Text style={styles.prim}>Total</Text>
            </Col>
            <Col>
              <NumberFormat
                value={this.props.cart.grandTotal}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp '}
                renderText={value => <Text style={styles.prim}>{value}</Text>}
              />
            </Col>
          </Row>
        </ListItem>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.textLogin} onPress={() => this.handleOrder()}>
              Checkout
            </Text>
          </View>
        </TouchableOpacity>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    product: state.product,
    category: state.category,
    cart: state.cart,
    order: state.order
  };
};

export default connect(mapStateToProps)(Cart);

const styles = StyleSheet.create({
  addMin: {
    paddingRight: 10,
    paddingLeft: 10
  },
  prim: {
    fontWeight: '800',
    color: '#732027'
  },
  checkout: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'red'
  },
  header: {
    paddingTop: 18,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 18,
    elevation: 4,
    alignSelf: 'center'
  },
  headertext: {
    fontWeight: 'bold',
    fontSize: 16
  },
  container: {},
  content: {
    paddingTop: 5,
    paddingBottom: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#fff',
    flexGrow: 1,
    elevation: 3
  },

  name: {
    color: '#732027',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 10,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#5C191B',
    padding: 12,
    borderRadius: 40,
    margin: 10,
    marginBottom: 15,
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
