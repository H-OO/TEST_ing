const GET_DATA = 'GET_LIST';
const GET_DATA_SUCCESS = 'GET_LIST_SUCCESS';

const ListReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DATA:
      return state;
    case GET_DATA_SUCCESS:
      const newList_success = action.list;
      return newList_success;
    case 'ADD_ITEM':
      const newList_test = action.list.map((item) => {
        return item
      });
      newList_test.push('x');
      newList_test.push('x');
      newList_test.push('x');
      newList_test.push('x');
      newList_test.push('x');
      newList_test.push('x');
      newList_test.push('x');
      newList_test.push('x');
     return newList_test;
    default:
      return state;
  }
};

export default ListReducer;