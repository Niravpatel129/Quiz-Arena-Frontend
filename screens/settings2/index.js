import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SettingsPage({ navigation }) {
  const [settings, setSettings] = useState({
    volume: 50,
    muteFx: false,
    muteMusic: false,
    notifications: false,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.log('Failed to load the settings.', error);
    }
  };

  const handleToggle = (setting) => {
    setSettings((prevSettings) => {
      const newSettings = {
        ...prevSettings,
        [setting]: !prevSettings[setting],
      };
      saveSettings(newSettings);
      return newSettings;
    });
  };

  const saveSettings = async (newSettings) => {
    try {
      await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
    } catch (error) {
      console.log('Failed to save the settings.', error);
    }
  };

  const deleteAccount = () => {
    Alert.alert('Delete Account', 'Are you sure you want to delete your account?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => console.log('Delete Account Pressed'),
        style: 'destructive',
      },
    ]);
  };

  const reportBug = () => {
    console.log('Report Bug Pressed');
    // Placeholder for bug report functionality
  };

  const DATA = [
    {
      title: 'Main Settings',
      data: [
        {
          key: 'muteFx',
          title: 'Mute FX',
          component: (
            <Switch onValueChange={() => handleToggle('muteFx')} value={settings.muteFx} />
          ),
        },
        {
          key: 'muteMusic',
          title: 'Mute Music',
          component: (
            <Switch onValueChange={() => handleToggle('muteMusic')} value={settings.muteMusic} />
          ),
        },
      ],
    },
    {
      title: 'General',
      data: [
        {
          key: 'rateApp',
          title: 'Rate App',
          action: () => {}, // Placeholder function for demo
          icon: <Ionicons name='ios-star-outline' size={20} color='#007AFF' />,
        },
        {
          key: 'shareApp',
          title: 'Share App',
          action: () => {}, // Placeholder function for demo
          icon: <Ionicons name='ios-share-outline' size={20} color='#007AFF' />,
        },
      ],
    },
    {
      title: 'Support',
      data: [
        {
          key: 'reportBug',
          title: 'Report Bug',
          action: reportBug,
          icon: <Ionicons name='ios-bug-outline' size={20} color='#007AFF' />,
        },
      ],
    },
    {
      title: 'Account',
      data: [
        {
          key: 'deleteAccount',
          title: 'Delete Account',
          action: deleteAccount,
          icon: <Ionicons name='ios-trash-outline' size={20} color='#FF3B30' />,
        },
      ],
    },
    {
      title: 'Socials',
      data: [
        {
          key: 'instagram',
          title: 'Instagram',
          icon: <Ionicons name='logo-instagram' size={20} color='#E1306C' />,
        },
        {
          key: 'tiktok',
          title: 'TikTok',
          icon: <FontAwesome5 name='tiktok' size={20} color='#000000' />,
        },
        {
          key: 'discord',
          title: 'Discord',
          icon: <MaterialCommunityIcons name='discord' size={23} color='#7289da' />,
        },
        {
          key: 'reddit',
          title: 'Reddit',
          icon: <Ionicons name='logo-reddit' size={20} color='#FF4500' />,
        },
      ],
    },
  ];

  const renderItem = ({ item, section }) => (
    <TouchableOpacity onPress={item.action} style={styles.itemContainer}>
      {item.icon && <View style={styles.iconContainer}>{item.icon}</View>}
      <Text style={styles.itemTitle}>{item.title}</Text>
      {item.component && <View style={{ flex: 1, alignItems: 'flex-end' }}>{item.component}</View>}
      {section.title === 'Socials' && (
        <Ionicons
          name='ios-arrow-forward'
          size={20}
          color='#C7C7CC'
          style={{ marginLeft: 'auto' }}
        />
      )}
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name='ios-arrow-back' size={24} color='black' />
          <Text style={{ marginLeft: 10, fontSize: 18 }}>Settings</Text>
        </TouchableOpacity>
      </View>
      <SectionList
        sections={DATA}
        keyExtractor={(item) => item.key}
        renderItem={({ item, section }) => renderItem({ item, section })}
        renderSectionHeader={renderSectionHeader}
        // ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => <View style={{ height: 30 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  sectionHeader: {
    paddingTop: 36,
    paddingLeft: 15,
    paddingBottom: 6,
    fontSize: 13,
    fontWeight: 'bold',
    backgroundColor: '#EFEFF4',
    color: '#6D6D72',
    textTransform: 'uppercase',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  iconContainer: {
    marginRight: 15,
  },
  itemTitle: {
    fontSize: 16,
    color: '#000000',
  },
  separator: {
    backgroundColor: '#C6C7C8',
    height: StyleSheet.hairlineWidth,
    marginLeft: 25,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
