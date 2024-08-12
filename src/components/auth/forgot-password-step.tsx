/* eslint-disable react/react-in-jsx-scope */
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import type { SharedDataForm } from '@/api/auth/type';
import { useForgotPassword } from '@/api/auth/use-forgot-password';
import PhoneForm from '@/components/form/phone-form';
import { translate } from '@/core/i18n';
import { logger } from '@/helper';
import { findCountry } from '@/helper/country';
import type { CheckUserData } from '@/types/auth';
import { AuthStepList } from '@/types/auth';

type Props = {
  checkUserData: CheckUserData | null;
  setCheckUserData: React.Dispatch<React.SetStateAction<CheckUserData | null>>;
  setSharedDataForm: React.Dispatch<
    React.SetStateAction<SharedDataForm | null>
  >;
  nextStep: (step: AuthStepList) => void;
};

function ForgotPasswordStep({
  checkUserData,
  setCheckUserData,
  setSharedDataForm,
  nextStep,
}: Props) {
  const { mutateAsync: forgotPassword } = useForgotPassword();

  const onSubmit = async (data: any, countrySelected: any) => {
    try {
      const phoneNumber = '+' + countrySelected.phoneCode + data.phone;
      const resData = await forgotPassword({ phone: phoneNumber });
      setCheckUserData((prev) => ({
        ...prev,
        phone: data.phone,
        phoneCode: countrySelected.phoneCode,
        isoCode: countrySelected.isoCode,
      }));
      setSharedDataForm({ id: resData.id });
      nextStep(AuthStepList.ForgotPasswordVerify);
    } catch (error: any) {
      if (error?.statusCode === 404) {
        Toast.show({
          type: 'error',
          text1: translate('ERROR_MESSAGE.USER_NOT_FOUND'),
        });
      }
      logger('log', '[ApiService]-[ForgotPassword]-[Error]', error);
    }
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
        submitButtonCalssName="h-12 mt-0 rounded-lg bg-primary"
        onSubmit={onSubmit}
      />
    </View>
  );
}

export default ForgotPasswordStep;
