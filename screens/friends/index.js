import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ChatHistory from '../../components/ChatHistory/ChatHistory';
import FriendsList from '../../components/FriendsList/FriendsList';

export default function FriendsScreen({ navigation }) {
  const [activeTab, setActiveTab] = React.useState('tab1');

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#1c2141',
        height: '100%',
      }}
    >
      <ScrollView
        style={{
          backgroundColor: '#1c2141',
          height: '100%',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
            backgroundColor: '#1d284b',
            margin: 10,
            borderRadius: 22,
          }}
        >
          <TouchableOpacity
            onPress={() => setActiveTab('tab1')}
            style={{
              backgroundColor: activeTab === 'tab1' ? 'lightgray' : '#1c2141',
              borderRadius: 22,
              flex: 1,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: activeTab === 'tab1' ? '#1c2141' : '#ffffff',
                fontSize: 22,
                fontWeight: 'bold',
              }}
            >
              Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('tab2')}
            style={{
              backgroundColor: activeTab === 'tab2' ? 'lightgray' : '#1c2141',
              borderRadius: 22,
              flex: 1,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: activeTab === 'tab2' ? '#1c2141' : '#ffffff',
                fontSize: 22,
                fontWeight: 'bold',
              }}
            >
              Chats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('tab3')}
            style={{
              backgroundColor: activeTab === 'tab3' ? 'lightgray' : '#1c2141',
              borderRadius: 22,
              flex: 1,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: activeTab === 'tab3' ? '#1c2141' : '#ffffff',
                fontSize: 22,
                fontWeight: 'bold',
              }}
            >
              Social
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {activeTab === 'tab1' && <FriendsList />}

          {activeTab === 'tab2' && <ChatHistory />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
