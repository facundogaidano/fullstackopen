import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Toggable = forwardRef(({ children, buttonLabel, cancelButtonLabel = 'Cancel' }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button data-cy='toggableButtonShow' name='showToggableButton' onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button data-cy='toggableButtonHide' name='hideToggableButton' onClick={toggleVisibility}>{cancelButtonLabel}</button>
      </div>
    </div>
  )
})

export default Toggable

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  cancelButtonLabel: PropTypes.string
}
