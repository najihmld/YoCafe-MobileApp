import React from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Card, CardItem, Text, Body, Badge } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { getProduct } from './action';
import { getCategory } from './Category/action';
import NumberFormat from 'react-number-format';
import { addCart } from '../Public/redux/Cart/action';

class Home extends React.Component {
  componentDidMount() {
    this.props.dispatch(getProduct());
    this.props.dispatch(getCategory());
  }

  state = {
    data: [],
    page: 1,
    loading: true,
    loadingMore: false,
    error: null
  };

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
        loadingMore: true
      }),
      () => {
        this._fetchAllBeers();
      }
    );
  };

  onCart = () => {
    this.props.navigation.navigate('Cart');
  };

  updateSearch = text => {
    this.setState = {
      name: text
    };
    const config = {
      params: {
        name: this.setState.name
      }
    };
    this.props.dispatch(getProduct(config));
  };

  sortCategory = item => {
    const categoryId = {
      params: {
        category: item.value
      }
    };
    this.props.dispatch(getProduct(categoryId));
  };

  render() {
    return (
      <View>
        <View style={styles.header}>
          <TextInput
            style={styles.searchBox}
            onChangeText={text => this.updateSearch(text)}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Search..."
            keyboardType="search"
            placeholderTextColor="#484848"
          />
          <TouchableOpacity style={styles.icon} onPress={() => this.onCart()}>
            <FontAwesomeIcon
              icon={faShoppingCart}
              size={28}
              color={'#732027'}
            />
            <Badge style={styles.notif}>
              <Text style={{ fontSize: 10 }}>
                {this.props.cart.cartData.length}
              </Text>
            </Badge>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          style={styles.containerHr}
          showsHorizontalScrollIndicator={false}
          data={this.props.category.listCategory}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            return (
              <Card style={styles.category}>
                <TouchableOpacity onPress={() => this.sortCategory(item)}>
                  <CardItem style={styles.categoryItem}>
                    <Text style={{ color: '#fff' }}>{item.label}</Text>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            );
          }}
        />
        <FlatList
          style={styles.container}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.props.product.listProduct.items}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            return (
              <Card style={styles.card}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.dispatch(addCart(item));
                  }}>
                  <Image
                    style={styles.img}
                    source={{
                      uri: 'http://127.0.0.1:3001/' + item.image
                    }}
                  />
                </TouchableOpacity>
                <CardItem style={styles.cardItem}>
                  <Body>
                    <Text style={styles.name}>{item.name}</Text>
                    <NumberFormat
                      value={item.price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp '}
                      renderText={value => (
                        <Text style={styles.price}>{value}</Text>
                      )}
                    />
                  </Body>
                </CardItem>
              </Card>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    product: state.product,
    category: state.category,
    cart: state.cart
  };
};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 100
  },

  containerHr: {
    paddingLeft: 10,
    paddingRight: 10
  },
  icon: {
    width: '15%',
    padding: 0,
    display: 'flex',
    position: 'absolute',
    right: 0,
    marginRight: 2,
    marginTop: 16
  },
  notif: {
    backgroundColor: '#A62E38',
    borderColor: '#FFF',
    borderWidth: 1.5,
    display: 'flex',
    position: 'absolute',
    right: 0,
    marginRight: 8,
    marginTop: -8
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 6
  },
  searchBox: {
    padding: 7,
    borderRadius: 40,
    color: '#606060',
    paddingLeft: 20,
    backgroundColor: '#e0e0e0',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 5
    },
    width: '85%'
  },
  card: {
    flexGrow: 1,
    marginBottom: 12,
    marginTop: 4,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10
  },
  cardItem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  img: {
    height: 160,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  name: {
    color: '#732027',
    fontSize: 16,
    fontWeight: '200'
  },
  price: {
    color: '#fff',
    fontSize: 14,
    position: 'absolute',
    marginTop: -25,
    backgroundColor: '#732027',
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 6,
    paddingTop: 2,
    paddingBottom: 2
  },
  category: {
    height: 30,
    borderRadius: 18
  },
  categoryItem: {
    height: 30,
    borderRadius: 18,
    alignContent: 'center',
    fontWeight: '200',
    color: '#fff',
    backgroundColor: '#732027'
  }
});
