const GET_DATA = 'GET_GOODSID';
const GET_DATA_SUCCESS = 'GET_GOODSID_SUCCESS';

const goodsId = (oldState = '--', action) => {
  switch (action.type) {
    case GET_DATA:
      return oldState;
    case GET_DATA_SUCCESS:
      // const successState = action.goodsId;
      // return successState;
      console.log(this);
      return 'test_ing'
    default:
      return oldState;
  }
};

export default goodsId;
