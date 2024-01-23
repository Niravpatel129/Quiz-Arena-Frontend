import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Leaderboards2() {
  const [selectedTab, setSelectedTab] = React.useState('Friends');

  const renderButtons = () => {
    const renderSingleButton = (text, selected) => {
      const textColor = selected ? '#FFFFFF' : '#5E6064';
      const buttonStyle = {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        flex: 1, // Equal space distribution
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: selected ? 0 : 1,
        borderColor: selected ? 'none' : '#DCEDFD',
        shadowColor: selected ? '#206DD8' : 'transparent',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: selected ? 1.0 : 0,
        shadowRadius: selected ? 3 : 0,
        elevation: selected ? 4 : 0, // for Android shadow effect
      };

      return (
        <TouchableOpacity
          onPress={() => setSelectedTab(text)}
          style={{
            flex: 1,
          }}
        >
          {selected ? (
            <LinearGradient
              colors={['#84BDFA', '#3F95F2']}
              start={[0.0, 0.0]}
              end={[1.0, 1.0]}
              style={buttonStyle}
            >
              <Text
                style={{
                  color: textColor,
                  fontSize: 16,
                  fontWeight: '600',
                  fontFamily: 'poppins-regular',
                }}
              >
                {text}
              </Text>
            </LinearGradient>
          ) : (
            <View style={buttonStyle}>
              <Text
                style={{
                  color: textColor,
                  fontSize: 16,
                  fontWeight: '600',
                  fontFamily: 'poppins-regular',
                }}
              >
                {text}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 10,
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
        paddingHorizontal: 12,
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
                marginTop: 10,
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
