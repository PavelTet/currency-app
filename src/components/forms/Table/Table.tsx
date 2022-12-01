import styled from 'styled-components'
import {color} from "../../../theme/color";

const HeaderRowTag = styled.tr`
  & th {
    font-weight: 500;
    font-size: 14px;
    line-height: 23px;
    color: ${props => props.theme.color.red};
    padding-right: ${props => props.theme.size.spacing[4]};
    text-align: center;
  }
`

const BodyRowTag = styled.tr`
  & td {
    transition: all 0.3s;
    border-bottom: 1px solid rgba(215, 224, 231, 0.5);
    height: ${props => props.theme.size.spacing[7]};
    line-height: 30px;
    text-align: center;
  }

  &:hover td {
    background: ${color.blue};
  }
`

const TableTag = styled.table`
  overflow: scroll;
  width: 100%;
`

export const tableComponents = {
    table: TableTag,
    body: {
        row: BodyRowTag
    },
    header: {
        row: HeaderRowTag
    }
}
