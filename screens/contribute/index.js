import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { TextArea } from 'native-base';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { newRequest } from '../../api/newRequest';
import upload from '../../helpers/upload';

export default function Contribute({ route }) {
  const parentCategory = route.params?.parentCategory;
  const category = route?.params?.category;
  const [question, setQuestion] = useState('');
  const [imageUrl, setImageUrl] = useState(
    'https://static.vecteezy.com/system/resources/previews/004/968/473/original/upload-or-add-a-picture-jpg-file-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg',
  );
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    const newUri = result.assets[0].uri;

    if (!result.canceled) {
      setImageUrl(newUri);
      uploadImage(newUri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const url = await upload(uri);
      console.log('🚀  url:', url);
      setUploadedImageUrl(url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Upload Failed', 'Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!question) return alert('Please enter a question');
    if (!option1) return alert('Please enter option 1');
    if (!option2) return alert('Please enter option 2');
    if (!option3) return alert('Please enter option 3');
    if (!correctOption) return alert('Please enter correct option');

    const questionFormat = {
      category: category,
      parentCategory: parentCategory,
      question: question,
      answers: [
        {
          optionText: option1,
          isCorrect: false,
        },
        {
          optionText: option2,
          isCorrect: false,
        },
        {
          optionText: option3,
          isCorrect: false,
        },
        {
          optionText: correctOption,
          isCorrect: true,
        },
      ],
      correctAnswer: correctOption,
      helperImage: uploadedImageUrl,
    };

    try {
      await newRequest.post('/question', [questionFormat]);

      alert('Question submitted successfully');
      setQuestion('');
      setOption1('');
      setOption2('');
      setOption3('');
      setCorrectOption('');
      setImageUrl(
        'https://static.vecteezy.com/system/resources/previews/004/968/473/original/upload-or-add-a-picture-jpg-file-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg',
      );
      setUploadedImageUrl('');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView>
            <Text
              style={{
                color: 'white',
                fontSize: 30,
                fontWeight: 700,
                textAlign: 'center',
                marginTop: 50,
              }}
            >
              Contribute
            </Text>

            {/* Questions */}
            <View
              style={{
                margin: 20,
                gap: 30,
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    Question:
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 14,
                    }}
                  >
                    0/100
                  </Text>
                </View>
                <TextArea
                  placeholder='Enter your question here'
                  style={{
                    color: 'white',
                  }}
                  value={question}
                  onChangeText={(text) => setQuestion(text)}
                />
              </View>

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 700,
                      marginTop: 10,
                    }}
                  >
                    Question Image (optional)
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    pickImage();
                  }}
                  style={{
                    backgroundColor: 'white',
                  }}
                >
                  <Image
                    resizeMode='contain'
                    style={{
                      width: '100%',
                      height: 250,
                    }}
                    source={{
                      uri: imageUrl,
                      headers: {
                        Accept: '*/*',
                      },
                    }}
                  />
                </TouchableOpacity>
              </View>

              {/* Options */}
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    Incorrect Option 1:
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 14,
                    }}
                  >
                    0/30
                  </Text>
                </View>
                <TextInput
                  style={{
                    height: 40,
                    borderWidth: 1,
                    padding: 10,
                    color: 'white',
                    borderColor: 'lightgray',
                    borderRadius: 10,
                  }}
                  placeholder='Enter option 1'
                  value={option1}
                  onChangeText={(text) => setOption1(text)}
                  keyboardType='default'
                />
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    Incorrect Option 2:
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 14,
                    }}
                  >
                    0/30
                  </Text>
                </View>
                <TextInput
                  style={{
                    height: 40,
                    borderWidth: 1,
                    padding: 10,
                    color: 'white',
                    borderColor: 'lightgray',
                    borderRadius: 10,
                  }}
                  placeholder='Enter option 2'
                  value={option2}
                  onChangeText={(text) => setOption2(text)}
                  keyboardType='default'
                />
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    Incorrect Option 3:
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 14,
                    }}
                  >
                    0/30
                  </Text>
                </View>
                <TextInput
                  style={{
                    height: 40,
                    borderWidth: 1,
                    padding: 10,
                    color: 'white',
                    borderColor: 'lightgray',
                    borderRadius: 10,
                  }}
                  placeholder='Enter option 3'
                  value={option3}
                  onChangeText={(text) => setOption3(text)}
                  keyboardType='default'
                />
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    Correct Option:
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 14,
                    }}
                  >
                    0/30
                  </Text>
                </View>
                <TextInput
                  style={{
                    height: 40,
                    borderWidth: 1,
                    padding: 10,
                    color: 'white',
                    borderColor: 'lightgray',
                    borderRadius: 10,
                  }}
                  placeholder='Enter option 4'
                  value={correctOption}
                  onChangeText={(text) => setCorrectOption(text)}
                  keyboardType='default'
                />
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: 10,
                }}
              >
                By submitting, you acknowledge and agree to our End User License Agreement (EULA).
                Our EULA clearly states our zero-tolerance policy towards objectionable content and
                abusive behavior. Any violations may lead to the removal of your content and
                suspension of your account. Please review the EULA for detailed terms and conditions
                governing your contributions and conduct within our app.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
              style={{
                margin: 20,
                backgroundColor: 'white',
                padding: 14,
                borderRadius: 10,
                marginBottom: 50,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 700,
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
