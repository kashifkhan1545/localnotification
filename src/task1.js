import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import notifee from '@notifee/react-native';

import { useNavigation } from '@react-navigation/native';
const Home = () => {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notificationTimeoutId, setNotificationTimeoutId] = useState(null);
  
  const navigation = useNavigation();
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate !== undefined) {
      setSelectedDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);

    if (selectedTime !== undefined) {
      const newDate = new Date(selectedDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setSelectedDate(newDate);
    }
  };
  
  const handleActionButton = () => {
    if (notificationTimeoutId) {
      clearTimeout(notificationTimeoutId);
      notifee.cancelAllNotifications();
      setNotificationTimeoutId(null);
      Alert.alert('Meeting Cancelled', 'Your scheduled meeting has been cancelled.');
    } else {
      handleScheduleMeeting();
    }
  };

  const handleScheduleMeeting = async () => {
    try {
      const permission = await notifee.requestPermission();

      if (permission) {
        const channelId = await notifee.createChannel({
          id: 'meeting-channel',
          name: 'Meeting Channel',
        });

        const notificationTime = new Date(selectedDate);
        notificationTime.setMinutes(notificationTime.getMinutes() - 2);

        const delay = notificationTime.getTime() - new Date().getTime();

        const timeoutId = setTimeout(async () => {
          try {
            await notifee.displayNotification({
              title: meetingTitle || 'Meeting Scheduled',
              body: `Your meeting is starting in 2 minutes!\nDate: ${selectedDate.toLocaleDateString()}\nTime: ${selectedDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}`,
              android: {
                channelId,
                smallIcon: 'ic_launcher',
              },
            });
          } catch (error) {
            console.error('Error displaying notification:', error);
          }
        }, delay);

        setNotificationTimeoutId(timeoutId);

        Alert.alert(
          'Meeting Scheduled',
          `Your meeting has been scheduled for ${selectedDate.toLocaleDateString()} at ${selectedDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}`,
        );
      } else {
        console.warn('Permission denied');
      }
    } catch (error) {
      console.error('Error scheduling meeting:', error);
    }
  };

  const handleDailyNotification = async () => {
    try {
      const permission = await notifee.requestPermission();

      if (permission) {
        const channelId = await notifee.createChannel({
          id: 'daily-notification-channel',
          name: 'Daily Notification Channel',
        });

        const now = new Date();
        const todayOnePm = new Date(now);
        todayOnePm.setHours(1, 0, 0, 0);

        if (todayOnePm < now) {
          // If 1 PM has already passed today, schedule for tomorrow
          todayOnePm.setDate(todayOnePm.getDate() + 1);
        }

        const delay = todayOnePm.getTime() - now.getTime();

        const timeoutId = setTimeout(async () => {
          try {
            await notifee.displayNotification({
              title: 'Break time',
              body: 'This is your Break Time at 1 PM!',
              android: {
                channelId,
                smallIcon: 'ic_launcher',
              },
            });
          } catch (error) {
            console.error('Error displaying daily notification:', error);
          }
        }, delay);

        setNotificationTimeoutId(timeoutId);

        Alert.alert('Break Time Set', 'You will receive a daily notification at 1 PM.');
      } else {
        console.warn('Permission denied');
      }
    } catch (error) {
      console.error('Error scheduling daily notification:', error);
    }
  };

 
  return (
    <ImageBackground
      source={require('./images/bg.jpg')}
      style={styles.backgroundImage}>
        
       
      {/* Main Container */}
      <View style={styles.container}>
        <Text style={styles.text}>Schedule Meeting</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="Enter meeting Title..."
          placeholderTextColor="lightgray"
          value={meetingTitle}
          onChangeText={(text) => setMeetingTitle(text)}
        />
        <TouchableWithoutFeedback onPress={() => setShowDatePicker(true)}>
          <View>
            <TextInput
              style={styles.dateInput}
              placeholder="Select Date..."
              placeholderTextColor="lightgray"
              editable={false}
              value={selectedDate.toLocaleDateString()}
            />
          </View>
        </TouchableWithoutFeedback>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TouchableWithoutFeedback onPress={() => setShowTimePicker(true)}>
          <View>
            <TextInput
              style={styles.timeInput}
              placeholder="Select Time..."
              placeholderTextColor="lightgray"
              editable={false}
              value={selectedDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            />
          </View>
        </TouchableWithoutFeedback>
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={selectedDate}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={handleTimeChange}
          />
        )}
        <TouchableOpacity style={styles.Button} onPress={handleActionButton}>
          <Text style={styles.buttonText}>
            {notificationTimeoutId ? 'Cancel Meeting' : 'Set Meeting'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={handleDailyNotification}>
          <Text style={styles.buttonText}>Set Daily Notification</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    color: 'purple',
    fontWeight: 'bold',
    bottom: 50,
  },
  titleInput: {
    borderRadius: 14,
    height: 45,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
    bottom: 30,
  },
  dateInput: {
    borderRadius: 14,
    height: 45,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
    bottom: 30,
  },
  timeInput: {
    borderRadius: 14,
    height: 45,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
    bottom: 30,
  },
  Button: {
    backgroundColor: 'purple',
    borderRadius: 24,
    height: 45,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default Home;
