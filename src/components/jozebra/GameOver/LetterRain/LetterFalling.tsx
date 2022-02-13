import styled from 'styled-components';

interface LetterFallingProps {
    basePosition: number;
    time: number;
}

export const LetterFalling = styled.span.attrs<LetterFallingProps>(
    ({ basePosition, time }: LetterFallingProps) => ({
        style: {
            animation: `go-down linear ${ time }ms`,
            left: `${ basePosition }%`,
        },
    }))<LetterFallingProps>`
  position: absolute;
  top: -15%;

  font-family: 'Trebuchet MS', sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  text-transform: capitalize;
  
  @media(max-width: 450px) {
      font-size: 1.2rem;
  }

  @keyframes go-down {
    from {
      top: -15%;
    }

    to {
      top: 200%;
    }

    10% {
      color: #99ff00;
      text-shadow: 0 -40px 1px #00ff84, 0 -80px 2px #002bff, 0 -120px 3px #ff009d, 0 -160px 4px #ffb300,
        0 -200px 5px #ff006e, 0 -240px 6px #ff4000, 0 -280px 7px #ff00d0;
    }

    20% {
      color: #205ef3;
      text-shadow: 0 -40px 1px #00f6ff, 0 -80px 2px #99ff00, 0 -120px 3px #ff0400, 0 -160px 4px #6200ff,
        0 -200px 5px #00ddff, 0 -240px 6px #00ffd0, 0 -280px 7px #00ffdd;
    }

    30% {
      color: #ffb300;
      text-shadow: 0 -40px 1px #a6ff00, 0 -80px 2px #0d00ff, 0 -120px 3px #005eff, 0 -160px 4px #ff00a6,
        0 -200px 5px #ff004c, 0 -240px 6px #ff6600, 0 -280px 7px #ff0066;
    }

    40% {
      color: #00ffdd;
      text-shadow: 0 -40px 1px #00ffa2, 0 -80px 2px #b700ff, 0 -120px 3px #9000ff, 0 -160px 4px #00bbff,
        0 -200px 5px #ff002f, 0 -240px 6px #ffae00, 0 -280px 7px #f600ff;
    }

    50% {
      color: #ff004c;
      text-shadow: 0 -40px 1px #c800ff, 0 -80px 2px #d4ff00, 0 -120px 3px #ea00ff, 0 -160px 4px #ff00d4,
        0 -200px 5px #00fff2, 0 -240px 6px #000dff, 0 -280px 7px #9dff00;
    }

    60% {
      color: #9000ff;
      text-shadow: 0 -40px 1px #a6ff00, 0 -80px 2px #0099ff, 0 -120px 3px #ea00ff, 0 -160px 4px #00fffb,
        0 -200px 5px #00ff73, 0 -240px 6px #0088ff, 0 -280px 7px #0062ff;
    }

    70% {
      color: #c800ff;
      text-shadow: 0 -40px 1px #b300ff, 0 -80px 2px #9000ff, 0 -120px 3px #ff6600, 0 -160px 4px #1e00ff,
        0 -200px 5px #c800ff, 0 -240px 6px #00ffc8, 0 -280px 7px #00ff33;
    }

    80% {
      color: #000dff;
      text-shadow: 0 -40px 1px #ff008c, 0 -80px 2px #00ff84, 0 -120px 3px #002bff, 0 -160px 4px #ff009d,
        0 -200px 5px #ffb300, 0 -240px 6px #ff006e, 0 -280px 7px #ff4000;
    }

    90% {
      color: #00fffb;
      text-shadow: 0 -40px 1px #ff00d0, 0 -80px 2px #00f6ff, 0 -120px 3px #99ff00, 0 -160px 4px #ff0400,
        0 -200px 5px #6200ff, 0 -240px 6px #00ddff, 0 -280px 7px #00ffd0;
    }

    100% {
      color: #9000ff;
      text-shadow: 0 -40px 1px #00ffdd, 0 -80px 2px #a6ff00, 0 -120px 3px #0d00ff, 0 -160px 4px #005eff,
        0 -200px 5px #ff00a6, 0 -240px 6px #ff004c, 0 -280px 7px #ff6600;
    }
  }
`;