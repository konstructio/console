import React, { FunctionComponent } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { TYPES } from '../../enums/typography';
import ArgoCDLogo from '../../assets/argocd.png';
import Text from '../text';
import Tag from '../tag';
import theme from '../../theme';
import Progress from '../progress';
import { CopyIcon } from '../password/password.styled';

import {
  CardFooter,
  CardHeader,
  Column,
  Container,
  Image,
  Password,
  PasswordTitle,
  Tags,
  TextHeader,
} from './card.styled';

const {
  colors: { americanGreen },
} = theme;

const {
  colors: { bleachedSilk, dawnDeparts, naivePeach, transparentBlue },
} = theme;

export interface ICardProps {
  children?: FunctionComponent;
}

const Card: FunctionComponent<ICardProps> = () => {
  return (
    <Container>
      <CardHeader>
        <Image src={ArgoCDLogo} />
        <div>
          <TextHeader>
            <Text type={TYPES.TITLE}>Argo</Text>
            <Text type={TYPES.DISABLED}>By: Intuit</Text>
          </TextHeader>
          <Tags>
            <Tag backgroundColor={bleachedSilk}>Docs</Tag>
            <Tag backgroundColor={transparentBlue}>Datadog</Tag>
            <Tag backgroundColor={naivePeach}>Argo CD</Tag>
            <Tag backgroundColor={dawnDeparts}>GitHub</Tag>
          </Tags>
        </div>
      </CardHeader>
      <Progress label="Sync Status" color={americanGreen} progress={100} />
      <Text type={TYPES.SUBTITLE}>https://argo.your-company.io</Text>
      <CardFooter>
        <Column>
          <Text type={TYPES.SUBTITLE}>Admin Username</Text>
          <Text type={TYPES.DISABLED}>kubefirst-bot</Text>
        </Column>
        <Column>
          <PasswordTitle type={TYPES.SUBTITLE}>
            Password
            <CopyToClipboard text="ThisIsAStrongPassword">
              <CopyIcon />
            </CopyToClipboard>
          </PasswordTitle>
          <Password value={'ThisIsAStrongPassword'} />
        </Column>
      </CardFooter>
    </Container>
  );
};

export default Card;
