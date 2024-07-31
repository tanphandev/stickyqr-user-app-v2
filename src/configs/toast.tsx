import { BaseToast, ErrorToast } from 'react-native-toast-message';

import colors from '../ui/colors';

/*
  1. Create the config
*/
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#4ade80',
        borderLeftWidth: 0,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
      }}
      text1NumberOfLines={3}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: colors.danger[500],
        borderLeftWidth: 0,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
        flexShrink: 1,
      }}
      text1NumberOfLines={3}
    />
  ),
};

export default toastConfig;
