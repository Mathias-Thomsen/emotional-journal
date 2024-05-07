import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { signup } from '../services/authService';
import { getAuthErrorMessage } from '../utils/errorHandling/firebaseAuthErrors';
import { getLoginErrorMessage } from '../utils/errorHandling/loginAndSignUpErrors'; // Import the utility function
import LoadingIndicator from '../components/LoadingIndicator'; // Import reusable loading indicator

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle validation primarily for email format


  const handleSignUp = async () => {
    const validationError = getLoginErrorMessage(email, password);
    if (validationError) {
      setError(validationError); // Show error message if fields are missing
      return;
    }

    setLoading(true);
    setError(''); // Clear previous errors
    Keyboard.dismiss(); // Dismiss keyboard for a better user experience

    try {
      // Use the signup function from authService
      await signup(email, password);
      // Redirect to the login screen, passing the email as a parameter
      navigation.navigate('Login', { email });
    } catch (err) {
      // Use the Firebase error mapping function
      const message = err.code ? getAuthErrorMessage(err.code) : err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Your Account</Text>
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
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {loading ? (
          <LoadingIndicator size="large" color="#28a745" /> // Use the reusable LoadingIndicator
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
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
    backgroundColor: '#28a745',
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
