import React, { FunctionComponent } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { FONT_WEIGHTS, SIZES, TYPES } from '../../enums/typography';
import Modal from '../modal';
import Text from '../text';

import {
  Actions,
  Body,
  Button,
  Code,
  Container,
  Divider,
  Footer,
  Header,
  Image,
  List,
  Row,
} from './cardDetails.styled';

export interface ICardDetailsProps {
  appName: string;
  companyName?: string;
  links: Array<string>;
  logo: string;
  userName: string;
  password: string;
  isOpen: boolean;
  closeModal: () => void;
}

const CardDetails: FunctionComponent<ICardDetailsProps> = ({
  appName,
  companyName,
  links,
  logo,
  userName,
  password,
  isOpen,
  closeModal,
}) => {
  return (
    <Modal isModalVisible={isOpen} onCloseModal={closeModal}>
      <>
        <Container>
          <Modal.Header>
            <Header>
              <Image src={logo} />
              <Text type={TYPES.TITLE} size={SIZES.S3}>
                <>
                  {appName}
                  <Text type={TYPES.DISABLED} style={{ marginLeft: 5 }}>
                    <>{companyName && `By: ${companyName}`}</>
                  </Text>
                </>
              </Text>
            </Header>
          </Modal.Header>
          <Divider />
          <Modal.Body>
            <Body>
              {userName && (
                <>
                  <Row>
                    <Text fontWeight={FONT_WEIGHTS.SEMIBOLD} size={SIZES.S1}>
                      Username:
                    </Text>
                  </Row>
                  <Row>
                    <Code>{userName}</Code>
                  </Row>
                </>
              )}

              <Row>
                <Text fontWeight={FONT_WEIGHTS.SEMIBOLD} size={SIZES.S1}>
                  Password:
                </Text>
              </Row>
              <Row>
                <Code>{password}</Code>
              </Row>
              <Actions>
                <CopyToClipboard text={userName}>
                  <Button>Copy Username</Button>
                </CopyToClipboard>
                <CopyToClipboard text={password}>
                  <Button>Copy Password</Button>
                </CopyToClipboard>
              </Actions>
            </Body>
          </Modal.Body>
        </Container>
        <Modal.Footer>
          <Footer>
            Tips:
            <ul>
              <List>
                <Text>Update the credentials as soon as possible</Text>
              </List>
              <List>
                <Text>Store the credentials in a safe place</Text>
              </List>
            </ul>
          </Footer>
        </Modal.Footer>
      </>
    </Modal>
  );
};

export default CardDetails;
