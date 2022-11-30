import {useMemo} from "react";
import {useQuery} from "react-query";
import {ExchangeRateInfo, fetchExchangeRate} from "../api/api";

export const useExchange = () => {
    return useMemo(() => ({
        useExchangeRate: () => {
            return useQuery<ExchangeRateInfo>('exchangeRate', fetchExchangeRate);
        }
    }), [])

}
