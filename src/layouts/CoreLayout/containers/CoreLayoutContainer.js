import { connect } from 'react-redux'

import { logOut, signIn, clearSignInErr} from '../../../modules/login'
// import { updateSelectedKey } from '../../../modules/route'
import { xxMenu } from '../../../modules/route'
import { fetchMenu } from '../../../modules/route'
import CoreLayout from '../components/CoreLayout'

const mapActionCreators = {
  logOut,
  signIn,
  clearSignInErr,
  xxMenu,
  fetchMenu,
  // updateSelectedKey,
}

const mapStateToProps = (state) => ({
  login: state.login,
  menu: state.route.menu
})

export default connect(mapStateToProps, mapActionCreators)(CoreLayout)