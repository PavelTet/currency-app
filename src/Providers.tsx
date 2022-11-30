import React, {FC} from "react";
import {GlobalStyle, theme} from "./theme";
import {ThemeProvider} from "styled-components";
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

type ProvidersProps = {
    children: React.ReactElement;
}

const queryClient = new QueryClient();

export const Providers: React.FC<ProvidersProps> = ({children}) => {
    return (
        <>
            <GlobalStyle/>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </ThemeProvider>
        </>);
}
