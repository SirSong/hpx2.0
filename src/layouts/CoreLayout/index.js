import { injectReducer } from '../../store/reducers'

export default (store) => {
  const CoreLayout = require('./containers/CoreLayoutContainer').default
  const loginReducer = require('../../modules/login').default
  const routeReducer = require('../../modules/route').default

  injectReducer(store, { key: 'login', reducer: loginReducer })
  injectReducer(store, { key: 'route', reducer: routeReducer })


  return CoreLayout
}