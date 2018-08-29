export default params => (dispatch, getState) => {
  dispatch(params);
  setTimeout(() => {
    dispatch({
      type: 'GoodsList_async',
      list: [1, 2, 3, 4, 5]
    });
  }, 1000);
}