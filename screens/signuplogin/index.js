import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignUpLogin() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  useEffect(() => {}, []);

  return (
    <SafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        style={{
          margin: 20,
          height: '100%',
        }}
      >
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../assets/logo.png')}
            style={{
              width: 180,
              height: 180,
              resizeMode: 'contain',
              marginBottom: 10,
            }}
          />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                marginBottom: 20,
                color: 'white',
                fontFamily: 'Inter-Bold',
                fontWeight: 'bold',
              }}
            >
              Sign up or login
            </Text>
            {/* Input Email */}
            <View
              style={{
                width: '100%',
                position: 'relative',
              }}
            >
              <Ionicons
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 10,
                  zIndex: 1,
                }}
                name={'person'}
                size={30}
                color={'#516696'}
              />
              <TextInput
                style={{
                  padding: 10,
                  backgroundColor: 'white',
                  borderRadius: 6,
                  marginBottom: 10,
                  fontSize: 20,
                  paddingVertical: 17,
                }}
                placeholder='Email'
                keyboardType='email-address'
                onChangeText={setEmail}
                value={email}
              />
            </View>
            {/* Input Password */}
            <View
              style={{
                position: 'relative',
                width: '100%',
              }}
            >
              <Ionicons
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 10,
                  zIndex: 1,
                }}
                name={'lock-closed'}
                size={30}
                color={'#516696'}
              />
              <TextInput
                style={{
                  padding: 10,
                  backgroundColor: 'white',
                  borderRadius: 6,
                  marginBottom: 10,
                  fontSize: 20,
                  paddingVertical: 17,
                }}
                placeholder='Password'
                secureTextEntry
                onChangeText={setPassword}
                value={password}
              />
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  marginBottom: 20,
                }}
              >
                Forgot your password?
              </Text>
            </TouchableOpacity>

            {/* bottom of the page submit button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#e9eef3',
                padding: 18,
                borderRadius: 10,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 40,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    marginLeft: 6,
                    color: '#516696',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                >
                  Continue
                </Text>
                <Ionicons name={'arrow-forward'} size={20} color={'#516696'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
