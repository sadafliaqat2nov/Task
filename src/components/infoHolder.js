import React from 'react';
import styles from '../styles';
import styled from 'styled-components/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { View, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as util from '../utilities';

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
  const { item, infoRef, handleDelete } = props;

  const leftSwipe = () => {
    return (
      <>
        <TouchableOpacity onPress={handleDelete} activeOpacity={0.6}>
          <View style={styles.home.deleteBox}>
            <AntDesign
              name="delete"
              size={util.WP(8)}
              color={util.colors.white}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <Swipeable
      renderRightActions={leftSwipe}
      ref={infoRef}
    >
      <CardView>
        <CardTextTitle>
          {item.id} - {item?.title}
        </CardTextTitle>
        <CardText>{item?.body}</CardText>
      </CardView>
    </Swipeable>
  );
};

export default React.memo(infoHolder);
