import { Component, Children } from 'react'
import PropTypes from 'prop-types'

export default class Provider extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  }

  constructor(props, context) {
    super(props, context)
  }

  getChildContext = () => {
    return {
      store: this.store,
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}
