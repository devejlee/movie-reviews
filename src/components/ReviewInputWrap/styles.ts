import styled from '@emotion/styled'
import { baseStyle } from '../../baseStyles'

export const Wrap = styled.div`
  ${baseStyle}
  background: #f5f5f5;
`

export const Button = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 20px;
  background: #194e84;
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
