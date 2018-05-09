const HeaderReducer = (state = {
  title: ''
}, action) => {
  switch (action.type) {
    case 'TITLE':
      return {
        title: action.title
      };
    default:
      return state;
  }
};

export default HeaderReducer;