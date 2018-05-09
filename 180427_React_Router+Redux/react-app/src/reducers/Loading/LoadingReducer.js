const LoadingReducer = (state = {
  text: 'Get Something!'
}, action) => {
  switch (action.type) {
    case 'LOADING_TEXT':
      return {
        text: action.text
      };
    default:
      return state;
  }
};

export default LoadingReducer;