import React, { useState, useImperativeHandle } from 'react'

const Toggable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => {
    return { setVisible }
  })

  if (!visible) return (
    <div>
      <button onClick={e => setVisible(true)}>{props.buttonLabel}</button>
    </div>
  )

  if (visible) return (
    <div>
      {props.children}
      <button onClick={e => setVisible(false)}>cancel</button>
    </div>
  )
})

export default Toggable