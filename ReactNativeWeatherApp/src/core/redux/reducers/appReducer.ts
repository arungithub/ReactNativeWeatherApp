import { AnyAction } from 'redux';
import { actionTypes } from '../actions/appActions';

export const initialState = {
  appLoaded: false,
};

const AppReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.APP_LOADED:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default AppReducer;