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

  @media (max-width: 600px) {
    padding: 12px 12px;
    min-width: 35px;
    line-height: 0.8rem;
    font-size: 0.8rem;
  }

  @media (max-width: 450px) {
    padding: 10px 10px;
    min-width: 25px;
    line-height: 0.6rem;
    font-size: 0.6rem;
  }

  @media (max-width: 330px) {
    padding: 8px 8px;
    min-width: 15px;
    line-height: 0.4rem;
    font-size: 0.4rem;
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
