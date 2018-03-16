import React from 'react'
import PropTypes from 'prop-types'

export default class Counter extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    handleIncreaseBtnClick: PropTypes.func.isRequired,
    handleDecreaseBtnClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { count, handleIncreaseBtnClick, handleDecreaseBtnClick } = this.props

    return (
      <div>
        <div>{count}</div>
        <button onClick={handleIncreaseBtnClick}>+</button>
        <button onClick={handleDecreaseBtnClick}>-</button>
      </div>
    )
  }
}

Counter.contextTypes = {
  store: PropTypes.object.isRequired,
}
