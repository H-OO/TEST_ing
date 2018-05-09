const HeaderActionCreater = params => (dispatch, getState) => {
  dispatch({
    type: params.type,
    title: params.title
  })
};

export default HeaderActionCreater;