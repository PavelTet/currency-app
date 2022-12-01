import {Field, useFormikContext} from 'formik'
import React, {useRef} from 'react'
import InputLabel from "../InputLabel/InputLabel";
import styled from "styled-components";
import {InputError} from "../InputError/InputError";

type Props = {};

const InputContainer = styled.div<Props>`
  border: 1px solid ${props => props.theme.color.softGrey};
  border-radius: 7px;
  margin: 1rem 0;
  position: relative;
  padding: 0.32rem 1rem;
  background-color: ${props => props.theme.color.white};
  min-width: auto;
  max-width: 100%;

  input {
    height: 36px;
    font-size: 15px;
  }

  &:focus {
    outline: none;
  }

  input {
    background: transparent;
    outline: none;
    width: 100%;
    border: none;

    &:focus {
      outline: none !important;
      border-color: inherit;
    }
  }
`

type TextInputProps = {
    name: string;
    label: string;
    type?: string;
    size?: string;
    flexible?: boolean;
    value?: string | undefined;
    onChange?: (value: string) => void;
};

const TextInput = ({
                       name,
                       label,
                       type = 'text',
                       onChange = undefined,
                   }: TextInputProps) => {
    const input = useRef<HTMLInputElement>(null)

    const {setFieldValue} = useFormikContext()

    return (
        <div>
            <InputContainer>
                <>
                    <InputLabel>
                        {label}
                    </InputLabel>

                    <Field
                        type={type}
                        name={name}
                        innerRef={input}
                        onChange={(event: any) => {
                            setFieldValue(name, event.target.value)

                            // Trigger value change
                            if (onChange !== undefined) {
                                onChange(event.target.value)
                            }
                        }}
                    />
                </>
            </InputContainer>

            <InputError name={name}/>
        </div>
    )
}

export {TextInput}

export type {TextInputProps}
