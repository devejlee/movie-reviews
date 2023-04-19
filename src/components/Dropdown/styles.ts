import styled from '@emotion/styled'

export const StyledDropdown = styled.div`
  position: relative;
`;

export const StyledDropdownSelected = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  padding-left: 10px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #ddd;
  &:hover {
    cursor: pointer;
  }
`;

export const StyledDropdownMenu = styled.ul`
  border-radius: 5px;
  border: 1px solid #ddd;
  position: absolute;
  width: 100%;
  background: #fff;
  &:hover {
    cursor: pointer;
  }
`;

export const StyledDropdownItem = styled.li`
  padding: 10px;
  &:not(:first-child) {
    padding-top: 10px;
    border-top: 1px solid #ddd;
    width: 100%;
  }
`;