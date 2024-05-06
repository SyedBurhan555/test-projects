import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserData } from '../../api/UserHelperApi';

export const UserData = createAsyncThunk('User/FetchUserData', async () => {
  try {
    const response = await fetchUserData();
    return response.data; // Assuming response is an array of students
  } catch (error) {
    throw Error('Failed to fetch sections data');
  }
});

const initialState = {
  user: [],
  loading: false,
  error: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    sortUsers: (state, action) => {
      const columnName = action.payload;
      console.log(columnName); // Convert columnName to lowercase
      const sortedUsers = [...state.user]; // Create a shallow copy of the users array
      sortedUsers.sort((a, b) => {
        if (columnName === 'customerId') {
          return a.id - b.id;
        } else if (columnName === 'customerName') {
          const nameA = a.first_name.toLowerCase();
          const nameB = b.first_name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        } else if (columnName === 'customerEmail') {
          const nameA = a.email;
          const nameB = b.email;
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }
        return 0;
      });
      state.user = sortedUsers; // Update state with the sorted array
    },
    addUserData: (state, action) => {
      return {
        ...state,
        user: [...state.user, action.payload],
      };
    },
    removeUser: (state, action) => {
      return {
        ...state,
        user: state.user.filter((item) => item.id !== action.payload),
      };
    },
    updateUser: (state, action) => {
      const { id, newData } = action.payload;
      return {
        ...state,
        user: state.user.map((user) => {
          if (user.id === id) {
            return { ...user, ...newData }; // Merge the existing user data with the new data
          } else {
            return user; // Return unchanged for other users
          }
        }),
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(UserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user-data', JSON.stringify(action.payload));
      })
      .addCase(UserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addUserData, removeUser, updateUser, sortUsers } =
  UserSlice.actions;

export const allUser = (state) => state.allUser;

export default UserSlice.reducer;
