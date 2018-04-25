import fetch from 'isomorphic-fetch';

const GET_DATA = 'GET_GOODSID';
const GET_DATA_SUCCESS = 'GET_GOODSID_SUCCESS';

const kdata = id => (dispatch, getState) => {
  dispatch({
    type: GET_DATA,
    payload: 0
  });
  fetch('http://hjmtsrvlive.g9999.cn:11188/listkdata', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'account=xxx1&symbol=GOLD&period=1'
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: GET_DATA_SUCCESS,
        payload: data.goodsId
      });
      console.log(data);
    });
};

export default kdata;
