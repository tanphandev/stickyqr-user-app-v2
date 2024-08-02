import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { translate } from '@/core/i18n';
import type { CheckUserData } from '@/types/auth';
import { Button } from '@/ui';

type Props = {
  checkUserData: CheckUserData;
  nextStep: (step: any) => void;
};

function SetPasswordStep({ checkUserData, nextStep }: Props) {
  console.log('nextStep', nextStep);

  // const onSubmit = (data: any) => {
  //   console.log('OTP Input', data);
  // };
  return (
    <View className="flex flex-1 flex-col justify-between px-8">
      <View>
        <Text className="mb-6 mt-9 text-center text-xl font-semibold">
          {translate('AUTH.VERIFICATION_CODE')}
        </Text>
        <Text className="text-center text-base leading-[24px]">
          {translate('AUTH.ENTER_THE_CODE_WE_SENT_OVER_SMS_TO')}
        </Text>
        <Text className="text-center text-base leading-[24px]">
          +{checkUserData?.phoneCode! + checkUserData?.phone!}
        </Text>
        {/* <OTPInput onSubmit={onSubmit} /> */}
        <View className="flex flex-row items-center justify-center gap-1">
          <Text>{translate("AUTH.DIDN'T_RECEIVE_A_CODE")}</Text>
          <Pressable>
            <Text className="text-blue-344 underline">
              {translate('AUTH.USE_ANOTHER_METHOD')}
            </Text>
          </Pressable>
        </View>
      </View>
      <Button
        className="mb-10 mt-0 h-12 rounded-lg bg-primary"
        label={translate('AUTH.VERIFY')}
        textClassName="font-normal"
      />
    </View>
  );
}

export default SetPasswordStep;
