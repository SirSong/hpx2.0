import { connect } from 'react-redux'
import { 
    fetchList,
} from '../modules/module'

import Compo from '../components/Component'

import { fetchDemanderMenu } from '../../../modules/route'

const mapDispatchToProps = {
    fetchList,
    fetchDemanderMenu
}

const mapStateToProps = (state) => ({
    list: state.demanderProModule.list
})

export default connect(mapStateToProps, mapDispatchToProps)(Compo)
