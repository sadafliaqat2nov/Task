import React from 'react';
import {TextInput} from 'react-native';
import styles from '../styles/index';
import * as util from '../utilities';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

const SearchBarView = styled.View`
  ${styles.home.searchBarView}
`;

const SearchBarComponent = styled.View`
  ${styles.home.searchBar}
`;

const IconButton = styled.TouchableOpacity`
  ${styles.home.rowDirection}
`;

const SearchBar = props => {
  const {value, sortAction, onChange} = props;

  return (
    <SearchBarView>
      <SearchBarComponent>
        <Ionicons
          name={value.length ? 'close' : 'search'}
          size={util.WP(5)}
          color={util.colors.frost}
          style={styles.home.searchIcon}
        />
        <TextInput
          value={value}
          style={styles.home.searchBarTextInput}
          onChangeText={onChange}
          placeholderTextColor={util.colors.frost}
          placeholder="Search"
          returnKeyType="search"
        />
      </SearchBarComponent>
      <IconButton>
        <FontAwesome
          name="sliders"
          size={util.WP(6)}
          color={util.colors.drawer}
        />
      </IconButton>
      <IconButton onPress={sortAction}>
        <FontAwesome5
          name="sort-amount-down"
          size={util.WP(6)}
          color={util.colors.drawer}
        />
      </IconButton>
    </SearchBarView>
  );
};

export default SearchBar;
