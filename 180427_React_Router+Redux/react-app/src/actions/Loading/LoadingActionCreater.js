const LoadingActionCreater = (params) => (dispatch, getState) => {
  dispatch({
    type: params.type,
    text: params.text
  });
};

export default LoadingActionCreater;