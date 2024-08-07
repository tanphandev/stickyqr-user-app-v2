import BackIcon from 'assets/actions/arrow-left-1.svg';
import React, { useState } from 'react';

import CheckPhoneStep from '@/components/auth/check-phone-step';
import ForgotPasswordStep from '@/components/auth/forgot-password-step';
import SetPasswordStep from '@/components/auth/set-password-step';
import SignInStep from '@/components/auth/sign-in-step';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { AuthStepList, type CheckUserData } from '@/types/auth';
import { FocusAwareStatusBar, Pressable, View } from '@/ui';

// eslint-disable-next-line max-lines-per-function
export default function GetStarted() {
  // state
  const [currentStep, setCurrentStep] = useState<AuthStepList>(
    AuthStepList.SetPassword
  );
  const [prevStep, setPrevStep] = useState<AuthStepList[]>([]);
  const [checkUserData, setCheckUserData] = useState<CheckUserData | null>(
    null
  );

  // keyboard effect
  useSoftKeyboardEffect();

  const nextStep = (step: AuthStepList) => {
    setPrevStep([...prevStep, currentStep]);
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
            nextStep={nextStep}
          />
        );
      case AuthStepList.SetPassword:
        return (
          <SetPasswordStep checkUserData={checkUserData!} nextStep={nextStep} />
        );
      default:
        return (
          <CheckPhoneStep
            nextStep={nextStep}
            checkUserData={checkUserData}
            setCheckUserData={setCheckUserData}
          />
        );
    }
  };
  return (
    <View>
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
