import { connect } from 'react-redux'
// import { } from '../../modules/module'

import Detail from '../components/Detail'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  id : state.login.userInfo.id //这里获取 用户 Id 请求数据是可能用到 
})


export default connect(mapStateToProps, mapDispatchToProps)(Detail)
