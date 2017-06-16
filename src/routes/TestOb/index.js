import { injectReducer } from '../../store/reducers'
import { auth } from '../../modules/route'

export default (store) => ({
  //queryParams:用于保存页面的部分状态，如第几页，查询条件，方便刷新页面的时候页面不会回到初始状态
  path : 'testOb(/:queryParams)',
  onEnter: auth.bind(this,store),
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Component = require('./containers/ComponentContainer').default
      const reducer1 = require('./modules/module').default
      const reducer2 = require('../../modules/route').default
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'testObModule', reducer : reducer1 })
      injectReducer(store, { key: 'route', reducer : reducer2 })
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
