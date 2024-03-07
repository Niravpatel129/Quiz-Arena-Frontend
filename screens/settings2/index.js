import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { Platform, SafeAreaView, SectionList, StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    volume: 50,
    muteFx: false,
    muteMusic: false,
    notifications: false,
  });

  const handleToggle = (setting) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  const DATA = [
    {
      title: 'Main Settings',
      data: [
        {
          key: 'volumeSlider',
          title: 'Volume',
          component: (
            <Slider
              style={{ width: Platform.OS === 'ios' ? 150 : 200, height: 40 }}
              value={settings.volume}
              onValueChange={(value) => setSettings({ ...settings, volume: value })}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor='#007AFF'
              maximumTrackTintColor='#000000'
            />
          ),
        },
        {
          key: 'muteFx',
          title: 'Mute FX',
          component: (
            <Switch
              onValueChange={() => handleToggle('muteFx')}
              value={settings.muteFx}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.muteFx ? '#f5dd4b' : '#f4f3f4'}
            />
          ),
        },
        {
          key: 'muteMusic',
          title: 'Mute Music',
          component: (
            <Switch
              onValueChange={() => handleToggle('muteMusic')}
              value={settings.muteMusic}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.muteMusic ? '#f5dd4b' : '#f4f3f4'}
            />
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
          component: <Text style={styles.actionText}>Go to Store</Text>,
        },
        {
          key: 'shareApp',
          title: 'Share App',
          component: <Text style={styles.actionText}>Share</Text>,
        },
      ],
    },
    {
      title: 'Notifications',
      data: [
        {
          key: 'notifications',
          title: 'Notifications',
          component: (
            <Switch
              onValueChange={() => handleToggle('notifications')}
              value={settings.notifications}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.notifications ? '#f5dd4b' : '#f4f3f4'}
            />
          ),
        },
      ],
    },
  ];

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      {item.component}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => <View style={{ height: 30 }} />} // Add space at the bottom
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    height: 44,
  },
  itemTitle: {
    fontSize: 16,
    color: '#000000',
  },
  actionText: {
    color: '#007AFF',
    fontSize: 16,
  },
  separator: {
    backgroundColor: '#C6C7C8',
    height: StyleSheet.hairlineWidth,
    marginLeft: 15,
  },
});
