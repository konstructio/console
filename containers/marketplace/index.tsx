import React, { FunctionComponent, useMemo, useState } from 'react';
import { FormControlLabel, FormGroup } from '@mui/material';
import intersection from 'lodash/intersection';
import NextLink from 'next/link';

import Checkbox from '../../components/checkbox';
import Typography from '../../components/typography';
import MarketplaceCard from '../../components/marketplaceCard';
import MarketplaceModal from '../../components/marketplaceModal';
import useModal from '../../hooks/useModal';
import { useAppSelector } from '../../redux/store';
import { MarketplaceApp } from '../../types/marketplace';
import { VOLCANIC_SAND } from '../../constants/colors';

import { CardsContainer, Container, Content, Filter } from './marketplace.styled';

const STATIC_HELP_CARD: MarketplaceApp = {
  categories: [],
  name: 'Can’t find what you need?',
  image_url:
    'https://raw.githubusercontent.com/kubefirst/kubefirst/main/images/kubefirst-light.svg',
};

const Marketplace: FunctionComponent = () => {
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>([]);
  const [selectedApp, setSelectedApp] = useState<MarketplaceApp>();

  const { isOpen, openModal, closeModal } = useModal();

  const marketplaceApps = useAppSelector(({ api }) => api.marketplaceApps);
  const categories = useMemo(
    () =>
      marketplaceApps
        .map(({ categories }) => categories)
        .reduce((previous, current) => {
          const values = current.filter((category) => !previous.includes(category));
          return [...previous, ...values];
        }, []),
    [marketplaceApps],
  );

  const onClickCategory = (category: string) => {
    const isCategorySelected = selectedCategories.includes(category);

    if (isCategorySelected) {
      setSelectedCategories(
        selectedCategories.filter((selectedCategory) => selectedCategory !== category),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSelectedApp = (app: MarketplaceApp) => {
    setSelectedApp(app);
    openModal();
  };

  const filteredApps = useMemo(() => {
    if (!selectedCategories.length) {
      return marketplaceApps;
    }

    return (
      marketplaceApps &&
      marketplaceApps.filter(
        ({ categories }) => intersection(categories, selectedCategories).length > 0,
      )
    );
  }, [marketplaceApps, selectedCategories]);

  return (
    <Container>
      <Filter>
        <Typography variant="subtitle2" sx={{ mb: 3 }}>
          Category
        </Typography>
        {categories &&
          categories.map((category) => (
            <FormGroup key={category} sx={{ mb: 2 }}>
              <FormControlLabel
                control={<Checkbox sx={{ mr: 2 }} onClick={() => onClickCategory(category)} />}
                label={
                  <Typography variant="body2" color={VOLCANIC_SAND}>
                    {category}
                  </Typography>
                }
                sx={{ ml: 0 }}
              />
            </FormGroup>
          ))}
      </Filter>
      <Content>
        <Typography variant="subtitle2">Featured</Typography>
        <CardsContainer>
          {filteredApps.map((app) => (
            <MarketplaceCard key={app.name} {...app} onClick={() => handleSelectedApp(app)} />
          ))}
          <MarketplaceCard {...STATIC_HELP_CARD} showSubmitButton={false}>
            <>
              To suggest an open source app that installs to your cluster, discuss your idea via an{' '}
              <NextLink href="https://github.com/kubefirst/kubefirst/issues" target="_blank">
                issue
              </NextLink>
              . Learn how you can do this on our{' '}
              <NextLink href="https://github.com/kubefirst/marketplace" target="_blank">
                Contributing file
              </NextLink>
              .
              <br />
              <br />
              Alternatively contact us via our{' '}
              <NextLink href="https://kubefirst.io/slack" target="_blank">
                Slack Community
              </NextLink>{' '}
              in the #helping-hands or #contributors channels.
            </>
          </MarketplaceCard>
        </CardsContainer>
      </Content>
      {isOpen && selectedApp?.name && (
        <MarketplaceModal closeModal={closeModal} isOpen={isOpen} {...selectedApp} />
      )}
    </Container>
  );
};

export default Marketplace;
