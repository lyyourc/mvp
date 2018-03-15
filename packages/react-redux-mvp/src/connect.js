import React from 'react'

const noop = () => {}

export default function(mapStateToProps = noop, mapDispatchToProps = noop) {
  return function withConnect(WrappedComponent) {
    return class Connect extends React.Component {
      componentDidMount() {
        this.onStateChange()
        this.unsubscribe = store.subscribe(this.onStateChange)
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      componentDidUpdate() {
        this.onStateChange()
      }

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
