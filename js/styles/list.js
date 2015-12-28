import {Platform, StyleSheet, PixelRatio} from 'react-native';

import colors from './colors';

const common = {
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
    marginVertical: 8,
  },
};

const ios = {
  item: {},
  header: {
    marginVertical: 16,
    marginHorizontal: 8,
  },
  content: {
    backgroundColor: colors.white,
    borderColor: colors.grayMedium,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
};

const android = {
  item: {
    backgroundColor: colors.white,
    borderRadius: 2,
    elevation: 2,
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 16,
  },
  header: {
    color: colors.title,
    fontSize: 18,
    marginBottom: 16,
  },
  content: {
    backgroundColor: colors.white,
  },
};

export default StyleSheet.create(Object.assign({}, common, Platform.OS === 'ios' ? ios : android));
