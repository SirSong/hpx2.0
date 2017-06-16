
import { injectReducer } from '../../store/reducers'

export default (store) => {
  const Home = require('./containers/HomeContainer').default
  const HomeReducer = require('./modules/module').default

  injectReducer(store, { key: 'Home', reducer: HomeReducer })

  return Home
}
