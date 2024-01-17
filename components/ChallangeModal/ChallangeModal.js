import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { newRequest } from '../../api/newRequest';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';

export default function ChallangeModal({ opponentUserId, isModalVisible, hideModal }) {
  const navigation = useNavigation();
  const [pickerItems, setPickerItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await newRequest('/homepage/list');

      let items = [];
      res.data.forEach((category) => {
        items.push({
          label: category.parentCategory,
          value: category.parentCategory,
          isDivider: true,
        });
        category.subCategories.forEach((sub) => {
          items.push({ label: `  ${sub.name}`, value: sub.name, isDivider: false });
        });
      });

      setPickerItems(items);
      const firstSelectable = items.find((item) => !item.isDivider);
      if (firstSelectable) {
        setSelectedCategory(firstSelectable.value);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (itemValue, itemIndex) => {
    if (!pickerItems[itemIndex].isDivider) {
      setSelectedCategory(itemValue);
    }
  };

  return (
    <Modal
      style={
        {
          // width: '100%',
        }
      }
      animationType='slide'
      //   transparent={true}
      visible={isModalVisible}
      onRequestClose={hideModal}
      presentationStyle='formSheet'
    >
      <SafeAreaView>
        <View
          style={{
            marginTop: 22,
            //   flex: 1,
            //   height: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 10,
              marginLeft: 10,
              marginTop: 100,
              textAlign: 'left',
            }}
          >
            Select Category
          </Text>
          <Picker
            selectedValue={selectedCategory}
            style={{
              width: '100%',
              // height: '100%',
            }}
            onValueChange={handleCategoryChange}
          >
            {pickerItems.map((item, index) => {
              if (item.isDivider) return null;

              return (
                <Picker.Item
                  key={index}
                  label={capitalizeFirstLetter(item.label)}
                  value={item.value}
                  enabled={!item.isDivider}
                />
              );
            })}
          </Picker>
          <TouchableOpacity
            style={{
              width: '80%',
              borderRadius: 15,
              backgroundColor: '#1c2141',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
              marginVertical: 10,
              marginHorizontal: 20,
            }}
            onPress={async () => {
              if (!opponentUserId) {
                return alert('failed to challenge');
              }

              const generatedGameId = Math.floor(Math.random() * 100000);

              await newRequest.post('/users/notifications', {
                type: 'gameInvite',
                receiverId: opponentUserId,
                options: {
                  gameId: generatedGameId,
                  category: selectedCategory,
                },
              });

              hideModal();
              navigation.navigate('Challenge', {
                gameId: generatedGameId,
                categoryName: selectedCategory,
              });
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
