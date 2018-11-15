/**
 * ModeReducer
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
    case 'Mode_mode':
      return {
        type,
        mode
      };
    default:
      return defaultAction;
  }
};