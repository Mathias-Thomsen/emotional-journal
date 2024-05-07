// navigation/AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useAuth } from '../store/AuthContext';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { currentUser } = useAuth();

  return (
    <Stack.Navigator>
      {!currentUser ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
}
