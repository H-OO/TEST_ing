export default (state = {}, action) => {
  const {type, loginState} = action;
  switch (type) {
    case 'login':
    case 'exit':
      return {
        type,
        loginState
      }
    default:
      return state;
  }
}