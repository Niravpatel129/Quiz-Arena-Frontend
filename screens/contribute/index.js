import { LinearGradient } from 'expo-linear-gradient';
import { TextArea } from 'native-base';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Contribute() {
  const [question, setQuestion] = useState('');
  const [imageUrl, setImageUrl] = useState(
    'https://static.vecteezy.com/system/resources/previews/004/968/473/original/upload-or-add-a-picture-jpg-file-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg',
  );
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [correctOption, setCorrectOption] = useState('');

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={{ flex: 1 }}>
      <SafeAreaView style={{}}>
        <ScrollView>
          <Text
            style={{
              color: 'white',
              fontSize: 30,
              fontWeight: 'bold',
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
                    fontWeight: 'bold',
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
                    fontWeight: 'bold',
                    marginTop: 10,
                  }}
                >
                  Question Image (optional)
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 'bold',
                      marginTop: 10,
                    }}
                  >
                    Clear Image
                  </Text>
                </TouchableOpacity>
              </View>
              <View
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
                  }}
                />
              </View>
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
                    fontWeight: 'bold',
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
                    fontWeight: 'bold',
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
                    fontWeight: 'bold',
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
                    fontWeight: 'bold',
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
          <TouchableOpacity
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
                fontWeight: 'bold',
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
