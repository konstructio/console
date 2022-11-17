import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

export const Backdrop = styled.div<{ isModalVisible: boolean }>`
  display: ${({ isModalVisible }) => (isModalVisible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @keyframes fadeIn {
    from {
      opacity: 0;
      display: none;
    }

    to {
      opacity: 1;
      display: block;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      display: block;
    }

    to {
      opacity: 0;
      display: none;
    }
  }

  ${({ isModalVisible }) =>
    isModalVisible ? 'animation: fadeIn 1s forwards' : 'animation: fadeOut 2s forwards'};

  background: rgba(0, 0, 0, 0.8);
  overscroll-behavior: none;
`;

export const Container = styled.div`
  position: fixed;
  z-index: 1300;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
`;

export const Content = styled.div`
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 100%;
  max-width: 448px;
  transition: all 300ms ease 0s;
  position: relative;
`;

export const FragmentContainer = styled.div`
  position: relative;
`;

export const Close = styled(IoClose)`
  cursor: pointer;
  font-size: 18px;
  position: absolute;
  right: 10px;
  top: 10px;
`;
