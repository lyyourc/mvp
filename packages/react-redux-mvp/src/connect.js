import React from 'react'
import PropTypes from 'prop-types'

const noop = () => {}

export default function(mapStateToProps = noop, mapDispatchToProps = noop) {
  return function withConnect(WrappedComponent) {
    return class Connect extends React.Component {
      static contextTypes = {
        store: PropTypes.object.isRequired,
      }

      constructor(props, context) {
        super(props, context)
      }

      componentWillMount() {
        const { store } = this.context

        this.onStateChange()
        this.unsubscribe = store.subscribe(this.onStateChange)
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      // componentDidUpdate() {
      //   this.onStateChange()
      // }

      onStateChange = () => {
        const { store } = this.context
        const stateProps = mapStateToProps(store.getState())
        const dispatchProps = mapDispatchToProps(store.dispatch)

        this.setState({
          ...stateProps,
          ...dispatchProps,
        })
      }
      
      render() {
        return (
          <WrappedComponent {...this.props} {...this.state} />
        )
      }
    }
  }
}
