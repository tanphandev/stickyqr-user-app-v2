/* eslint-disable react/react-in-jsx-scope */
import { Text, View } from 'react-native';

import { translate } from '@/core/i18n';
import { findCountry } from '@/helper/country';
import type { AuthStepList, CheckUserData } from '@/types/auth';
import PhoneForm from '@/ui/form/phone-form';

type Props = {
  checkUserData: CheckUserData | null;
  nextStep: (step: AuthStepList) => void;
  setCheckUserData: (data: CheckUserData) => void;
};

function ForgotPasswordStep({
  checkUserData,
  setCheckUserData,
  nextStep,
}: Props) {
  const onSubmit = async (data: any, countrySelected: any) => {
    const phoneNumber = '+' + countrySelected.phoneCode + data.phone;
    console.log('data', phoneNumber);
    console.log('setCheckUserData', setCheckUserData);
    console.log('nextStep', nextStep);
  };

  return (
    <View className="flex flex-1 flex-col">
      <Text className="mb-6 mt-9 text-center text-xl font-semibold">
        {translate('AUTH.FORGOT_PASSWORD')}
      </Text>
      <PhoneForm
        defaultForm={{
          phone: checkUserData?.phone ?? '',
        }}
        phoneLabel={translate('AUTH.PHONE_NUMBER')}
        phonePlaceholder={translate('AUTH.PHONE_NUMBER')}
        submitLabel={translate('AUTH.NEXT')}
        scanLabel={translate('AUTH.SCAN_QR')}
        defaultCountry={findCountry(
          checkUserData?.isoCode!,
          checkUserData?.phoneCode!
        )}
        containterClassName="px-8"
        submitButtonCalssName="h-12 mt-0 mb-10 rounded-lg bg-primary"
        onSubmit={onSubmit}
      />
    </View>
  );
}

export default ForgotPasswordStep;
