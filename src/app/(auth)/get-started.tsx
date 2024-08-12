import BackIcon from 'assets/actions/arrow-left-1.svg';
import React, { useState } from 'react';

import type { SharedDataForm } from '@/api/auth/type';
import CheckPhoneStep from '@/components/auth/check-phone-step';
import ForgotPasswordStep from '@/components/auth/forgot-password-step';
import ForgotPasswordSuccessStep from '@/components/auth/forgot-password-success-step';
import ForgotPasswordVerifyStep from '@/components/auth/forgot-password-verify-step';
import NewPasswordStep from '@/components/auth/new-password-step';
import SetPasswordStep from '@/components/auth/set-password-step';
import SetPasswordVerifyStep from '@/components/auth/set-password-verify-step';
import SignInStep from '@/components/auth/sign-in-step';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { AuthStepList, type CheckUserData } from '@/types/auth';
import { FocusAwareStatusBar, Pressable, View } from '@/ui';

// eslint-disable-next-line max-lines-per-function
export default function GetStarted() {
  // state
  const [currentStep, setCurrentStep] = useState<AuthStepList>(
    AuthStepList.CheckPhone
  );
  const [prevStep, setPrevStep] = useState<AuthStepList[]>([]);
  const [checkUserData, setCheckUserData] = useState<CheckUserData | null>(
    null
  );
  const [sharedDataForm, setSharedDataForm] = useState<SharedDataForm | null>(
    null
  );

  // keyboard effect
  useSoftKeyboardEffect();

  const nextStep = (step: AuthStepList) => {
    if (step === AuthStepList.SignIn) {
      setPrevStep([AuthStepList.CheckPhone]);
    } else if (step === AuthStepList.ForgotPasswordSuccess) {
      setPrevStep([AuthStepList.CheckPhone, AuthStepList.SignIn]);
    } else {
      setPrevStep([...prevStep, currentStep]);
    }
    setCurrentStep(step);
  };

  /* render current step */
  const renderCurrentStep = (currentForm: AuthStepList) => {
    switch (currentForm) {
      case AuthStepList.CheckPhone:
        return (
          <CheckPhoneStep
            nextStep={nextStep}
            checkUserData={checkUserData}
            setCheckUserData={setCheckUserData}
            setSharedDataForm={setSharedDataForm}
          />
        );
      case AuthStepList.SignIn:
        return (
          <SignInStep nextStep={nextStep} checkUserData={checkUserData!} />
        );
      case AuthStepList.ForgotPassword:
        return (
          <ForgotPasswordStep
            checkUserData={checkUserData}
            setCheckUserData={setCheckUserData}
            setSharedDataForm={setSharedDataForm}
            nextStep={nextStep}
          />
        );
      case AuthStepList.ForgotPasswordVerify:
        return (
          <ForgotPasswordVerifyStep
            checkUserData={checkUserData!}
            sharedDataForm={sharedDataForm!}
            setSharedDataForm={setSharedDataForm}
            nextStep={nextStep}
          />
        );
      case AuthStepList.NewPassword:
        return (
          <NewPasswordStep
            sharedDataForm={sharedDataForm!}
            nextStep={nextStep}
          />
        );
      case AuthStepList.ForgotPasswordSuccess:
        return <ForgotPasswordSuccessStep nextStep={nextStep} />;
      case AuthStepList.SetPasswordVerify:
        return (
          <SetPasswordVerifyStep
            checkUserData={checkUserData!}
            sharedDataForm={sharedDataForm!}
            setSharedDataForm={setSharedDataForm}
            nextStep={nextStep}
          />
        );
      case AuthStepList.SetPassword:
        return (
          <SetPasswordStep
            checkUserData={checkUserData}
            sharedDataForm={sharedDataForm!}
          />
        );
      default:
        return (
          <CheckPhoneStep
            nextStep={nextStep}
            checkUserData={checkUserData}
            setCheckUserData={setCheckUserData}
            setSharedDataForm={setSharedDataForm}
          />
        );
    }
  };
  return (
    <View className="ios:pb-6 android:pb-12">
      <FocusAwareStatusBar />
      <View className="flex h-full flex-col">
        {prevStep.length > 0 && (
          <View className="mt-[10px] px-4">
            <Pressable
              onPress={() => {
                setCurrentStep(prevStep[prevStep.length - 1]);
                setPrevStep(prevStep.slice(0, prevStep.length - 1));
              }}
              className="w-6"
            >
              <BackIcon className="h-6 w-6 p-4" />
            </Pressable>
          </View>
        )}
        {renderCurrentStep(currentStep)}
      </View>
    </View>
  );
}
