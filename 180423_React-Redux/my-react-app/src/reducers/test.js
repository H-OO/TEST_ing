const GET_DATA = 'GET_TEST';
const GET_DATA_SUCCESS = 'GET_TEST_SUCCESS';
const test = (oldState = 'test', action) => {
  switch (action.type) {
    case GET_DATA:
      return oldState;
    case GET_DATA_SUCCESS:
      // const successState = action.goodsId;
      // return successState;
      return 'test_ing'
    default:
      return oldState;
  }
}

export default test;