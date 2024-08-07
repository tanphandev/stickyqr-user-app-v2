import Logo from 'assets/brand/logo.svg';
import React from 'react';
import { Text, View } from 'react-native';

import type { CheckUser } from '@/api/auth/type';
import { useCheckPhone } from '@/api/auth/use-check-phone';
import { type Country } from '@/configs/country';
import { translate } from '@/core/i18n/utils';
import { logger } from '@/helper';
import { findCountry } from '@/helper/country';
import { AuthStepList } from '@/types/auth';
import { type CheckUserData } from '@/types/auth';
import type { PhoneFormSchemaType } from '@/ui/form/phone-form';
import PhoneForm from '@/ui/form/phone-form';

type Props = {
  checkUserData: CheckUserData | null;
  nextStep: (step: AuthStepList) => void;
  setCheckUserData: (data: CheckUserData) => void;
};

// eslint-disable-next-line max-lines-per-function
function CheckPhoneStep({ checkUserData, nextStep, setCheckUserData }: Props) {
  // state
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  // query
  const { mutateAsync: checkPhone } = useCheckPhone();

  /* onSubmit */
  const onSubmit = async (
    data: PhoneFormSchemaType,
    countrySelected: Country
  ) => {
    const userPhone = '+' + countrySelected.phoneCode + data.phone;

    try {
      const user: CheckUser = await checkPhone({
        phone: userPhone,
      });
      logger('log', '[ApiService]-[CheckPhone]-[Data]', user);
      if (user) {
        setCheckUserData({
          ...user,
          phone: data.phone,
          phoneCode: countrySelected.phoneCode,
          isoCode: countrySelected.isoCode,
        });
      }
      if (!user.isSetPassword) {
        nextStep(AuthStepList.SetPassword);
      } else {
        nextStep(AuthStepList.SignIn);
      }
    } catch (error: any) {
      if (error?.statusCode === 404) {
        setErrorMessage(translate('ERROR_MESSAGE.SIGN_UP_WHEN_SCAN_QR'));
      } else {
        setErrorMessage(error?.message);
      }
      logger('log', '[ApiService]-[CheckPhone]-[Error]', error);
    }
  };

  /* onScanQR */
  const onScanQR = () => {};

  return (
    <View className="flex h-full flex-col">
      <View className="mt-[70px] items-center">
        <Logo width={200} height={48} />
      </View>
      <Text className="my-6 text-center text-2xl font-medium">
        {translate('AUTH.SIGN_IN_TO_STICKYQR')}
      </Text>
      <PhoneForm
        defaultForm={{
          phone: checkUserData?.phone ?? '',
        }}
        phoneLabel={translate('AUTH.ENTER_YOUR_PHONE_NUMBER')}
        phonePlaceholder={translate('AUTH.PHONE_NUMBER')}
        submitLabel={translate('AUTH.NEXT')}
        scanLabel={translate('AUTH.SCAN_QR')}
        defaultCountry={findCountry(
          checkUserData?.isoCode!,
          checkUserData?.phoneCode!
        )}
        errorApi={errorMessage}
        setApiError={setErrorMessage}
        containterClassName="px-8"
        submitButtonCalssName="h-12 mt-0 mb-4 rounded-lg bg-primary"
        secondaryButtonClassName="mb-10 mt-0 h-12 rounded-lg bg-white border"
        onSubmit={onSubmit}
        onScanQR={onScanQR}
      />
    </View>
  );
}

export default CheckPhoneStep;