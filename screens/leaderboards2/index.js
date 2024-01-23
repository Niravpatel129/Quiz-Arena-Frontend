import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Leaderboards2() {
  const [selectedTab, setSelectedTab] = React.useState('Friends');
  console.log('🚀  selectedTab:', selectedTab);

  const renderButtons = () => {
    const renderSingleButton = (text, selected) => {
      const backgroundColor = selected
        ? 'linear-gradient(266deg, #84BDFA 19.11%, #3F95F2 89.55%)'
        : 'transparent';
      const bordercolor = selected ? 'none' : '#DCEDFD';
      const borderWidth = selected ? 0 : 1;
      const boxShadow = selected ? `0px 2px 0px 0px #206DD8` : 'none';
      const textColor = selected ? '#FFFFFF' : '#5E6064';

      return (
        <TouchableOpacity
          onPress={() => setSelectedTab(text)}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 16,
            background: backgroundColor,
            borderRadius: 12,
            maxWidth: 150,
            width: '45%',
            boxShadow: boxShadow,
            borderColor: bordercolor,
            borderWidth: borderWidth,
          }}
        >
          <Text
            style={{
              color: textColor,
              fontSize: 16,
              textAlign: 'center',
              fontWeight: 600,
              fontFamily: 'Poppins-Regular',
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
          marginTop: 30,
        }}
      >
        {renderSingleButton('Friends', selectedTab === 'Friends')}
        {renderSingleButton('Global', selectedTab === 'Global')}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#DCEDFD', '#FFFFFF']}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView>
        <ScrollView>
          <View>
            <View
              style={{
                alignItems: 'center',
              }}
            >
              {renderButtons()}
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 30,
                textAlign: 'center',
                marginTop: 50,
              }}
            >
              Leaderboards2
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
