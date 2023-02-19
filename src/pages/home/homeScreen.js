import React, {useEffect, useState} from 'react';
import {View, FlatList, SafeAreaView, RefreshControl} from 'react-native';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import InfoHolder from '../../components/InfoHolder';
import styles from '../../styles';
import * as util from '../../utilities';
import useHomeConatiner from './HomeContainer';

let row = [];

const HomeScreen = () => {
  const {
    posts,
    queryStr,
    isLoading,
    isRefreshing,
    sortPostList,
    handleDelete,
    handleRefresh,
    handleTextChange,
  } = useHomeConatiner();

  const keyExtractor = React.useCallback((_, i) => `${_?.id}_${i}`, [posts]);
  const ItemSeparator = () => <View style={styles.home.seprator} />;

  const renderCard = ({item, index}) => {
    return (
      <InfoHolder
        item={item}
        infoRef={ref => {
          row[index] = ref;
        }}
        handleDelete={() => handleDelete(index, item.id)}
      />
    );
  };

  const RenderItems = React.useCallback(renderCard, [posts]);

  return (
    <View style={{flex: 1, backgroundColor: util.colors.white}}>
      <SafeAreaView style={styles.home.container}>
        {isLoading && util.showLoader()}
        <Header />
        <SearchBar
          value={queryStr}
          sortAction={sortPostList}
          onChange={handleTextChange}
        />
        <FlatList
          data={posts}
          keyExtractor={keyExtractor}
          renderItem={RenderItems}
          contentContainerStyle={styles.home.flatList}
          ItemSeparatorComponent={ItemSeparator}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={isRefreshing}
              tintColor={util.colors.white}
              onRefresh={handleRefresh}
            />
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
