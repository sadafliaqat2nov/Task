import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as util from '../utilities';
import styled from 'styled-components/native';

const HeaderView = styled.View`
  ${styles.home.headerView}
`;

const BluetoothView = styled.View`
  ${styles.home.rowDirection}
`;

const HeaderText = styled.Text`
  ${styles.home.headerText}
`;

const Header = props => {
  return (
    <HeaderView>
      <BluetoothView>
        <Ionicons
          name="bluetooth"
          size={util.WP(6)}
          color={util.colors.white}
        />
        <HeaderText>100%</HeaderText>
      </BluetoothView>
      <Octicons name="broadcast" size={util.WP(6)} color={util.colors.white} />
      <Ionicons
        name="cloud-done-outline"
        size={util.WP(6.5)}
        color={util.colors.white}
      />
    </HeaderView>
  );
};

export default Header;
