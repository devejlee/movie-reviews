import styled from '@emotion/styled'
import { baseStyle } from '../../baseStyles'

export const Wrap = styled.div`
  ${baseStyle}
  background: #ffb9ac;
`

export const Button = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 20px;
  background: #ff7f50;
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  border: none;
  transition: background-color 0.3s ease;
  &:hover {
    cursor: pointer;
    background: #ff6347; /* Updated background color on hover */
  }
`;
