export default (state = {}, action) => {
  switch (action.type) {
    case 'login':
    case 'exit':
      return {
        type: action.type,
        loginState: action.loginState
      }
    default:
      return state;
  }
}
