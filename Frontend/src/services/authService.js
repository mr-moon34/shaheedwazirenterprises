import axios from 'axios';

const API = 'https://shaheed-wazir-enterprises.onrender.com/api/auth';

export const login = async (credentials) => {
  
  const { data } = await axios.post(`${API}/login`, credentials);
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const logout = () => {
  localStorage.removeItem('user');
};
export const deleteUser = () => {
  localStorage.removeItem('user');
};





