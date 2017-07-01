import { connect } from 'react-redux'
import { 
  fetchList, 
} from '../modules/module'

import Compo from '../components/Component'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  id : state.login.userInfo.id //这里获取 用户 Id 请求数据是可能用到 
})


export default connect(mapStateToProps, mapDispatchToProps)(Compo)
