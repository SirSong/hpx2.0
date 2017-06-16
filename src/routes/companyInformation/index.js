import { injectReducer } from '../../store/reducers'
import {auth } from '../../modules/route'
const companyInformation  = (store) => ({
    path : 'company-information(/:enterpriseId)',
    onEnter : auth.bind(this,store),
    getComponent ( nextState, cb ){  
        require.ensure([],(require)=>{
          const component = require('./container/componentContainer').default;
          const reducer = require('./modules/module').default;
          injectReducer(store, { key: 'companayInfoModule', reducer : reducer });
          cb(null,component);
        },'company-information')
    }

})
export default companyInformation