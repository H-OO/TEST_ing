export default (state = {}, action) => {
  switch (action.type) {
    case 'GoodsList_init':
    case 'GoodsList_async':
      return {
        list: action.list
      }
    default:
      return state;
  }
}
