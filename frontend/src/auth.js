// Authentication utility functions

export const setToken = (token) => {
  localStorage.setItem('quiz_token', token);
};

export const getToken = () => {
  return localStorage.getItem('quiz_token');
};

export const removeToken = () => {
  localStorage.removeItem('quiz_token');
};

export const setUser = (user) => {
  localStorage.setItem('quiz_user', JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem('quiz_user');
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem('quiz_user');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const isAdmin = () => {
  const user = getUser();
  return user && user.role === 'admin';
};

export const logout = () => {
  removeToken();
  removeUser();
};
