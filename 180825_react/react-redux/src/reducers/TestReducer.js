/**
 * 注意：所有 reducer 需要合并后使用
 * 在触发 store.dispatch 方法时，自动调用 reducer 方法，返回新的 state
 * @param state 当前时刻状态仓库的快照 （默认值作为初始化对象）
 * @param action 信息对象 dispatch 方法推送过来
 */
const TestReducer = (state = {
  payload: ''
}, action) => {
  switch (action.type) {
    // 初始化
    case 'init':
      return {
        payload: action.payload
      }
    case 'change':
      return {
        payload: action.payload
      }
    // ...
    default:
      return state
  }
};
export default TestReducer;