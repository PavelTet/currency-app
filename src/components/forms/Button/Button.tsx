import styled from 'styled-components'

const Button = styled.button`
  background-color: ${props => props.theme.color.red};
  text-decoration: none;
  border: none;
  border-radius: 7px;
  font-weight: 700;
  color: ${props => props.theme.color.white};
  cursor: pointer;
  user-select: none;
  text-align: center;
  display: inline-block;
  text-transform: uppercase;
  width: auto;
  min-width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  padding: 0 25px;
  margin-top: ${props => props.theme.size.spacing[5]};

  &:hover {
    background-color: rgb(223, 38, 60);
    color: ${props => props.theme.color.white};
  }
`

Button.defaultProps = {}

export default Button
