// Utility function to return error messages based on missing input fields
export const getLoginErrorMessage = (email, password) => {
    if (email === '' && password === '') {
      return 'Email and password fields are required.';
    } else if (email === '') {
      return 'Email field is required.';
    } else if (password === '') {
      return 'Password field is required.';
    }
    return ''; // Return an empty string when no errors
  };
  