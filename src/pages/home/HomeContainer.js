import React from 'react';
import {fetchPostsList} from '../../services/api';
import {constants} from '../../utilities';

const initialState = {
  defaultPosts: [],
  posts: [],
  isSortDec: false,
  isLoading: true,
  isRefreshing: false,
  queryStr: '',
};

const useHomeConatiner = () => {
  // =========================================================================
  // Reducer
  // =========================================================================

  const reducer = (state, action) => {
    switch (action.type) {
      case constants.reducerTypes.REQUEST_INIT:
        return {...state, isLoading: true};
      case constants.reducerTypes.REQUEST_REFETCH:
        return {...state, isRefreshing: true};
      case constants.reducerTypes.REQUEST_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isRefreshing: false,
          isSortDec: state.isSortDec,
          posts: action.payload,
          defaultPosts: action.payload,
        };
      case constants.reducerTypes.REQUEST_FAIL:
        return {...state, isLoading: false, isRefreshing: false};
      case constants.reducerTypes.SET_SORTED_DATA:
        return {
          ...state,
          posts: action.payload,
          isSortDec: action.isSortDec,
        };
      case constants.reducerTypes.UPDATE_DETELED_DATA:
        return {
          ...state,
          posts: action.payload,
          defaultPosts: action.defaultPosts,
        };
      case constants.reducerTypes.UPDATE_DATA:
        return {...state, posts: action.payload};
      case constants.reducerTypes.TEXT_CHANGE:
        return {...state, queryStr: action.payload};
      default:
        return state;
    }
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const {defaultPosts, posts, isLoading, isRefreshing, queryStr, isSortDec} =
    state;

  React.useEffect(() => {
    getPostsList();
  }, []);

  // FETCH POTSLIST
  const getPostsList = async () => {
    let data = await fetchPostsList();
    dispatch({type: constants.reducerTypes.REQUEST_SUCCESS, payload: data});

    if (isSortDec) sortPostList();
    if (Boolean(queryStr)) handleSearch(queryStr);
  };

  // SORT LIST
  const sortPostList = () => {
    const sortedData = handleSort(posts, isSortDec);
    dispatch({
      type: constants.reducerTypes.SET_SORTED_DATA,
      payload: sortedData,
      isSortDec: !isSortDec,
    });
  };

  // HANLDE REFRESH LIST
  const handleRefresh = () => {
    dispatch({type: constants.reducerTypes.REQUEST_REFETCH});
    getPostsList();
  };

  // DELETE ITEM
  const handleDelete = (index, postId) => {
    const dumpPost = [...posts];
    dumpPost.splice(index, 1);
    const dumpDefaultPost = [...defaultPosts].filter(({id}) => id != postId);
    dispatch({
      type: constants.reducerTypes.UPDATE_DETELED_DATA,
      defaultPosts: dumpDefaultPost,
      payload: dumpPost,
    });
  };

  // HANDLE TEXT CHANGE
  const handleTextChange = text => {
    dispatch({type: constants.reducerTypes.TEXT_CHANGE, payload: text});
    handleSearch(text);
  };

  // SEARCH ITEM
  const handleSearch = (query = '') => {
    const _query = query?.toUpperCase();
    const filteredData = defaultPosts.filter(({title}) =>
      title.toUpperCase().includes(_query),
    );
    dispatch({type: constants.reducerTypes.UPDATE_DATA, payload: filteredData});
  };

  // GENERAL SORT FUNCTION
  const handleSort = (_data = [], acc = false) => {
    let dump = [..._data];
    let sortedData = dump.sort((a, b) => {
      if (acc) {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    return sortedData;
  };

  return {
    posts,
    isLoading,
    isRefreshing,
    queryStr,
    handleSearch,
    sortPostList,
    handleRefresh,
    handleDelete,
    handleTextChange,
  };
};

export default useHomeConatiner;
