import React from 'react';
import { Text, View } from 'react-native';
import { newRequest } from '../../api/newRequest';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = React.useState([]);

  const fetchNotifications = async () => {
    const response = await newRequest.get('/users/notifications');
    const data = response.data;
    setNotifications(data.notifications);
  };

  React.useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <View>
      <Text>Notifications</Text>
      <View>
        {notifications.map((notification, index) => (
          <Text key={index}>{notification.message}</Text>
        ))}
      </View>
    </View>
  );
}
