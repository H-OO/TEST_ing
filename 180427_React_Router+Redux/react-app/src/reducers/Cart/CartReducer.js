const CartReducer = (state = {
  contentShow: false,
  contentActive: 'cart_content',
  btnActive: 'cart_btn'
}, action) => {
  switch (action.type) {
    case 'CONTENT_SHOW':
      return {
        contentShow: action.contentShow
      }
    case 'ACTIVE':
      return {
        contentActive: action.contentActive,
        btnActive: action.btnActive
      }
    default:
      return state;
  }
};

export default CartReducer;