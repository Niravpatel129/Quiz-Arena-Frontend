import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import ChatHistory from '../../components/ChatHistory/ChatHistory';
import FriendsList from '../../components/FriendsList/FriendsList';
import SocialsList from '../../components/SocialsList/SocialsList';

export default function FriendsScreen({ navigation }) {
  const [activeTab, setActiveTab] = React.useState('tab1');

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#ffffff',
        height: '100%',
      }}
    >
      <View
        style={{
          // backgroundColor: '#1c2141',
          height: '100%',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
            backgroundColor: '#84BDFA',
            margin: 10,
            borderRadius: 22,
          }}
        >
          <TouchableOpacity
            onPress={() => setActiveTab('tab1')}
            style={{
              backgroundColor: activeTab === 'tab1' ? '#206DD8' : '#ffffff',
              borderRadius: 22,
              flex: 1,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: activeTab === 'tab1' ? '#ffffff' : '#206DD8',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('tab2')}
            style={{
              backgroundColor: activeTab === 'tab2' ? '#206DD8' : '#ffffff',
              borderRadius: 22,
              flex: 1,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: activeTab === 'tab2' ? '#ffffff' : '#206DD8',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              Chats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('tab3')}
            style={{
              backgroundColor: activeTab === 'tab3' ? '#206DD8' : '#ffffff',
              borderRadius: 22,
              flex: 1,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: activeTab === 'tab3' ? '#ffffff' : '#206DD8',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              External
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {activeTab === 'tab1' && <FriendsList />}

          {activeTab === 'tab2' && <ChatHistory />}

          {activeTab === 'tab3' && <SocialsList />}
        </View>
      </View>
    </SafeAreaView>
  );
}
