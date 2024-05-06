import { instance } from '../axiosConfig';

export const fetchUserData = async () => {
  try {
    const response = await instance.get('users?page=1');
    return response.data;
  } catch (error) {
    console.log('error getting product data...', error);
    throw error;
  }
};
