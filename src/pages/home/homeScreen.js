import React, {useEffect, useState} from 'react';
import {View, FlatList, SafeAreaView, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/header';
import SearchBar from '../../components/searchBar';
import InfoHolder from '../../components/infoHolder';
import {getPosts} from '../../store/slices/postSlice';
import styles from '../../styles';
import * as util from '../../utilities';
import {RefreshControl} from 'react-native-gesture-handler';

const homeScreen = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const isLoading = useSelector(state => state.posts.loading);

  const [arrayholder, setArrayholder] = useState([]);
  const [text, setText] = useState('');
  const [sortedData, setSortedData] = useState([]);
  const [enableSort, setEnableSort] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getPosts()).then(() => {
      setArrayholder(posts);
      setSortedData(posts);
    });
  }, []);

  const searchData = text => {
    setText(text);
    const newData = arrayholder.filter(item => {
      const itemData = item.title.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (sortedData.length && enableSort) {
      let sortedData_ = [...newData].sort((a, b) => b.id - a.id);
      setSortedData(sortedData_);
    } else {
      setSortedData(newData);
    }
  };

  const itemSeparator = () => {
    return <View style={styles.home.seprator} />;
  };

  const keyExtractor = index => index.toString();

  const renderCard = ({item, index}) => {
    return <InfoHolder item={item} index={index} />;
  };

  const getSortedProducts = () => {
    let sortedData_ = [...sortedData].sort((a, b) => b.id - a.id);
    setSortedData(sortedData_);
    setEnableSort(true);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setText('');
    dispatch(getPosts()).then(() => {
      setArrayholder(posts);
      setSortedData(posts);
    });
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.home.container}>
      {isLoading && util.showLoader()}
      <Header />
      <SearchBar
        value={text}
        searchAction={() => {
          text.length ? searchData('') : setText('');
        }}
        sortAction={() => getSortedProducts()}
        setValue={text => searchData(text)}
      />
      {sortedData.length ? (
        <FlatList
          data={sortedData}
          keyExtractor={keyExtractor}
          renderItem={renderCard}
          contentContainerStyle={styles.home.flatList}
          ItemSeparatorComponent={itemSeparator}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
        />
      ) : (
        util.showLoader()
      )}
    </SafeAreaView>
  );
};

export default homeScreen;
