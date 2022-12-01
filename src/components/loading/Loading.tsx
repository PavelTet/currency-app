import React, {ReactElement} from 'react'
import styled, {keyframes} from 'styled-components'

type Props = {
    text: string;
    children: ReactElement;
};

export const Loading = ({
                            text,
                            children
                        }: Props) => (
    <Wrapper>
        <Loader>{children}</Loader>
        <p>{text}</p>
    </Wrapper>
)

const Spin = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(20deg);
  }
  50% {
    -webkit-transform: rotate(10deg);
  }
  75% {
    -webkit-transform: rotate(-10deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
  }
`

const Wrapper = styled.div`
  margin: 3em 0 2em;

  p {
    margin-top: 1em;
    text-align: center;
    font-weight: bold;
    font-size: 19px;
  }
`

const Loader = styled.div`
  text-align: center;
  -webkit-animation: ${Spin} 0.7s linear 0s infinite normal none running;
`
