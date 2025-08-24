export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

export const validateRegisterForm = ({ name, email, password }) => {
  if (!name.trim()) {
    return "Full name is required";
  }
  if (!isValidEmail(email)) {
    return "Please enter a valid email address";
  }
  if (!isValidPassword(password)) {
    return "Password must be at least 6 characters and include at least one number";
  }
  return null;
};

export const validateLoginForm = ({ email, password }) => {
  if (!isValidEmail(email)) {
    return "Please enter a valid email address";
  }
  if (!password.trim()) {
    return "Password is required";
  }
  return null;
};