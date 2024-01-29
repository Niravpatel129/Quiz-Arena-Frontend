import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import ChatHistory from '../../components/ChatHistory/ChatHistory';
import FriendsList from '../../components/FriendsList/FriendsList';
import SocialsList from '../../components/SocialsList/SocialsList';

export default function FriendsScreen({ navigation }) {
  const [activeTab, setActiveTab] = React.useState('tab1');

  const renderTabs = ({ text, selected, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: selected ? '#3F95F2' : '#ffffff',
          borderRadius: 10,
          borderWidth: selected ? 0 : 1,
          borderColor: selected ? '' : '#beddff',
          flex: 1,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: selected ? '#ffffff' : '#5E6064',
            fontSize: 14,
            textTransform: 'capitalize',
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#ffffff',
        height: '100%',
      }}
    >
      <View
        style={{
          height: '100%',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            // backgroundColor: '#84BDFA',
            gap: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 22,
            marginBottom: 20,
          }}
        >
          {renderTabs({
            text: 'Friends',
            selected: activeTab === 'tab1',
            onPress: () => setActiveTab('tab1'),
          })}
          {renderTabs({
            text: 'Chats',
            selected: activeTab === 'tab2',
            onPress: () => setActiveTab('tab2'),
          })}
          {renderTabs({
            text: 'External',
            selected: activeTab === 'tab3',
            onPress: () => setActiveTab('tab3'),
          })}
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
