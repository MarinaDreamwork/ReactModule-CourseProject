import { createSlice } from '@reduxjs/toolkit';
import qualityService from '../services/quality.service';

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const {
  qualitiesRequested,
  qualitiesReceived,
  qualitiesRequestFailed
} = actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  if (isOutdated(lastFetch)) {
    dispatch(qualitiesRequested());
  try {
    const { content } = await qualityService.get();
    dispatch(qualitiesReceived(content));
  } catch (error) {
    dispatch(qualitiesRequestFailed(error.message));
  }
  }
};

function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) return true;
  else return false;
};

export const getQualitiesByIds = (qualitiesIds) => (state) => {
  if (state.qualities.entities) {
    const qualitiesArray = [];
    for (const qualId of qualitiesIds) {
      for (const quality of state.qualities.entities) {
        if (qualId === quality._id) {
          qualitiesArray.push(quality);
          break;
        }
      }
    }
    return qualitiesArray;
  }
  return [];
};

export const getQual = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading;

export default qualitiesReducer;