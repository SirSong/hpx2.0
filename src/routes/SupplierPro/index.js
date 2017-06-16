import { injectReducer } from '../../store/reducers'
import { auth } from '../../modules/route'

export default (store) => ({
  path : 'supplierPro(/:queryParams)',
  onEnter: auth.bind(this,store),
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Component = require('./containers/ComponentContainer').default
      const reducer = require('./Modules/module').default
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: "supplierProModule", reducer})
      /*  Return getComponent   */
      cb(null, Component)

    /* Webpack named bundle   */
    }, 'supplierPro')
  },
   getChildRoutes (location, cb) {
    cb(
      null, 
      routes
    )
  }
})
