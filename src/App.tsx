import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useQuery} from "react-query";
import {useExchange} from "./data/hooks/useExchange";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

function App() {
    const {useExchangeRate} = useExchange();

    const {status, isLoading, isSuccess, data} = useExchangeRate();

    if (isSuccess) {
        console.log('data', data);
    }

    return (
        <>
            <Title>Hello Czech Bank</Title>
        </>
    );
}

export default App;
