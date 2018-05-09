const GET_DATA = 'GET_LIST';
const GET_DATA_SUCCESS = 'GET_LIST_SUCCESS';

const ListReducer = (state = {
  list: [],
  animationScope: [0, 0]
}, action) => {
  switch (action.type) {
    case GET_DATA:
      return state;
    case GET_DATA_SUCCESS:
      return {
        list: action.list,
        animationScope: [0, action.list.length] // 第一次异步获取数据列表时
      };
    case 'ADD_ITEM':
      const newList_test = action.list.map((item) => {
        return item
      });
      
      // 追加项
      newList_test.push('x');
      newList_test.push('x');
      newList_test.push('x');
      
      const animationScope = state.animationScope.map(item => {
        return item;
      });
      animationScope.shift();
      animationScope.push(newList_test.length);

     return {
       list: newList_test,
       animationScope
     };
    default:
      return state;
  }
};

export default ListReducer;