import { connect } from 'react-redux'
import { fetchList } from '../modules/module'

import Supplier from '../components/Supplier'

const mapDispatchToProps = {
    fetchList,
}

const mapStateToProps = (state) => ({
    list: state.supplierModule.list
})

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)
