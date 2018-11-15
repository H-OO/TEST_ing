/**
 * ControlReducer
 */
interface I_action {
  type?: string;
  device?: string;
}

export default (
  defaultAction: I_action = {},
  newAction: I_action = {}
) => {
  const { type, device }: I_action = newAction;
  switch(type) {
    case 'Control_device':
      return {
        type,
        device
      }
    default:
      return defaultAction;
  }
};
