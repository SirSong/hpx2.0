import { injectReducer } from '../../store/reducers'
import { auth } from '../../modules/route'

export default (store) => ({
  path : 'testOb(/:queryParams)',
  onEnter: auth.bind(this,store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Component = require('./containers/ComponentContainer').default
      const reducer = require('./modules/module').default
      injectReducer(store, { key: 'testObModule', reducer : reducer })
      /*  Return getComponent   */
      cb(null, Component)

    /* Webpack named bundle   */
    }, 'testOb')
  },
  getChildRoutes (location, cb) {
    const routes = [
      require('./Detail').default(store),					
    ];
    cb(
      null, 
      routes
    )
  }
})
