import { createSlice } from '@reduxjs/toolkit';
import professionService from '../services/profession.service';

const professionSlice = createSlice({
  name: 'profession',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    professionsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: professionReducer, actions } = professionSlice;
const {
  professionsRequested,
  professionsReceived,
  professionsRequestFailed
} = actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().profession;
  if (isOutdated(lastFetch)) {
    dispatch(professionsRequested());
    try {
      const { content } = await professionService.get();
      dispatch(professionsReceived(content));
    } catch (error) {
      dispatch(professionsRequestFailed(error.message));
    }
  }
};

function isOutdated(date) {
  if (Date.now() - date > 10 * 6 * 1000) return true;
  else return false;
}

export const getProfessions = () => (state) => state.profession.entities;
export const getProfessionLoading = () => (state) => state.profession.isLoading;

export default professionReducer;
