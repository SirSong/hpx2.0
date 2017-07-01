import { auth } from '../../../modules/route'

export default (store) => ({
  path : 'detail(/:id)', //id component 列表数据的id
  onEnter: auth.bind(this,store),

  getComponent (nextState, cb) {
    // webpack按需加载路由
    require.ensure([], (require) => {

      const Detail = require('./containers/DetailContainer').default

      cb(null, Detail)

    }, 'detail')
  }
})
