import styled from 'styled-components';

interface FireworkProp {
    topHeight: number;
    basePosition: number;
}

export const Firework = styled.div<FireworkProp>`
    position: absolute;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    bottom: 0;
    ${({ basePosition }: FireworkProp) => `left: ${ basePosition }%;`}
    animation: firework 2000ms ease-out;

  @keyframes firework {
    2.5% {
      box-shadow: 0 10px 5px #00ff84;
    }
    5% {
      box-shadow: 0 10px 5px #002bff,
      0 25px 5px #ff009d;
    }
    7.5% {
      box-shadow: 0 10px 5px #ffb302,
      0 25px 5px #ff006e,
      0 40px 5px #ff4000;
    }
    10% {
      box-shadow: 0 10px 5px #ff00d0,
      0 25px 5px #00f6ff,
      0 40px 5px #99ff00,
      0 55px 5px #a6ff00;
    }
    12.5% {
      box-shadow: 0 10px 5px #0d00ff,
      0 25px 5px #005eff,
      0 40px 5px #ff00a6,
      0 55px 5px #ff004c,
      0 70px 5px #ff6600;
    }
    15% {
      box-shadow: 0 10px 5px #ff0066,
      0 25px 5px #00ffa2,
      0 40px 5px #b700ff,
      0 55px 5px #9000ff,
      0 70px 5px #00bbff,
      0 85px 5px #ff002f;
    }
    17.5% {
      box-shadow: 0 10px 5px #ff0066,
      0 25px 5px #00ffa2,
      0 40px 5px #b700ff,
      0 55px 5px #9000ff,
      0 70px 5px #00bbff;
    }
    20% {
      box-shadow: 0 10px 5px #ff0066,
      0 25px 5px #00ffa2,
      0 40px 5px #b700ff,
      0 55px 5px #9000ff;
    }
    22.5% {
      box-shadow: 0 10px 5px #ff0066,
      0 25px 5px #00ffa2,
      0 40px 5px #b700ff;
    }
    25% {
      box-shadow: 0 10px 5px #ff0066,
      0 25px 5px #00ffa2;
    }
    27.5%, 45% {
      box-shadow: 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white;
    }
    45%, 90% {
        ${({ topHeight }: FireworkProp) => `bottom: ${ topHeight }%`}
    }
    60% {
      opacity: 1;
    }
    0%, 80% {
      transform: none;
    }
    90%, 100% {
      opacity: 0;
    }
    100% {
      box-shadow: -120px -218px blue, 248px -16px #00ff84, 190px 16px #002bff, -113px -308px #ff009d,
        -109px -287px #ffb300, -50px -313px #ff006e, 226px -31px #ff4000, 180px -351px #ff00d0, -12px -338px #00f6ff,
        220px -388px #99ff00, -69px -27px #ff0400, -111px -339px #6200ff, 155px -237px #00ddff, -152px -380px #00ffd0,
        -50px -37px #00ffdd, -95px -175px #a6ff00, -88px 10px #0d00ff, 112px -309px #005eff, 69px -415px #ff00a6,
        168px -100px #ff004c, -244px 24px #ff6600, 97px -325px #ff0066, -211px -182px #00ffa2, 236px -126px #b700ff,
        140px -196px #9000ff, 125px -175px #00bbff, 118px -381px #ff002f, 144px -111px #ffae00, 36px -78px #f600ff,
        -63px -196px #c800ff, -218px -227px #d4ff00, -134px -377px #ea00ff, -36px -412px #ff00d4, 209px -106px #00fff2,
        91px -278px #000dff, -22px -191px #9dff00, 139px -392px #a6ff00, 56px -2px #0099ff, -156px -276px #ea00ff,
        -163px -233px #00fffb, -238px -346px #00ff73, 62px -363px #0088ff, 244px -170px #0062ff, 224px -142px #b300ff,
        141px -208px #9000ff, 211px -285px #ff6600, 181px -128px #1e00ff, 90px -123px #c800ff, 189px 70px #00ffc8,
        -18px -383px #00ff33, 100px -6px #ff008c;
    }

    to {
      transform: translateY(100px);
    }
  }
`;