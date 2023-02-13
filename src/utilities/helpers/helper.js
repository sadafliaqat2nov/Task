import {BallIndicator} from 'react-native-indicators';
import * as util from '../../utilities';
import styles from '../../styles';
import styled from 'styled-components/native';

const GenericLoader = styled.View`
  ${styles.home.genericLoader}
`;

export const handleChange = (value, key, object) => {
  let temp = object;
  temp[key] = value;
  return temp;
};

export const showLoader = () => {
  return (
    <GenericLoader>
      <BallIndicator color={util.colors.primaryColor} size={50} />
    </GenericLoader>
  );
};
