/**
 * @flow
 */

import {
  Component,
  PropTypes,
  Platform,
  ActionSheetIOS,
} from 'react-native';
import DialogAndroid from 'react-native-dialogs';

import {getCurrentSessions, getSessionName} from '../utils/SessionUtils';

const sessions = getCurrentSessions(new Date());

type Props = typeof SessionPickerDialog.propTypes;

export default class SessionPickerDialog extends Component {

  static propTypes = {
    session: PropTypes.string.isRequired,
    opened: PropTypes.bool,
    onSessionChange: PropTypes.func,
  };

  static defaultProps = {
    opened: false,
  };

  componentDidReceiveProps(newProps: Props) {
    if (!this.props.opened && newProps.opened) {
      this.show();
    }
  }

  show() {
    const selectedIndex = sessions.findIndex(s => s === this.props.session);
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['Cancel', ...sessions.map(s => getSessionName(s))],
        cancelButtonIndex: 0,
      }, (index) => {
        if (index !== 0 && this.props.onSessionChange &&
            index - 1 !== selectedIndex) {
          this.props.onSessionChange(sessions[index - 1]);
        }
      });
    } else {
      const dialog = new DialogAndroid();
      dialog.set({
        title: 'Pick a session',
        items: sessions.map(s => getSessionName(s)),
        itemsCallbackSingleChoice: (index) => {
          if (this.props.onSessionChange && index !== selectedIndex) {
            this.props.onSessionChange(sessions[index]);
          }
        },
        selectedIndex,
      });
      dialog.show();
    }
  }

  render(): ?ReactElement {
    return null;
  }
}
