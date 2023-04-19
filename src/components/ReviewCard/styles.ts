import styled from '@emotion/styled'

export const StyledReviewCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  min-height: 150px;
`;

export const StyledScoreRow = styled.div`
  display: flex;
`;

export const StyledCircle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #fcf67b;
  &:not(:last-child) {
    margin-right: 5px;
  }
`;