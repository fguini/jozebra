import React from 'react';
import { common } from '@mui/material/colors';
import { LetterStatus, STATUS_COLOR } from '../utils';
import styled from 'styled-components';

interface BoxProps {
    color?: string;
}

const Box = styled.button<BoxProps>`
  ${ ({ color }: BoxProps) => `background-color: ${ color || STATUS_COLOR.NotAttempted };` }
  margin: 3px 3px;
  padding: 16px 16px;
  border: none;
  border-radius: 1px;
  min-width: 50px;

  color: ${ common.white };
  text-align: center;
  line-height: 1rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: capitalize;
  
  &:active, &.active {
      background-color: ${ STATUS_COLOR[LetterStatus.NotThere] };
  }
`;

interface KeyBoxProps {
    children?: React.ReactNode;
    handleClick: (letter: string) => void;
    letter: string;
    status?: LetterStatus;
}

export function KeyBox({ children, handleClick, letter, status }: KeyBoxProps) {
    return (
        <Box
            id={ `key-${ letter.toLowerCase() }` }
            color={ status && STATUS_COLOR[status] }
            onClick={ () => handleClick(letter) }>
            { children || letter }
        </Box>
    );
}
