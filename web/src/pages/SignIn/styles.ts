import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import SignInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh; /* 100% do view-port heigh*/

  display: flex;
  align-items: stretch; /* Todos os itens dentro do container tenham 100vh. */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    /* ">" indica estilização apenas de a's diretamente abaixo da ancora(Content), e não mais um nível para dentro. */
    color: #e2cf78;
    display: flex;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#e2cf78')};
    }
  }
`;

export const Background = styled.div`
  flex: 1; /* Ocupa todo o espaço, menos a div Content.*/
  background: url(${SignInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
