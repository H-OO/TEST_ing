export default (state: object = {}, action: object = {}) => {
  interface I_action {
    type?: string;
    list?: Array<number | string>;
  }
  const { type, list }: I_action = action;
  switch (type) {
    case 'GET_LIST':
      return {
        type,
        list
      };
    default:
      return state;
  }
};
