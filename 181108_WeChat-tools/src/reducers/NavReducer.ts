export default (state: any = {}, action: {type?: string, mode?: boolean} = {}) => {
  const {type, mode}: {type?: string, mode?: boolean} = action;
  switch (type) {
    case 'Nav__mode':
      return {
        type,
        mode
      }
    default:
      return state;
  }
}
