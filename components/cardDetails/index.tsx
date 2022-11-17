import React, { FunctionComponent } from 'react';

import { SIZES, TYPES } from '../../enums/typography';
import { Link } from '../card/card.styled';
import Modal from '../modal';
import Text from '../text';

import { Body, Container, Divider, Footer, Header, Image, Links, List } from './cardDetails.styled';

export interface ICardDetailsProps {
  appName: string;
  companyName?: string;
  links: Array<string>;
  logo: string;
  isOpen: boolean;
  closeModal: () => void;
}

const CardDetails: FunctionComponent<ICardDetailsProps> = ({
  appName,
  companyName,
  links,
  logo,
  isOpen,
  closeModal,
}) => {
  return (
    <Modal isModalVisible={isOpen} onCloseModal={closeModal}>
      <>
        <Container>
          <Modal.Header>
            <Header>
              <Image src={logo} alt="details" />
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
          <Links>
            {links.map((link) => (
              <Link href={link} target="_blank" key={link}>
                <Text type={TYPES.DISABLED}>{link}</Text>
              </Link>
            ))}
          </Links>
          <Modal.Body>
            <Body></Body>
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
