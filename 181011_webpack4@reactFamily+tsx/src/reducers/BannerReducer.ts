export default (state: object = {}, action: object = {}) => {
  interface I_action {
    type?: string;
    bannerList?: Array<string>;
  }
  const { type, bannerList }: I_action = action;
  switch (type) {
    case 'GET_BANNERLIST':
      return {
        type,
        bannerList
      };
    default:
      return state;
  }
};
