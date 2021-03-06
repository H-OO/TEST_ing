/**
 * TestReducer 格式参考
 * -------------------
 * 最终目的是通过`switch-case`进行state的更新
 * @param defaultAction 默认值 Action
 * @param newAction 新获取到的 Action
 * -------------------
 */
interface I_action {
  type?: string;
  mode?: string;
}

export default (
  defaultAction: I_action = {},
  newAction: I_action = {}
) => {
  const { type, mode }: I_action = newAction;
  switch (type) {
    case 'test':
      return {
        type,
        mode
      };
    default:
      return defaultAction;
  }
};
