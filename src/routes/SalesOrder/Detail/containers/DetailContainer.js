import { connect } from 'react-redux'
import { actions as firstActions } from '../../modules/module'

import { actions as secondActions } from '../../modules/secondModule'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Detail from '../components/Detail'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
    firstClearErr:      firstActions.clearErr,
    firstUpdateFields:  firstActions.updateFields,
    firstSave:          firstActions.save,
    firstFetchDetail:   firstActions.fetchDetail,
    secondClearErr:     secondActions.clearErr,
    secondSave:         secondActions.save,
    secondFetchList:            secondActions.fetchList,
    secondDel:                  secondActions.del,
}

const mapStateToProps = (state) => ({
    firstProps:{
        err: state.salesOrderModule.err,
        fields: state.salesOrderModule.fields,
        saveStatus: state.salesOrderModule.saveStatus,
        fetchDetailStatus: state.salesOrderModule.fetchDetailStatus,
        fieldsConfig: state.salesOrderModule.fieldsConfig,
    },
    secondProps:{
        err: state.salesOrderSecondModule.err,
        saveStatus: state.salesOrderSecondModule.saveStatus,
        list : state.salesOrderSecondModule.list,
        listStatus : state.salesOrderSecondModule.listStatus,
        deleteStatus : state.salesOrderSecondModule.deleteStatus,
    }
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
