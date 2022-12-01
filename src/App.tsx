import React, {useMemo, useState} from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import {ColumnsType} from 'rc-table/es/interface';
import Table from 'rc-table';
import {Form, Formik} from "formik";
import {useExchange} from "./data/hooks/useExchange";
import {LoadingContainer} from "./components/loading/LoadingContainer";
import {Loading} from "./components/loading/Loading";
import LoadingIcon from './assets/icons/loading.svg';
import {ExchangeRate} from "./data/api/api";
import {theme} from "./theme";
import Button from "./components/forms/Button/Button";
import {TextInput} from "./components/forms/TextInput/TextInput";
import {SelectInput} from './components/forms/SelectInput/SelectInput';


const HeaderText = styled.h1`
  color: ${props => props.theme.color.red};
  text-align: center;
`;

const Img = styled.img`
  width: 10em;
`;

const TableWrapper = styled.div`
  .rc-table-content {
    height: 500px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  flex-basis: 40%;
  padding: 0 1rem;
`;

const FormWrapper = styled.div`
  flex-basis: 20%;
  padding: 1rem 1rem;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const Sum = styled.label`
  font-size: 2rem;
  color: ${props => props.theme.color.red};
`;

function App() {

    const {useExchangeRate} = useExchange();

    const {isLoading, isSuccess, data} = useExchangeRate();

    const [sum, setSum] = useState('');

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

    const handleSubmit = async (values: { country: string, amount: number }) => {
        try {
            if (data) {
                const rate = data.rates.find(item => item.country === values?.country)?.rate || 0;
                let result = (rate * values.amount).toFixed(2);
                setSum(result);
            }
        } catch (e) {
            console.error(e)
        }
    }

    const formValidationSchema = Yup.object().shape({
        country: Yup.string().required('Required'),
        amount: Yup.number().min(1, 'Amount must be greater than or equal to 1').required(),
    });

    return (
        <>
            {isLoading && <LoadingContainer>
                <Loading text='Loading...'>
                    <Img src={LoadingIcon} alt={'logo'}/>
                </Loading>
            </LoadingContainer>}
            {isSuccess && <>
                <HeaderText>{data.info}</HeaderText>
                <Flex>
                    <FormWrapper>
                        <Formik initialValues={{country: 'Australia', amount: 1}}
                                validationSchema={formValidationSchema}
                                onSubmit={handleSubmit}>
                            <Form>
                                <SelectInput name={'country'} label={'Please select currency'}>
                                    {data.rates.map(rate => ({
                                        country: rate.country,
                                        currency: rate.currency,
                                        code: rate.code
                                    })).map((item, index) => (
                                        <option key={index} value={item.country}>
                                            {item.country} {item.currency} ({item.code})
                                        </option>
                                    ))}
                                </SelectInput>
                                <TextInput
                                    name={'amount'}
                                    type='text'
                                    label={'Amount'}
                                />
                                <Button type="submit">Calculate</Button>
                                {sum && (
                                    <h2>Result: <Sum>{sum}</Sum> CZK</h2>
                                )}
                            </Form>
                        </Formik>
                    </FormWrapper>
                    <TableWrapper>
                        <Table
                            rowKey={'title'}
                            columns={columns}
                            data={tableData}
                            tableLayout='auto'
                            components={theme.tableComponents}/>
                    </TableWrapper>
                </Flex>
            </>}
        </>
    );
}

export default App;
