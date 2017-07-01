import { injectReducer } from '../../store/reducers'
import { auth } from '../../modules/route'

export default (store) => ({

  path : 'test2',
  onEnter: auth.bind(this,store),

  getComponent (nextState, cb) {

    require.ensure([], (require) => {

      const Component = require('./containers/ComponentContainer').default
      const reducer = require('./modules/module').default

      injectReducer(store, { key: 'test2Module', reducer })

      cb(null, Component)

    }, 'test2')
  },
  getChildRoutes (location, cb) {

    const routes = [ require('./Detail').default(store),];
    cb(null, routes)
    
  }
})
