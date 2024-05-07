// src/screens/HomeScreen.js
import { View, Text, Button } from 'react-native';
import { logout } from '../services/authService'; // Import the logout function

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View>
      <Text>Welcome to your Emotional Journal!</Text>
      <Button
        title="New Entry"
        onPress={() => navigation.navigate('NewEntry')}
      />
      <Button
        title="Logout"
        onPress={handleLogout}
      />
    </View>
  );
}
