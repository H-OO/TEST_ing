/**
 * count派发器
 */
const count = (state = 0, action) => {
  switch(action.type) {
    case '__COUNT__':
      const value = action.value;
      return value;
    default:
      return state;
  }
};

export default count;