const exchangeUrl = '/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

export interface ExchangeRate {
    country: string;
    currency: string;
    amount: number;
    code: string;
    rate: number;
}

export interface ExchangeRateInfo {
    info: string;
    columns: string[];
    rates: ExchangeRate[];
}

const CSVToArray = (data: string, delimiter = '|', omitFirstRow = false) =>
    data
        .slice(0, -1)
        .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
        .split('\n')
        .map(v => v.split(delimiter));

const getInfo = (responseArray: string[][]) => {
    const date = responseArray[0][0].split('#');
    const releaseNumber = responseArray[0][0].split('#')[1];
    return `Last update: ${date}, Release number: ${releaseNumber}`
}

const getExchangeRates = (responseArray: string[][]): ExchangeRate[] => {
    return responseArray.slice(2).map(line => {
        return {country: line[0], currency: line[1], amount: +line[2], code: line[3], rate: +line[4]} as ExchangeRate;
    })
}

const getColumnsNames = (responseArray: string[][]) => {
    return responseArray.slice(1, 2)[0];
}

/*const serializeExchange = (response: string) => {
    const responseArray = CSVToArray(response);
    const res: Record<string, ExchangeRate> = {};
    responseArray.slice(3).forEach((row, index) => {
        res[row[0]] = {
            country: row[0],
            currency: row[1],
            amount: +row[2],
            code: row[3],
            rate: +row[4]
        } as ExchangeRate
    })
}*/

const serializeExchangeRate = (response: string): ExchangeRateInfo => {
    console.log('text', CSVToArray(response));
    const responseArray = CSVToArray(response);
    console.log('a', responseArray);
    return {
        info: getInfo(responseArray),
        rates: getExchangeRates(responseArray),
        columns: getColumnsNames(responseArray)
    };
}

const api = <T>(url: string) => {
    return fetch(url);
}

export const fetchExchangeRate = () => {
    return api<any>(`${exchangeUrl}`).then(response => response.text().then(serializeExchangeRate));
}


