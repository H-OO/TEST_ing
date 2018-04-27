const GET_DATA = 'HOME_GET_DATA';
const GET_DATA_SUCCESS = 'HOME_GET_DATA_SUCCESS';

const HomeReducer = (oldState = { text: 'NOT_GET_DATA' }, action) => {
  switch (action.type) {
    case GET_DATA:
      console.log(action);
      return {
        text: action.payload
      };
    case GET_DATA_SUCCESS:
      console.log(action);
      return {
        text: action.payload
      };
    default:
      return oldState;
  }
};
export default HomeReducer;
