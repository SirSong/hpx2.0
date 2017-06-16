import { connect } from 'react-redux'

import Compo from '../components/component'
import { fetchComInfo ,updateComInfo} from '../modules/module'

const mapDispatchToProps = {
    fetchComInfo,
    updateComInfo
}

const mapStateToProps = (state) => ({
    isAuthEdite : state.companayInfoModule.isAuthEdite,
    comInfo : state.companayInfoModule.comInfo
})


export default connect(mapStateToProps, mapDispatchToProps)(Compo)
