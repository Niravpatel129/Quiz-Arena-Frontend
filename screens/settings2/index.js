import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { SafeAreaView, SectionList, StyleSheet, Switch, Text, View } from 'react-native';

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
              style={{ flex: 1 }}
              value={settings.volume}
              onValueChange={(value) => setSettings({ ...settings, volume: value })}
              minimumValue={0}
              maximumValue={100}
            />
          ),
        },
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
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    paddingTop: 22,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 6,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#EFEFF4',
    color: '#6D6D72',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
    height: 44,
  },
  itemTitle: {
    fontSize: 16,
  },
  actionText: {
    color: '#007AFF',
    fontSize: 16,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#C8C7CC',
    marginLeft: 15,
  },
});
