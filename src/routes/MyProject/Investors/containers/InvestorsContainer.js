import { connect } from 'react-redux'
import { fetchList } from '../modules/module'

import Investors from '../components/Investors'

const mapDispatchToProps = {
    fetchList,
}

const mapStateToProps = (state) => ({
    list: state.investorsModule.list,
})


export default connect(mapStateToProps, mapDispatchToProps)(Investors)
