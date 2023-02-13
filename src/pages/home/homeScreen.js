import React, {useEffect, useState} from 'react';
import {View, FlatList, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/header';
import SearchBar from '../../components/searchBar';
import InfoHolder from '../../components/infoHolder';
import {getPosts} from '../../store/slices/postSlice';
import styles from '../../styles';
import * as util from '../../utilities';
import {RefreshControl} from 'react-native-gesture-handler';
let row = [];
let openRow = null;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {posts = [], isLoading = false} = useSelector(({posts}) => posts);
  const [arrayholder, setArrayholder] = useState([]);
  const [text, setText] = useState('');
  const [sortedData, setSortedData] = useState([]);
  const [enableSort, setEnableSort] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [rowOpened, setRowOpened] = useState(-1);
  const [deletedData, setDeletedData] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    setArrayholder(posts);
    setSortedData(posts);
  }, [posts]);

  const searchData = text => {
    setText(text);
    if (deletedData.length) {
      const newData = deletedData.filter(item => {
        const itemData = item.title.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.includes(textData);
      });
      if (sortedData.length && enableSort) {
        let sortedData_ = [...newData].sort((a, b) => b.id - a.id);
        setSortedData(sortedData_);
      } else {
        setSortedData(newData);
      }
    } else {
      const newData = arrayholder.filter(item => {
        const itemData = item.title.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.includes(textData);
      });
      if (sortedData.length && enableSort) {
        let sortedData_ = [...newData].sort((a, b) => b.id - a.id);
        setSortedData(sortedData_);
      } else {
        setSortedData(newData);
      }
    }
  };

  const itemSeparator = () => {
    return <View style={styles.home.seprator} />;
  };

  const keyExtractor = (_, index) => index.toString();

  const closeRow = index => {
    if (rowOpened != -1 && rowOpened !== index) {
      row[rowOpened]?.close();
    }
    openRow = index;
    setRowOpened(index);
  };

  const deleteItem = (id, index) => {
    const arrCopy = Array.from(sortedData);
    const objWithIdIndex = arrCopy.findIndex(obj => obj.id === id);
    arrCopy.splice(objWithIdIndex, 1);
    setSortedData(arrCopy);
    setDeletedData(arrCopy);
    row[index].close();
  };

  const renderCard = ({item, index}) => {
    return (
      <InfoHolder
        item={item}
        index={index}
        infoRef={ref => {
          row[index] = ref;
        }}
        onSwipeableOpen={() => {
          closeRow(index);
        }}
        handleDelete={() => {
          deleteItem(item.id, index);
        }}
      />
    );
  };

  const RenderItems = React.useCallback(renderCard, [sortedData]);

  const getSortedProducts = () => {
    let sortedData_ = [...sortedData].sort((a, b) => b.id - a.id);
    setSortedData(sortedData_);
    setEnableSort(true);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setText('');
    dispatch(getPosts());
    setArrayholder(posts);
    setSortedData(posts);
    setEnableSort(false);
    setIsRefreshing(false);
    setDeletedData([]);
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
      <FlatList
        data={sortedData}
        keyExtractor={keyExtractor}
        renderItem={RenderItems}
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
    </SafeAreaView>
  );
};

export default HomeScreen;
