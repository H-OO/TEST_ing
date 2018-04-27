const GET_DATA = 'HOME_GET_DATA';
const GET_DATA_SUCCESS = 'HOME_GET_DATA_SUCCESS';

const HomeAtionCreater = params => (dispatch, getState) => {
  dispatch({
    type: GET_DATA,
    payload: '__GET_DATA_ING__'
  });
  setTimeout(() => {
    dispatch({
      type: GET_DATA_SUCCESS,
      payload: '__GET_DATA_SUCCESS__'
    });
  }, 1000);
};

export default HomeAtionCreater;
