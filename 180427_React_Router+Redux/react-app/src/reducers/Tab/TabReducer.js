const TabReducer = (state = {
  lineSlide: false
}, action) => {
  switch (action.type) {
    case 'LINE_SLIDE':
      return {
        lineSlide: action.lineSlide
      };
    default:
      return state;
  }
};

export default TabReducer;