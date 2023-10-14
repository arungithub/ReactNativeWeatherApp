export const actionTypes = {
    APP_LOADED: 'APP/APP_LOADED',
  };
  
  export const appLoaded = () => {
    return {
      type: actionTypes.APP_LOADED,
      payload: { appLoaded: true },
    };
  };