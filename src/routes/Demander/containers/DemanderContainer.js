import { connect } from 'react-redux'
import { 
    fetchList,
} from '../modules/module'

import Demander from '../components/Demander'

import { fetchDemanderMenu } from '../../../modules/route'

const mapDispatchToProps = {
    fetchList,
    fetchDemanderMenu
}

const mapStateToProps = (state) => ({
    list: state.demanderModule.list
})

export default connect(mapStateToProps, mapDispatchToProps)(Demander)
