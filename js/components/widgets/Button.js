/**
 * @flow
 */
import React, {
  Component,
  PropTypes,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import colors from '../../styles/colors';

export default class Button extends Component {

  static propTypes = {
    flat: PropTypes.bool,
    onPress: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    flat: false,
  };

  render() {
    const {flat} = this.props;
    const FeedbackComponent = Platform.OS === 'ios' ?
      TouchableOpacity :
      TouchableNativeFeedback;
    return (
      <FeedbackComponent
        onPress={this.props.onPress}
      >
        <View style={[styles.wrapper, flat && styles.flatWrapper]}>
          <Text style={[styles.text, flat && styles.flatText]}>{this.props.children}</Text>
        </View>
      </FeedbackComponent>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  flatWrapper: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  flatText: {
    color: colors.primary,
  },
});
