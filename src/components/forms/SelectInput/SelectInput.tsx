import {useFormikContext} from 'formik'
import React, {ReactNode, useState} from 'react'
import styled from "styled-components";

const SelectLabel = styled.label`
  position: absolute;
  background: white;
  color: ${props => props.theme.color.softGrey};
  top: -9px;
  left: 16px;
  font-size: 12px;
  padding: 0 0.1rem;
  user-select: none;
`;

const SelectContainer = styled.div`
  position: relative;
  padding: 0 1.1rem;
  max-width: 100%;
  border: 1px solid ${props => props.theme.color.softGrey};
  border-radius: 7px;
  background-color: white;

  select {
    margin: 1rem 0;
    background: transparent;
    outline: none;
    min-width: 250px;
    width: 100%;
    border: none;

    &:focus {
      outline: none !important;
      border-color: inherit;
    }
  }
`

type SelectInputProps = {
    name: string;
    label: string;
    value: string | undefined | number;
    children: ReactNode;
    onChange?: (value: string) => void;
};
const SelectInput = ({
                         name,
                         label,
                         value,
                         children,
                         onChange = undefined
                     }: SelectInputProps) => {

    const [selected, setSelected] = useState<string | number | undefined>(value)

    const {setFieldValue} = useFormikContext()

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(event.target.value)

        setFieldValue(name, event.target.value)

        // Trigger value change
        if (onChange !== undefined) {
            onChange(event.target.value)
        }
    }

    return (
        <SelectContainer>
            <select name={name} value={selected} onChange={handleChange}>
                {children}
            </select>
            <SelectLabel>{label}</SelectLabel>
        </SelectContainer>
    )
}

export {SelectInput}

export type {SelectInputProps}
