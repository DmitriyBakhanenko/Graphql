import React from 'react';
import CollectionPreview from '../collection-preview/collection-preview.component';
import { useQuery, gql } from '@apollo/client';

import Spinner from '../spinner/spinner.component';

import './collections-overview.styles.scss';

const COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionsOverview = () => {
  const { loading, error, data } = useQuery(COLLECTIONS);

  if (loading) return <Spinner />;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className='collections-overview'>
      {data.collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default CollectionsOverview;
