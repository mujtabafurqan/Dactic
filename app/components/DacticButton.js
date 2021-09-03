/**
 *
 * Button.js
 *
 * A common button for dactic buttons
 * */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import styled from 'styled-components';
const StyledButton = styled(Button)`
  &&& {
    background-color: #5222d0;
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

function DacticButton(props) {
  // Render an anchor tag

  return (
    <StyledButton {...props} type="primary" size="large">
      {props.children}
    </StyledButton>
  );
}

DacticButton.propTypes = {
  handleRoute: PropTypes.func,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default DacticButton;
