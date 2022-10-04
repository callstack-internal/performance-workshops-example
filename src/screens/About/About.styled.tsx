import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  padding: 64px 32px 64px 24px;
`;

export const Header = styled.Text`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 40px;
  color: ${({color}) => color};
`;

export const SubHeader = styled.Text`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 48px;
  color: ${({color}) => color};
`;

export const Paragraph = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin: 8px 0;
  line-height: 22px;
  letter-spacing: 0.2px;
  color: ${({color}) => color};
`;
