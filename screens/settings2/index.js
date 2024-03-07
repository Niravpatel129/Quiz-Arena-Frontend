import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as MailComposer from 'expo-mail-composer';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  SafeAreaView,
  SectionList,
  Share,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { newRequest } from '../../api/newRequest';
import { useAuth } from '../../context/auth/AuthContext';
import { useSound } from '../../context/sound/SoundContext';

export default function SettingsPage() {
  const auth = useAuth();
  const { soundSettings, setSoundSettings } = useSound();
  const navigation = useNavigation();

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

  const handleDelete = async () => {
    try {
      await newRequest.delete('/users');

      auth.signOut();

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Account Deleted',
        text2: 'Logging out...',
        visibilityTime: 3000,
        autoHide: true,
      });

      //   logout user
    } catch (err) {
      console.log(err);
    }
  };

  const rateApp = () => {
    const iosAppId = 'id6474947179';
    const androidAppPackage = 'com.niravpatelp129.QuizArenaFrontendScaffold';

    const iosUrl = `itms-apps://itunes.apple.com/app/${iosAppId}`;
    const androidUrl = `market://details?id=${androidAppPackage}`;

    const url = Platform.OS === 'ios' ? iosUrl : androidUrl;

    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  const shareApp = () => {
    const message = `Check out Quiz Arena on ios app store or google play store!!`;
    Share.share({
      message,
      url: 'http://quizarena.gg',
      title: 'Share App',
    }).catch((err) => console.error('An error occurred', err));
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

    setSoundSettings((prevSettings) => {
      const newSettings = {
        ...prevSettings,
        [setting]: !prevSettings[setting],
      };
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
        onPress: () => handleDelete(),
        style: 'destructive',
      },
    ]);
  };

  const reportBug = async () => {
    console.log('Report Bug Pressed');

    const deviceModel = Constants.deviceName; // Get the device model
    const osName = Platform.OS; // Get the OS name (e.g., ios, android)
    const osVersion = Platform.Version; // Get the OS version
    const appVersion = Constants.manifest.version; // Get the app version from the app manifest

    // Create the email subject
    const subject = `Bug Report - ${new Date().toLocaleDateString()}`;

    // Create a detailed email body
    const body = `
Dear Support Team,

I've encountered a bug while using your app and would like to report it for further investigation. Here are some details that might help you in diagnosing the issue:

- **Bug Description**: [Please describe the bug in detail, including what you were trying to do when the bug occurred and any specific error messages you saw.]

- **Steps to Reproduce**: [Provide steps to reproduce the bug, if possible.]

- **Expected Behavior**: [Describe what you expected to happen.]

- **Actual Behavior**: [Describe what actually happened.]

- **Device Information**:
  - Model: ${deviceModel}
  - Operating System: ${osName}
  - OS Version: ${osVersion}
  - App Version: ${appVersion}

Please let me know if you need any further information from my end.

Best regards,
[Your Name]
`;

    // Check if the MailComposer can send mail
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      MailComposer.composeAsync({
        recipients: ['playquizarena@gmail.com'],
        subject: subject,
        body: body,
      })
        .then(() => {
          console.log('Email composer opened');
        })
        .catch((error) => {
          console.error('Error opening email composer: ', error);
        });
    } else {
      console.log('Email is not setup on this device');
    }
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
          action: rateApp, // Placeholder function for demo
          icon: <Ionicons name='ios-star-outline' size={20} color='#007AFF' />,
        },
        {
          key: 'shareApp',
          title: 'Share App',
          action: shareApp, // Placeholder function for demo
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
      title: 'Socials',
      data: [
        {
          key: 'instagram',
          title: 'Instagram',
          action: () => Linking.openURL('https://www.instagram.com/quizarena_app/?hl=en'),
          icon: <Ionicons name='logo-instagram' size={20} color='#E1306C' />,
        },
        {
          key: 'tiktok',
          title: 'TikTok',
          action: () => Linking.openURL('https://www.tiktok.com/@officialquizarena?lang=en'),
          icon: <FontAwesome5 name='tiktok' size={20} color='#000000' />,
        },
        {
          key: 'discord',
          title: 'Discord',
          action: () => Linking.openURL('https://discord.gg/fEAkejAWKE'),
          icon: <MaterialCommunityIcons name='discord' size={23} color='#7289da' />,
        },
        {
          key: 'reddit',
          title: 'Reddit',
          action: () => Linking.openURL('https://www.reddit.com/r/quizarena/'),
          icon: <Ionicons name='logo-reddit' size={20} color='#FF4500' />,
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
