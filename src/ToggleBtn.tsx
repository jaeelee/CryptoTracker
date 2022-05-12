import React, { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isDarkAtom } from './atoms';

const ToggleWrapper = styled.button`
  background-color: ${props => props.theme.bgColor};
  border: white;
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 30px;
  border-radius: 30px;
  box-shadow: 0px 3px 5px rgba(40, 40, 40, 1) ;
`;

interface IToggleProps {
    children: ReactNode,
    toggle: () => void,
}

function ThemeToggle({ children, toggle }: IToggleProps) {
    const isDark = useRecoilValue(isDarkAtom);
    return (
        <ToggleWrapper onClick={toggle}>
            {isDark ? '🌙' : '☀️'}
        </ToggleWrapper>
    );
}

export default ThemeToggle;