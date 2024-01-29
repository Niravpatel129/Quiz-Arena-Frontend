import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { newRequest } from '../../api/newRequest';
import { useAuth } from '../../context/auth/AuthContext';

export default function NotificationsScreen({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const { fetchNotifications, userNotifications } = useAuth();
  const notifications = userNotifications;

  React.useEffect(() => {
    fetchNotifications();
  }, []);

  const onRefresh = React.useCallback(() => {
    fetchNotifications();
  }, []);

  const deleteNotification = async (id) => {
    await newRequest.delete(`/users/notifications/${id}`);
    fetchNotifications();
  };

  const acceptNotification = async (id, gameId, category, type, options) => {
    console.log('🚀  options:', options);
    if (type === 'gameInvite') {
      if (!gameId || !category) {
        alert('Game failed to start due to an error.');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Categories' }],
        });

        return null;
      }

      navigation.navigate('Challenge', { gameId: gameId, category: category });
    }

    if (type === 'friendRequest') {
      await newRequest.post(`/users/addFriend`, {
        friendId: options.from,
      });

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Success',
        text2: 'Friend request accepted!',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }

    await newRequest.delete(`/users/notifications/${id}`);
  };

  const renderNotification = (notificationInfo) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <View>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 100,
                borderWidth: 3,
                borderColor: '#5E6064',
              }}
              source={{
                uri: 'https://t4.ftcdn.net/jpg/05/69/84/67/360_F_569846700_i3o9u2fhPVVq7iJAzkqMqCwjWSyv53tT.jpg',
                headers: {
                  Accept: '*/*',
                },
              }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: '#5E6064',
                fontSize: 18,
                maxWidth: 250,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              {notificationInfo.message}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  acceptNotification(
                    notificationInfo._id,
                    notificationInfo?.options?.gameId,
                    notificationInfo?.options?.category,
                    notificationInfo.type,
                    notificationInfo,
                  )
                }
                style={{
                  backgroundColor: '#2fdd10',
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: '#5E6064',
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteNotification(notificationInfo._id)}
                style={{
                  backgroundColor: '#dd1010',
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: '#5E6064',
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  Decline
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              color: 'lightgray',
              fontSize: 18,
              fontWeight: 700,
              marginLeft: 20,
              marginBottom: 50,
            }}
          >
            1m
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#ffffff',
      }}
    >
      <SafeAreaView>
        <Ionicons
          name='arrow-back'
          size={24}
          color='#5E6064'
          style={{ marginTop: 16, marginLeft: 16 }}
          onPress={() => navigation.goBack()}
        />
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          style={{
            padding: 10,
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
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {notifications?.length === 0 && (
                <Text
                  style={{
                    color: '#5E6064',
                    fontSize: 18,
                    marginTop: 30,
                  }}
                >
                  Inbox is all clear!
                </Text>
              )}
            </View>
            {notifications?.map((notification, index) => (
              <View key={index}>{renderNotification(notification)}</View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
