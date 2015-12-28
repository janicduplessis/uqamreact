import {StyleSheet, PixelRatio} from 'react-native';

import colors from './colors';

export default StyleSheet.create({
  header: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  content: {
    backgroundColor: colors.white,
    borderColor: colors.grayMedium,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
    marginVertical: 8,
  },
});
