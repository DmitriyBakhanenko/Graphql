import { useQuery, gql } from '@apollo/client';
import React from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';
import Spinner from '../../components/spinner/spinner.component';
import './collection.styles.scss';

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
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

const CollectionPage = ({ match }) => {
  const title = match.params.collectionId;
  const { loading, error, data } = useQuery(GET_COLLECTION_BY_TITLE, {
    variables: { title }
  });

  if (loading) return Spinner;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className='collection-page'>
      <h2 className='title'>{data.getCollectionsByTitle.title}</h2>
      <div className='items'>
        {data.getCollectionsByTitle.items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
