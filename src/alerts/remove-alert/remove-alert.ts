import { Alert } from 'react-native';

export default function showRemoveAlert() {
  return new Promise((resolve, reject) => {
    Alert.alert(
      'Do you want to remove this color?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          onPress: () => resolve(),
          style: 'destructive'
        }
      ],
      { cancelable: false }
    );
  });
}
