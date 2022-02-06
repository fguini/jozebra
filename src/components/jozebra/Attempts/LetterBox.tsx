import React from 'react';
import styled, { css } from 'styled-components';
import { common } from '@mui/material/colors';
import {
    Animations,
    LetterStatus,
    STATUS_COLOR,
    TryAnimation,
} from '../utils';

interface BoxProps {
    color?: string;
    tryAnimation: TryAnimation;
}

const Box = styled.div<BoxProps>`
  ${({ color }: BoxProps) => css`
    border: 2px solid ${ color || STATUS_COLOR[LetterStatus.NotAttempted] };
    ${ color ? `background-color: ${ color };` : '' }
  `}
  
  margin: 3px 2px;
  padding: 15px 10px;
  min-height: 50px;
  min-width: 50px;
  
  color: ${ ({ color }: BoxProps) => color ? common.white : common.black };
  text-align: center;
  line-height: 1rem;
  font-size: 1.6rem;
  font-weight: 800;
  text-transform: capitalize;
  
  ${({ tryAnimation }: BoxProps) => {
      if(!tryAnimation) return;

      const { count, name, time } = Animations[tryAnimation];
      return css`animation: ${ name } ${ time }ms ${ count || '' }`;
  }}
`;

interface LetterBoxProps {
    letter?: string;
    status?: LetterStatus;
    tryAnimation: TryAnimation;
}

export function LetterBox({ letter, status, tryAnimation }: LetterBoxProps) {
    return (<Box color={ status && STATUS_COLOR[status] } tryAnimation={ tryAnimation }>
        { letter }
    </Box>);
}