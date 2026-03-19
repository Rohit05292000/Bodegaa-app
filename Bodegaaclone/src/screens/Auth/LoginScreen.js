import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/ui/CustomButton';
import CustomInput from '../../components/ui/CustomInput';
import CountryCodePicker from '../../components/CountryCodePicker';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, resetOtpState } from '../../redux/slices/authSlice';
import { useEffect } from 'react';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
const { loading, otpSent, error } = useSelector(state => state.auth);
const isValid = phone.length === 10;

const handleSendOtp = () => {
  if (phone.length !== 10) {
    alert('Enter valid mobile number');
    return;
  }
  dispatch(sendOtp(phone));
};


useEffect(() => {
  if (otpSent) {
    navigation.navigate('Otp', { phone });
    dispatch(resetOtpState());
  }
}, [otpSent, navigation, phone, dispatch]);

useEffect(() => {
  if (error) {
   alert(error?.message || error || 'Something went wrong');
  }
}, [error]);

  return (
    <SafeAreaView style={styles.container}>
       <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>   
      
      {/* Top Green Section */}
      <View style={styles.topSection}>
        <Text style={styles.logoText}>Bodegaa</Text>
        <Text style={styles.tagline}>BEST IN QUALITY</Text>

        {/* Product Image */}
        <Image
          source={require('../../assets/images/products.png')} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Bottom White Card */}
      <View style={styles.bottomCard}>
        <Text style={styles.title}>Get your stuff quickly</Text>

        <View style={styles.inputRow}>
          <CountryCodePicker />
          <CustomInput
           value={phone}
           onChangeText={text => setPhone(text.replace(/[^0-9]/g, ''))}
           placeholder="xxxxx - xxxxx"
           keyboardType="number-pad"
           maxLength={10}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableOpacity>

        <CustomButton
         title={loading ? 'Sending...' : 'Continue'}
         disabled={!isValid || loading}
         onPress={handleSendOtp}
        />

        <Text style={styles.privacy}>
          By Continuing, you agree to our
        </Text>

        <Text style={styles.link}>Privacy Policy</Text>
      </View>
      </View>
       </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B8F3E',
  },

  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },

  tagline: {
    color: '#fff',
    marginTop: 5,
    letterSpacing: 2,
  },

 image: {
  width: '100%',
  height: 140,
  position: 'absolute',
  bottom: -20, 
},

  bottomCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  guestText: {
    textAlign: 'center',
    color: '#0B8F3E',
    marginBottom: 20,
  },

  privacy: {
    textAlign: 'center',
    marginTop: 10,
    color: '#777',
  },

  link: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 5,
  },
});