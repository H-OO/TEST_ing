const LoadingActionCreater = (params) => (dispatch, getState) => {
  console.log(params.type);
  console.log(params.text);
  
  dispatch({
    type: params.type,
    text: params.text
  });
};

export default LoadingActionCreater;