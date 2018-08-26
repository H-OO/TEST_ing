/**
 * @param params isObj 接收到的信息对象（初始化对象由reducer函数提供）
 * @param dispatch isFunc 在组件调用该方法时传入 store.dispatch
 * @param getState isFunc 在组件调用该方法时传入 store.getState
 */
const TestActionCreater = params => (dispatch, getState) => {
  dispatch(params); // 发送action
};
export default TestActionCreater;