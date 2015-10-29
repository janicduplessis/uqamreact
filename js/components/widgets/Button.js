/**
 * @flow
 */
import React, {
  PropTypes,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import colors from '../../utils/colors';

export default class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>{this.props.children}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: colors.primary,
  },
});
