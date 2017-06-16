import { injectReducer } from '../../store/reducers'
import { auth } from '../../modules/route'

export default (store) => ({
  path : 'investors(/:queryParams)',
  onEnter: auth.bind(this,store),
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Investors = require('./containers/InvestorsContainer').default
      const reducer = require('./modules/module').default
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'investorsModule', reducer })
      /*  Return getComponent   */
      cb(null, Investors)

    /* Webpack named bundle   */
    }, 'investors')
  }
})
