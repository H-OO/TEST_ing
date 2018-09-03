export default {
  state: {
    content: 'placeholder'
  },
  actions: {
    test (store, params) {
      // 同步
      store.commit({
        type: 'test',
        payload: params.payload
      })
      return new Promise((resolve, reject) => {
        // 异步
        setTimeout(() => {
          store.commit({
            type: 'test',
            payload: 'async'
          })
          resolve()
        }, 0)
      })
    }
  },
  mutations: {
    test (state, params) {
      state.content = params.payload
    }
  }
}
