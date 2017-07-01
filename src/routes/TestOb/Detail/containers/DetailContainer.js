import { connect } from 'react-redux'
import { 
    updateFields,
    save, 
    fetchDetail, 
    clearErr 
} from '../../modules/module'


import Detail from '../components/Detail'

const mapDispatchToProps = {
    clearErr,
    updateFields,
    save,
    fetchDetail,
}

const mapStateToProps = (state) => ({
    err: state.testObModule.err,
    fields: state.testObModule.fields,
    saveStatus: state.testObModule.saveStatus,
    fetchDetailStatus: state.testObModule.fetchDetailStatus,
    fieldsConfig: state.testObModule.fieldsConfig,
})


export default connect(mapStateToProps, mapDispatchToProps)(Detail)
