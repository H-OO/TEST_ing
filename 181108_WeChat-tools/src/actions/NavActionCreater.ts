export default (params: object = {}) => (
  dispatch: (arg: object) => void,
  getState: () => any
) => {
  dispatch(params);
};
