const GET_DATA = 'GET_GOODSID';
const GET_DATA_SUCCESS = 'GET_GOODSID_SUCCESS';
const goodsId = param => (dispatch, getState) => {
  dispatch({
    type: GET_DATA
  })
  // 模拟HTTP ↓↓↓
  setTimeout(() => {
    dispatch({
      type: GET_DATA_SUCCESS,
      goodsId: 'GOLD'
    })
  }, 1000)
  // 模拟HTTP ↑↑↑
};

export default goodsId;
