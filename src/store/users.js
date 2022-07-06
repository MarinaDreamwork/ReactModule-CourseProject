import { createAction, createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import { localStorageService } from '../services/localStorage.service';
import userService from '../services/user.service';
import { generateAuthErrors } from '../utils/generateAuthErrors';
import { history } from '../utils/history';
import { randomInt } from '../utils/randomInt';

const initialState = localStorageService.getAccessToken()
? {
    entities: null,
    isLoading: true,
    error: null,
    auth: { userId: localStorageService.getUserId() },
    isLoggedIn: true,
    dataLoaded: false
} : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequested: (state) => {
      state.error = null;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
        state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdatedRequestSuccess: (state, action) => {
      if (state.entities) {
        state.entities[state.entities.findIndex(u => u._id === action.payload._id)] = action.payload;
      }
    },
    userUpdatedRequestFailed: (state, action) => {
      state.error = action.payload;
    }
  }
});

const authRequested = createAction('users/authRequested');
const userCreateRequested = createAction('users/createRequested');
const userCreatedFailed = createAction('users/createRequestedFailed');
const userUpdatedRequest = createAction('users/updatedRequest');

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdatedRequestSuccess,
  userUpdatedRequestFailed
} = actions;

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
      const { content } = await userService.get();
      dispatch(usersReceived(content));
    } catch (error) {
      dispatch(usersRequestFailed(error.message));
    }
};

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const { data } = await authService.register({ email, password });
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.localId }));
    dispatch(createUser({
      _id: data.localId,
        email,
        completedMeetings: randomInt(0, 200),
        rate: randomInt(1, 5),
        image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                  )
                  .toString(36)
                  .substring(7)}.svg`,
        ...rest
    }));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const createUser = (payload) => async (dispatch) => {
  dispatch(userCreateRequested());
  try {
    const { content } = await userService.create(payload);
    dispatch(userCreated(content));
    history.push('/');
  } catch (error) {
    dispatch(userCreatedFailed(error.message));
  }
};

export const logIn = ({ payload, redirect }) => async (dispatch) => {
  dispatch(authRequested);
  const { email, password } = payload;
  try {
    const data = await authService.logIn({ email, password });
    dispatch(authRequestSuccess({ userId: data.localId }));
    localStorageService.setTokens(data);
    history.push(redirect);
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
    const errorMessage = generateAuthErrors(message);
    dispatch(authRequestFailed(errorMessage));
    }
  }
};

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find(u => u._id === userId);
  }
};

export const getCurrentUserData = () => (state) => {
  if (state.users.entities) {
    return state.users.entities.find(u => u._id === state.users.auth.userId);
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push('/');
};

export const updatedUserData = (payload) => async (dispatch) => {
  dispatch(userUpdatedRequest());
  try {
    const { content } = await userService.updateCurrentUser(payload);
    dispatch(userUpdatedRequestSuccess(content));
    dispatch(loadUsersList());
  } catch (error) {
    dispatch(userUpdatedRequestFailed(error.message));
  }
};

export const getUsersList = () => (state) => state.users.entities;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
