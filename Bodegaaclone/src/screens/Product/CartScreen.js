import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import CustomButton from '../../components/ui/CustomButton';

import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from '../../redux/slices/cartSlice';



const CartScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart?.items || []);
  console.log("CART ITEMS UI 👉", cartItems);

  return (
    <SafeAreaView style={styles.container}>

      {/* 🔹 Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Icon
            name="arrow-back"
            size={22}
            color="#000"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Cart</Text>
        </View>
      </View>

      {cartItems.length === 0 ? (

        // ✅ EMPTY UI
        <View style={styles.content}>
          <Image
            source={require('../../assets/images/emptycart.png')}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.title}>Your cart is empty</Text>

          <Text style={styles.subtitle}>
            Browse fresh groceries and add them to your cart to continue.
          </Text>

          <CustomButton
            title="Browse Products"
            onPress={() => navigation.navigate('Home')}
            style={styles.button}
          />
        </View>

      ) : (

        // ✅ FILLED UI
        <View style={{ flex: 1 }}>

  <View style={styles.addressBox}>
    <Text style={styles.addressText}>Add Address</Text>
    <Icon name="chevron-forward" size={20} color="#0B8F3E" />
  </View>

  <Text style={styles.noAddress}>No addresses available.</Text>

  {/* ✅ MULTIPLE ITEMS */}
  <FlatList
    data={cartItems}
    keyExtractor={(item) => item.id?.toString()}
    renderItem={({ item }) => (
      
      <View style={styles.card}>

        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
        />

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.productName}>
            {item.name}
          </Text>

          <Text>
            <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>{' '}
            <Text style={styles.price}>₹{item.price}</Text>{' '}
            {item.weight}
          </Text>

          <Text style={styles.stock}>In stock</Text>
        </View>

        {/* ✅ Qty Controls */}
        <View style={styles.qtyBox}>

          {/* 🗑 Remove */}
          <Icon
            name="trash-outline"
            size={18}
            onPress={() => dispatch(removeFromCart(item.id))}
          />

          {/* ➖ Decrease */}
          <Icon
            name="remove"
            size={18}
            onPress={() => dispatch(decreaseQty(item.id))}
          />

          <Text style={{ marginHorizontal: 10 }}>
            {item.qty}
          </Text>

          {/* ➕ Increase */}
          <Icon
            name="add"
            size={18}
            onPress={() => dispatch(increaseQty(item.id))}
          />

        </View>

      </View>
    )}
  />

  <Text style={styles.delivery}>
    A delivery fee applies for orders below ₹500.
  </Text>

  {/* ✅ SUMMARY */}
  <View style={styles.summary}>
    <Text style={styles.summaryTitle}>Order Summary</Text>

    <View style={styles.row}>
      <Text>Total ({cartItems.length} items)</Text>
      <Text>
        ₹
        {cartItems.reduce(
          (sum, i) => sum + i.price * i.qty,
          0
        )}
      </Text>
    </View>

    <View style={styles.row}>
      <Text>Handling Fee</Text>
      <Text>₹0.10</Text>
    </View>

    <View style={styles.row}>
      <Text>GST</Text>
      <Text>₹0.00</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.grand}>Grand Total</Text>
      <Text style={styles.grand}>
        ₹
        {cartItems.reduce(
          (sum, i) => sum + i.price * i.qty,
          0
        ) + 0.1}
      </Text>
    </View>
  </View>

  <CustomButton title="Place Order" />

</View>
      )}

    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    backgroundColor: '#a5d6a7',
    padding: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },

  button: {
    width: '70%',
  },
  addressBox: {
  margin: 15,
  borderWidth: 1,
  borderColor: '#0B8F3E',
  borderRadius: 15,
  padding: 15,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

addressText: {
  color: '#0B8F3E',
  fontSize: 16,
  fontWeight: '600',
},

noAddress: {
  marginHorizontal: 15,
  color: '#777',
},

card: {
  margin: 15,
  borderWidth: 1,
  borderColor: '#0B8F3E',
  borderRadius: 15,
  padding: 10,
  flexDirection: 'row',
  alignItems: 'center',
},

productImage: {
  width: 60,
  height: 60,
  borderRadius: 10,
},

productName: {
  fontWeight: '600',
},

oldPrice: {
  textDecorationLine: 'line-through',
  color: '#999',
},

price: {
  color: '#0B8F3E',
  fontWeight: '700',
},

stock: {
  color: 'green',
  fontSize: 12,
},

qtyBox: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#0B8F3E',
  borderRadius: 20,
  paddingHorizontal: 10,
  paddingVertical: 5,
},

delivery: {
  textAlign: 'center',
  color: '#0B8F3E',
  marginVertical: 10,
},

summary: {
  margin: 15,
  padding: 15,
  backgroundColor: '#f2f2f2',
  borderRadius: 15,
},

summaryTitle: {
  fontWeight: '700',
  marginBottom: 10,
},

row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 3,
},

grand: {
  fontWeight: '700',
  fontSize: 16,
},
});