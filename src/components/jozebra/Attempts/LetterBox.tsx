import React from 'react';
import styled, { css } from 'styled-components';
import { common } from '@mui/material/colors';
import { LetterStatus, STATUS_COLOR } from '../utils';

interface BoxProps {
    color?: string;
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
`;

interface LetterBoxProps {
    letter?: string;
    status?: LetterStatus;
}

export function LetterBox({ letter, status }: LetterBoxProps) {
    return (<Box color={ status && STATUS_COLOR[status] }>
        { letter }
    </Box>);
}