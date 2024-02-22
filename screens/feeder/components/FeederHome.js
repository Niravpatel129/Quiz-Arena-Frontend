import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { newRequest } from '../../../api/newRequest';
import CustomButton from './CustomButton';
import RenderKing from './RenderKing';

export default function FeederHome({ categoryName, handleEnter }) {
  const navigation = useNavigation();
  const [currentFeederKing, setCurrentFeederKing] = React.useState(undefined);

  useEffect(() => {
    const fetchFeederKing = async () => {
      try {
        const response = await newRequest.get(`/feeder/king/${categoryName.replace(/ /g, '-')}`);

        setCurrentFeederKing(response.data);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchFeederKing();
  }, [categoryName]);

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#0074da',
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            height: '100%',
            margin: 30,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ position: 'absolute', top: 0, left: 0, padding: 0, zIndex: 1 }}
          >
            <Ionicons name='close' size={30} color='#9f9f9f' />
          </TouchableOpacity>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Text
              style={{
                fontFamily: 'poppins-semiBold',
                fontSize: 30,
                textAlign: 'center',
                color: '#fff',
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 3,
                marginTop: 100,
              }}
            >
              Secret Feeder Mode
            </Text>
            <Text
              style={{
                fontFamily: 'poppins-semiBold',
                fontSize: 22,
                textAlign: 'center',
                color: '#fff',
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
                textTransform: 'capitalize',
              }}
            >
              {categoryName || 'General Knowledge'}
            </Text>

            {currentFeederKing && (
              <RenderKing currentFeederKing={currentFeederKing} categoryName={categoryName} />
            )}
            <View
              style={{
                width: '100%',
              }}
            >
              <CustomButton
                title='Enter'
                onPress={() => {
                  handleEnter();
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
