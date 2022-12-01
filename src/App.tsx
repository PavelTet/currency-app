import React, {useMemo, useState} from 'react';
import styled from 'styled-components';
import {useExchange} from "./data/hooks/useExchange";
import {LoadingContainer} from "./components/loading/LoadingContainer";
import {Loading} from "./components/loading/Loading";
import LoadingIcon from './assets/icons/loading.svg';
import Table from 'rc-table'
import {ColumnsType} from 'rc-table/es/interface'
import {ExchangeRate} from "./data/api/api";
import {theme} from "./theme";
import Button from "./components/forms/Button/Button";
import {TextInput} from "./components/forms/TextInput/TextInput";
import {Formik} from "formik";
import {SelectInput} from './components/forms/SelectInput/SelectInput';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.size.spacing[5]};
  margin-top: ${props => props.theme.size.spacing[5]};
`

const Img = styled.img`
  width: 10em;
`;

function App() {
    const {useExchangeRate} = useExchange();

    const {isLoading, isSuccess, data} = useExchangeRate();

    const [value, setValue] = useState('0');
    if (isSuccess) {
        console.log('data', data);
    }

    const columns = useMemo<ColumnsType<ExchangeRate>>(
        () => [
            {
                title: data?.columns[0],
                dataIndex: 'country',
                key: 'country',
            },
            {
                title: data?.columns[1],
                dataIndex: 'currency',
                key: 'currency',
            },
            {
                title: data?.columns[2],
                dataIndex: 'amount',
                key: 'amount',
            },
            {
                title: data?.columns[3],
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: data?.columns[4],
                dataIndex: 'rate',
                key: 'rate',
            }
        ],
        [data]
    );

    const tableData = useMemo(
        () => data?.rates.map(row => {
            return {
                country: row.country,
                currency: row.currency,
                amount: row.amount,
                code: row.code,
                rate: row.rate,
            }
        }),
        [data]
    )

    const handleSubmit = () => {
        console.log('enter');
    }

    console.log('tableData', tableData);
    return (
        <>
            {isLoading && <LoadingContainer>
                <Loading text='Loading...'>
                    <Img src={LoadingIcon} alt={'logo'}/>
                </Loading>
            </LoadingContainer>}
            {isSuccess && <><Title>Hello Czech Bank</Title>
                <Grid>
                    <Grid>
                        <Table
                            rowKey={'title'}
                            columns={columns}
                            data={tableData}
                            tableLayout='auto'
                            components={theme.tableComponents}/>
                    </Grid>
                    <Grid>

                        <Formik initialValues={{email: '', password: ''}}
                                validate={values => {
                                    const errors = {};
                                    if (!values) {

                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {

                                    }
                                    return errors;
                                }}
                                onSubmit={(values, {setSubmitting}) => {
                                    setTimeout(() => {
                                        setSubmitting(false);
                                    }, 400);
                                }}>
                            <div>
                                <SelectInput name={'currency-selector'} value={value} label={'Please select currency'}>
                                    {data.rates.map(rate => rate.country).map((country, index) => (
                                        <option key={index} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </SelectInput>
                                <TextInput
                                    name={'amount-set'}
                                    type='text'
                                    value={value}
                                    label={'Amount'}
                                />
                                <Button onClick={handleSubmit}>Calculate</Button>
                            </div>
                        </Formik>
                    </Grid>
                </Grid>
            </>}
        </>
    );
}

export default App;
