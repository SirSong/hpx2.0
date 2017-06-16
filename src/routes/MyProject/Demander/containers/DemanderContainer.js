import { connect } from 'react-redux'
import { 
    fetchList,
} from '../modules/module'

import Demander from '../components/Demander'

const mapDispatchToProps = {
    fetchList,
}

const mapStateToProps = (state) => ({
    list: state.demanderModule.list
})

export default connect(mapStateToProps, mapDispatchToProps)(Demander)
