// 你想要的异步
// import fetch from 'isomorphic-fetch';

// const GET_DATA = 'GET_LIST';
const GET_DATA_SUCCESS = 'GET_LIST_SUCCESS';

const ListActionCreater = params => (dispatch, getState) => {
  // dispatch({
  //   type: GET_DATA,
  //   list: []
  // });

  // 模拟数据
  const list = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
  // 异步获取同步执行
  const promise = new Promise(function (resolve, reject) {
    resolve({
      list
    });
  });
  // 等待所有同步操作执行完毕后执行
  promise.then(data => {
    dispatch({
      type: GET_DATA_SUCCESS,
      list: data.list
    });
  });

  // // 用定时器的方式
  // setTimeout(() => {
  //   dispatch({
  //     type: GET_DATA_SUCCESS,
  //     list: ['0', '1', '2', '3', '4', '5', '6', '7', '8']
  //   });
  // }, 1000);

  // 你想要的异步 ↓↓↓
  // fetch('http://www.xxx.com', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   body: 'account=1&goodsId=1'
  // })
  //   .then(res => res.json())
  //   .then(data => {
  //     dispatch({
  //       type: GET_DATA_SUCCESS,
  //       list: ['0', '1', '2', '3', '4', '5', '6', '7', '8']
  //     });
  //     console.log(data);
  //   });
  // 你想要的异步 ↑↑↑
};

export default ListActionCreater;