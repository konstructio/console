import React, { FunctionComponent, useMemo, useState } from 'react';
import { FormControlLabel, FormGroup } from '@mui/material';
import intersection from 'lodash/intersection';
import sortBy from 'lodash/sortBy';
import NextLink from 'next/link';
import { addMarketplaceApp } from 'redux/slices/cluster.slice';

import Checkbox from '../../components/checkbox';
import Typography from '../../components/typography';
import MarketplaceCard from '../../components/marketplaceCard';
import MarketplaceModal from '../../components/marketplaceModal';
import useModal from '../../hooks/useModal';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { MarketplaceApp } from '../../types/marketplace';
import { VOLCANIC_SAND } from '../../constants/colors';

import { CardsContainer, Container, Content, Filter } from './marketplace.styled';

const STATIC_HELP_CARD: MarketplaceApp = {
  categories: [],
  name: 'Can’t find what you need?',
  image_url: 'https://assets.kubefirst.com/console/help.png',
};

const Marketplace: FunctionComponent<{ onSubmit: (name: string) => void }> = ({ onSubmit }) => {
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>([]);
  const [selectedApp, setSelectedApp] = useState<MarketplaceApp>();

  const dispatch = useAppDispatch();

  const { isOpen, openModal, closeModal } = useModal();

  const marketplaceApps = useAppSelector(({ cluster }) =>
    cluster.marketplaceApps.filter(
      (app) => !cluster.clusterServices.map((s) => s.name).includes(app.name),
    ),
  );
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
    if (app.secret_keys?.length) {
      setSelectedApp(app);
      openModal();
    } else {
      setTimeout(() => {
        dispatch(addMarketplaceApp(app));
        onSubmit(app.name);
      }, 2000);
    }
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
        <FormGroup sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox sx={{ mr: 2 }} onClick={() => onClickCategory('all')} defaultChecked />
            }
            label={
              <Typography variant="body2" color={VOLCANIC_SAND}>
                All
              </Typography>
            }
            sx={{ ml: 0 }}
          />
        </FormGroup>
        {categories &&
          sortBy(categories).map((category) => (
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
        <Typography variant="subtitle2">All</Typography>
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
        <MarketplaceModal
          closeModal={closeModal}
          isOpen={isOpen}
          onSubmit={onSubmit}
          {...selectedApp}
        />
      )}
    </Container>
  );
};

export default Marketplace;
