import { Component, Children } from 'react'
import PropTypes from 'prop-types'

export default class Provider extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  }

  static childContextTypes = {
    store: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)
  }

  getChildContext = () => {
    return {
      store: this.props.store,
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}
