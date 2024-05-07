import { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Hook to reset state on focus
import { login } from '../services/authService';
import { getAuthErrorMessage } from '../utils/errorHandling/firebaseAuthErrors';
import { getGeneralErrorMessage } from '../utils/errorHandling/generalErrors';
import { getLoginErrorMessage } from '../utils/errorHandling/loginAndSignUpErrors'; // Import the utility function
import LoadingIndicator from '../components/LoadingIndicator'; // Reusable loading indicator component

export default function LoginScreen({ route, navigation }) {
  // Initialize local state for email, password, error messages, and loading status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Effect to pre-fill the email field if the user navigates from the sign-up screen
  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, [route.params]);


  // Handle the login process, including validation and error handling
  const handleLogin = async () => {
    const validationError = getLoginErrorMessage(email, password);
    if (validationError) {
      setError(validationError); // Show error message if fields are missing
      return;
    }

    setLoading(true); // Show a loading indicator while the login attempt is processing
    setError(''); // Clear previous errors
    Keyboard.dismiss(); // Close the keyboard to improve user experience

    try {
      // Attempt to log the user in using the `login` function
      await login(email, password);
      navigation.navigate('Home'); // Redirect to the Home screen on successful login
      // Reset input fields on success to ensure a clean state
      setEmail('');
      setPassword('');
    } catch (err) {
      // Fetch and display an appropriate error message using Firebase error mapping
      const message = err.code ? getAuthErrorMessage(err.code) : getGeneralErrorMessage();
      setError(message);
    } finally {
      setLoading(false); // Hide the loading indicator after processing is complete
    }
  };

  // Dismiss the keyboard when touching outside the input fields
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry // Mask the password input for security
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {loading ? (
          <LoadingIndicator size="large" color="#007bff" /> // Show loading indicator while loading
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Logging In...' : 'Login'}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
