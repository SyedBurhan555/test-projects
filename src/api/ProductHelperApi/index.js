
import { instance } from '../axiosConfig';

export const fetchProductData = async () => {
  try {
    const response = await instance.get();
    return response.data;
  } catch (error) {
    console.log('error getting product data...', error);
    throw error;
  }
};

// export const sectionCreate = async (_data) => {
//   console.log('class api helper data coming', _data);
//   try {
//     const response = await instanceAuth.post('Section', _data);
//     return response;
//   } catch (error) {
//     console.log('error creating section...', error);
//     throw error;
//   }
// };

// export const sectionUpdate = async ({ id, sectionData }) => {
//   try {
//     const response = await instanceAuth.put(`Section/${id}`, sectionData);
//     return response;
//   } catch (error) {
//     console.log('error updating section...', error);
//     throw error;
//   }
// };

// export const sectionDelete = async (id) => {
//   try {
//     console.log('delete id', id);
//     const response = await instanceAuth.delete(`Section/${id}`);
//     return response;
//   } catch (error) {
//     console.log('error deleting section...', error);
//     throw error;
//   }
// };
