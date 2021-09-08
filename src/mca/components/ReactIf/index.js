import React from 'react';

const ReactIf = (props) => {
  const {
    chilldren,
    valid
  } = props;

  if (valid) {
    return (<> {chilldren}</>)
  }

  return null;
}

export default ReactIf;
