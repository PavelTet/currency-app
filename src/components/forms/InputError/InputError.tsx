import { ErrorMessage } from 'formik'
import React from 'react'
import styled from 'styled-components'

const InputError = ({ name }: { name: string }) => (
    <InputErrorWrapper>
        <ErrorMessage name={name} component='div' />
    </InputErrorWrapper>
)

const InputErrorWrapper = styled.div`
  color: red;
  margin: 0.8rem 0 -0.2rem 0;
  padding: 0 0.5rem;
  font-size: 14px;
  text-align: start;
`

export { InputError }
