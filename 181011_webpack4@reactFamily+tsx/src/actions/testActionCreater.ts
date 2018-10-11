export default (params: object = {}) => (dispatch: (arg: object) => void, getState: () => object) => {
  dispatch(params);
}
