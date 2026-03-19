import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../../redux/slices/authSlice';

const OtpScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const dispatch = useDispatch();
const { loading, user, error } = useSelector(state => state.auth);
const { phone } = route.params;

const handleVerifyOtp = () => {
  if (!isComplete) return;

  const enteredOtp = otp.join('');
  dispatch(verifyOtp({ phone, otp: enteredOtp }));
};


useEffect(() => {
  if (user) {
    alert('Login Success');

     navigation.replace('Main');
  }
}, [user, navigation]);

  const inputs = useRef([]);
  useEffect(() => {
  if (error) {
    alert(error);
  }
}, [error]);

useEffect(() => {
  inputs.current[0]?.focus();
}, []);

  const handleChange = (text, index) => {
    if (/^\d?$/.test(text)) {
      let newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move to next input
      if (text && index < 3) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (key, index) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const isComplete = otp.every(digit => digit !== '');

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>OTP Verification</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.text}>
          We have sent a verification code to
        </Text>
        <Text style={styles.phone}>+91 {phone}</Text>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputs.current[index] = ref)}
              style={[
                styles.otpInput,
                digit ? styles.activeInput : null,
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) =>
                handleBackspace(nativeEvent.key, index)
              }
            />
          ))}
        </View>

        {/* Button */}
        <Pressable
          onPress={handleVerifyOtp}
          disabled={!isComplete || loading}
          style={[
            styles.button,
            isComplete ? styles.activeButton : styles.disabledButton,
          ]}
        >
         <Text style={styles.buttonText}> {loading ? 'Verifying...' : 'Continue'} </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OtpScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a5d6a7',
    padding: 15,
  },

  back: {
    fontSize: 20,
    marginRight: 10,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  content: {
    padding: 20,
  },

  text: {
    color: '#666',
    fontSize: 14,
  },

  phone: {
    fontWeight: 'bold',
    marginVertical: 5,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },

  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
  },

  activeInput: {
    borderColor: '#0B8F3E',
  },

  button: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  disabledButton: {
    backgroundColor: '#ddd',
  },

  activeButton: {
    backgroundColor: '#0B8F3E',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});