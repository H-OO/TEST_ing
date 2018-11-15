/**
 * actionCreater 格式参考
 * --------------------
 * 传参写法
 * @param params 外部传递进来的参数
 * @param dispatch 派发方法
 * @param getState 获取全局仓库状态
 * 由 store 提供 `dispatch` 与 `getState` 两个方法
 * --------------------
 */
interface I_params {
  type?: string;
  test?: string;
}

export default (params: I_params = {}) => (
  dispatch: (params: I_params) => void,
  getState: () => void
) => {
  dispatch(params); // 调用时使用外部传递进来的参数进行派发，转交给 Reducer
};
