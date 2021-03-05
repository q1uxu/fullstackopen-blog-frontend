import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return { setVisible };
  });

  if (!visible) return (
    <div>
      <button onClick={() => setVisible(true)}>{props.buttonLabel}</button>
    </div>
  );

  if (visible) return (
    <div>
      {props.children}
      <button onClick={() => setVisible(false)}>取消</button>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;