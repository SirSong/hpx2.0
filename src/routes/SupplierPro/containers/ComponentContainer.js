import { connect } from 'react-redux'
import { fetchList } from '../modules/module'
import { fetchMenu } from '../../../modules/route'

import Comp from '../components/Component'

const mapDispatchToProps = {
    fetchList,
    fetchMenu, 
}

const mapStateToProps = (state) => ({
    list: state.supplierProModule.list
})

export default connect(mapStateToProps, mapDispatchToProps)(Comp)
