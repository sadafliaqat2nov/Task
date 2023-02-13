import React from 'react';
import styles from '../styles';
import styled from 'styled-components/native';

const CardView = styled.View`
  ${styles.home.cardView}
`;
const CardTextTitle = styled.Text`
  ${styles.home.boldText}
`;
const CardText = styled.Text`
  ${styles.home.normalText}
`;

const infoHolder = props => {
  const {item} = props;
  return (
    <CardView>
      <CardTextTitle>
        {item.id} - {item?.title}
      </CardTextTitle>
      <CardText>{item?.body}</CardText>
    </CardView>
  );
};

export default React.memo(infoHolder);
