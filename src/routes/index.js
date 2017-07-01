// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import { auth ,authIndex } from '../modules/route'
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout(store),
  onEnter: auth.bind(this,store),
  indexRoute  : {
    component : Home(store),
    // onEnter : authIndex.bind(this,store)
},
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      const routes = [
        require('./Company').default(store),       
        require('./Payment').default(store),	       
        require('./Address').default(store),	      
        require('./UserManager').default(store),			       
        require('./GoodsMaintenance').default(store),	       
        require('./InterestRate').default(store),				
        require('./SalesOrder').default(store),         
        require('./AfterSale').default(store),
        require('./TestOb').default(store),
        require('./TestObSecond').default(store),	
        require('./MyProject').default(store),
        require('./Demander').default(store), 
        require('./MyOrder').default(store),      
        require('./companyInformation').default(store),
        require('./SupplierContract').default(store),
        require('./PurchaseContract').default(store),
        require('./DemanderContract').default(store),
        require('./SalesContract').default(store),
        require('./FinancialManagement').default(store),
        require('./test2').default(store),
      ];
      cb(
        null, 
        routes
      )
    })
  }
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
