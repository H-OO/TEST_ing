/**
 * kdata reducer
 */
const GET_DATA = 'GET_GOODSID';
const GET_DATA_SUCCESS = 'GET_GOODSID_SUCCESS';

const goodsId = (oldState = '--', action) => {
  switch (action.type) {
    // 同步发送action
    case GET_DATA:
      return oldState;
    // 异步发送action
    case GET_DATA_SUCCESS:
      const successState = action.payload;
      return successState;
    default:
      return oldState;
  }
};

export default goodsId;
