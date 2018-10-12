export default (state: object = {}, action: object = {}) => {
  const { type, list }: { type?: string, list?: Array<number|string> } = action;
  switch (type) {
    case 'GET_LIST':
      return {
        type,
        list
      }
    default:
      return state;
  }
};
