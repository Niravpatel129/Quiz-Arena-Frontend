import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { newRequest } from '../../api/newRequest';

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = React.useState([]);

  const fetchNotifications = async () => {
    const response = await newRequest.get('/users/notifications');
    const data = response.data;
    setNotifications(data.notifications);
  };

  React.useEffect(() => {
    fetchNotifications();
  }, []);

  const deleteNotification = async (id) => {
    await newRequest.delete(`/users/notifications/${id}`);
    fetchNotifications();
  };

  const acceptNotification = async (id, gameId, category, type) => {
    await newRequest.delete(`/users/notifications/${id}`);

    if (type === 'challenge') {
      navigation.navigate('Challenge', { gameId: gameId, category: category });
    }
  };

  const renderNotification = (notificationInfo) => {
    console.log('🚀  notificationInfo:', notificationInfo);
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
                borderColor: 'white',
              }}
              source={{
                uri: 'https://t4.ftcdn.net/jpg/05/69/84/67/360_F_569846700_i3o9u2fhPVVq7iJAzkqMqCwjWSyv53tT.jpg',
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
                color: 'white',
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
                style={{
                  backgroundColor: '#2fdd10',
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                  onPress={() =>
                    acceptNotification(
                      notificationInfo._id,
                      notificationInfo.gameId,
                      notificationInfo.category,
                      notificationInfo.type,
                    )
                  }
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
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
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
              fontWeight: 'bold',
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
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#1c2141',
        padding: 10,
      }}
    >
      <View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {notifications.length === 0 && (
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                marginTop: 30,
              }}
            >
              No notifications right now, check later!
            </Text>
          )}
        </View>
        {notifications.map((notification, index) => (
          <View key={index}>{renderNotification(notification)}</View>
        ))}
      </View>
    </ScrollView>
  );
}
