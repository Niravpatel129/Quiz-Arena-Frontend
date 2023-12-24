import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { newRequest } from '../../api/newRequest';

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = React.useState([]);
  console.log('🚀  notifications:', notifications);

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

  const acceptNotification = async (id, gameId, category) => {
    await newRequest.delete(`/users/notifications/${id}`);

    navigation.navigate('Challenge', { gameId: gameId, category: category });
  };

  return (
    <View>
      <View>
        {notifications.map((notification, index) => (
          <View key={index} style={styles.notificationContainer}>
            <Text key={index}>{notification.message}</Text>
            <Text key={index}>{notification.type}</Text>
            <Text key={index}>{notification.createdAt}</Text>
            {notification.type === 'gameInvite' && (
              <Pressable
                style={styles.button}
                onPress={() =>
                  acceptNotification(
                    notification._id,
                    notification.options.gameId,
                    notification.options.category,
                  )
                }
              >
                <Text style={styles.buttonText}>Accept</Text>
              </Pressable>
            )}
            <Pressable style={styles.button} onPress={() => deleteNotification(notification._id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#f95656',
    backgroundColor: '#fff',
  },
  button: {
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
    borderRadius: '5px',
    backgroundColor: '#f95656',
    padding: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
