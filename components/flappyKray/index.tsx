import React, { FunctionComponent, useRef } from 'react';

import Modal from '../../components/modal';

import { Close, ShareInTwitter } from './flappyKray.styled';

export interface FlappyKrayProps {
  closeModal: () => void;
  isOpen: boolean;
}

const FlappyKray: FunctionComponent<FlappyKrayProps> = ({ closeModal, isOpen }) => {
  const flappyKRayRef = useRef<HTMLIFrameElement>(null);

  // const handleOnKeyPress = ({ keyCode }: KeyboardEvent) => {
  //   console.log(flappyKRayRef.current?.contentWindow)
  //   flappyKRayRef.current?.contentWindow?.fly(keyCode, '*');
  // };

  // useEffect(() => {
  //   window.addEventListener('keydown', handleOnKeyPress);
  //   return () => window.removeEventListener('keydown', handleOnKeyPress);
  // }, []);

  flappyKRayRef.current?.contentWindow?.postMessage('');
  return (
    <Modal isOpen={isOpen} backgroundColor="transparent" boxShadow={false}>
      <>
        <iframe
          id="flappy-kray"
          title="Flappy KRay"
          src="http://kray.kubefirst.com"
          ref={flappyKRayRef}
          style={{
            border: 0,
            height: '700px',
            width: '1050px',
          }}
        />
        <ShareInTwitter
          color="secondary"
          fontSize="large"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?url=I'm trying @kubefirst \n&hashtags=kubefirst,gitops,kubernetes`,
              '_blank',
            )
          }
        />
        <Close onClick={closeModal} color="secondary" fontSize="large" />
      </>
    </Modal>
  );
};

export default FlappyKray;
