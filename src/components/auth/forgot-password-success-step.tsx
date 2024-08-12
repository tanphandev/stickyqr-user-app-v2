import successAnimation from 'assets/actions/success-1.json';
import clsx from 'clsx';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Text, View } from 'react-native';

import { translate } from '@/core/i18n';
import { AuthStepList } from '@/types/auth';
import { Button } from '@/ui';

type Props = {
  nextStep: (step: AuthStepList) => void;
};

function ForgotPasswordSuccessStep({ nextStep }: Props) {
  return (
    <View className="flex flex-1 flex-col justify-between px-8">
      <View>
        <View className="flex items-center">
          <LottieView
            source={successAnimation}
            autoPlay
            loop
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: 164,
              height: 164,
            }}
          />
        </View>
        <Text className="text-center font-semibold">
          {translate('AUTH.PASSWORD_HAS_BEEN_UPDATED')}
        </Text>
      </View>
      <View className="">
        <Button
          onPress={() => {
            nextStep(AuthStepList.SignIn);
          }}
          className="mt-0 h-12 rounded-xl bg-primary"
          label={translate('AUTH.BACK_TO_SIGN_IN')}
          textClassName={clsx('font-semibold')}
        />
      </View>
    </View>
  );
}

export default ForgotPasswordSuccessStep;
