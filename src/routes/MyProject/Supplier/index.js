import { injectReducer } from '../../../store/reducers'
import { auth } from '../../../modules/route'

export default (store) => ({
  path : 'supplier(/:id)',
  onEnter: auth.bind(this,store),
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Supplier = require('./containers/SupplierContainer').default
      const reducer = require('./Modules/module').default
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: "supplierModule", reducer})
      /*  Return getComponent   */
      cb(null, Supplier)

    /* Webpack named bundle   */
    }, 'supplier')
  }
})
