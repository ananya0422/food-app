// src/hooks/useAuth.js
const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return { user };
};

export default useAuth;
