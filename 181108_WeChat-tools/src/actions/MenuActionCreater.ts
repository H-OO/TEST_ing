export default (params: any = {}) => (
  dispatch: (arg: any) => void,
  getState: () => any
) => {
  dispatch(params);
};
