import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Close from 'assets/actions/xmark-black-icon.svg';
import clsx from 'clsx';
import React, {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Pressable, Text, View } from 'react-native';
import { z } from 'zod';

import type { TxKeyPath } from '@/core/i18n';
import { translate } from '@/core/i18n';
import { Button } from '@/ui';
import RadioButton from '@/ui/radio-button';
import TextInputWithLabel from '@/ui/text-input-with-label';

// constant
export enum METHOD {
  phoneText = 'phoneText',
  phoneCall = 'phoneCall',
  email = 'email',
}

const ANOTHER_METHODS = [
  {
    name: 'MAKE_A_PHONE_CALL',
    value: METHOD.phoneCall,
  },
  {
    name: 'EMAIL',
    value: METHOD.email,
  },
];

// types
export type GetCodeByBottomSheetRefType = {
  present: () => void;
  close: () => void;
};

type Props = {
  onSubmit: (method: METHOD, value: string) => void;
};

const GetCodeByBottomSheet = forwardRef<GetCodeByBottomSheetRefType, Props>(
  // eslint-disable-next-line max-lines-per-function
  function Component({ onSubmit }, ref) {
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // state
    const [selectedValue, setSelectedValue] = useState<METHOD | null>(null);
    const [emailValue, setEmailValue] = useState('');
    const [validateEmailError, setValidateEmailError] = useState<string>('');

    // callbacks
    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);

    const handleCloseModal = useCallback(() => {
      bottomSheetModalRef.current?.close();
    }, []);

    const validateEmail = (email: string): boolean => {
      const emailSchame = z.string().email();
      const result = emailSchame.safeParse(email);
      if (!email.trim()) {
        setValidateEmailError(translate('ERROR_MESSAGE.EMAIL_REQUIRED'));
        return false;
      }
      if (!result.success) {
        setValidateEmailError(translate('ERROR_MESSAGE.EMAIL_INVALID'));
        return false;
      } else setValidateEmailError('');
      return true;
    };

    useEffect(() => {
      validateEmail(emailValue);
    }, [emailValue]);

    useImperativeHandle(ref, () => ({
      present: handlePresentModalPress,
      close: handleCloseModal,
    }));

    return (
      <View className="">
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          enableDynamicSizing={true}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
            />
          )}
          // eslint-disable-next-line react-native/no-inline-styles
          handleStyle={{
            paddingTop: 8,
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          handleIndicatorStyle={{
            backgroundColor: '#EBEBEB',
            width: 48,
            height: 6,
          }}
        >
          <BottomSheetView className="items-center">
            <View className="mb-5 w-full">
              <View className="relative items-center px-4 pb-3">
                <Text className="text-xl font-semibold leading-[1.6]">
                  {translate('AUTH.GET_CODE_BY')}
                </Text>
                <Pressable
                  className="absolute right-4 top-0"
                  onPress={() => bottomSheetModalRef.current?.close()}
                >
                  <Close width={32} height={32} />
                </Pressable>
              </View>
              <View className="px-6">
                <View className="mt-6 flex flex-col gap-6">
                  {ANOTHER_METHODS.map((method, index) => (
                    <Pressable
                      key={index}
                      onPress={() => {
                        setSelectedValue(method.value);
                      }}
                      className={clsx(
                        'flex flex-row items-center justify-between rounded-xl border border-gray-ebe p-4',
                        {
                          'border-b-0 rounded-b-none':
                            selectedValue === METHOD.email &&
                            method.value === METHOD.email,
                        }
                      )}
                    >
                      <Text className="text-base leading-[24px]">
                        {translate(`AUTH.${method.name}` as TxKeyPath)}
                      </Text>
                      <RadioButton checked={selectedValue === method.value} />
                    </Pressable>
                  ))}
                </View>
                {selectedValue === METHOD.email && (
                  <Fragment>
                    <View className="rounded-b-xl border-x border-gray-ebe">
                      <TextInputWithLabel
                        autoFocus
                        placeholder={translate('AUTH.ENTER_YOUR_EMAIL_ADDRESS')}
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.nativeEvent.text)}
                      />
                    </View>
                    {validateEmailError && (
                      <Text className="error-message text-start">
                        {validateEmailError}
                      </Text>
                    )}
                  </Fragment>
                )}
                <Button
                  onPress={() => {
                    if (selectedValue === METHOD.email) {
                      if (!validateEmail(emailValue)) return;
                      onSubmit(selectedValue, emailValue);
                    } else if (selectedValue === METHOD.phoneCall) {
                      onSubmit(selectedValue, '');
                    } else return;
                    bottomSheetModalRef.current?.close();
                  }}
                  className="mb-6 mt-16 h-12 rounded-xl bg-primary"
                  label={translate('AUTH.CONTINUE')}
                  textClassName="font-normal"
                />
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    );
  }
);

export default GetCodeByBottomSheet;
