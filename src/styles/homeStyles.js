import {StyleSheet} from 'react-native';
import * as util from '../utilities/index';

export default StyleSheet.create({
  container: {backgroundColor: util.colors.primaryColor},
  mainView: {
    flex: 1,
    backgroundColor: util.colors.white,
  },
  boldText: {
    fontSize: util.WP(4),
    fontWeight: 'bold',
    paddingVertical: util.WP(2),
    color: util.colors.ember,
  },
  normalText: {
    fontSize: util.WP(4),
    color: util.colors.black,
  },
  headerText: {
    fontSize: util.WP(3.2),
    color: util.colors.white,
    fontWeight: 'bold',
  },
  cardView: {
    padding: util.WP(3),
    backgroundColor: util.colors.white,
  },
  // search bar
  searchBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: util.colors.white,
    padding: util.WP(4),
  },
  searchBar: {
    width: util.WP(73),
    height: util.WP(11),
    borderWidth: util.WP(0),
    paddingHorizontal: util.WP(2),
    borderRadius: util.WP(3),
    flexDirection: 'row',
    marginRight: util.WP(3),
    alignItems: 'center',
    backgroundColor: util.colors.grey,
  },
  searchBarTextInput: {
    fontSize: util.WP(4),
    color: util.colors.black,
    height: util.WP(11),
    width: util.WP(78),
    fontWeight: '600',
  },
  searchIcon: {
    paddingHorizontal: util.WP(2),
  },
  rowDirection: {flexDirection: 'row', alignItems: 'center'},
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: util.WP(3),
    backgroundColor: util.colors.primaryColor,
  },
  genericLoader: {
    backgroundColor: util.colors.windowTint,
    position: 'absolute',
    top: 0,
    left: 0,
    width: util.WP(100),
    height: util.WP(250),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    paddingBottom: util.WP(30),
  },
  flatList: {
    flexGrow: 1,
    paddingBottom: util.WP(30),
    backgroundColor: util.colors.white,
  },
  seprator: {
    height: util.WP(0.3),
    backgroundColor: util.colors.windowTint,
  },
  deleteBox: {
    backgroundColor: util.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    width: util.WP(21),
    height: '100%',
  },
});
