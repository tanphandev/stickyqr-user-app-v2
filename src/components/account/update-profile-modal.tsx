import * as React from 'react';

import { useSelectedLanguage } from '@/core';
import { translate } from '@/core';
import type { Language } from '@/core/i18n/resources';
import type { Option } from '@/ui';
import { Options, useModal } from '@/ui';

export const UpdateProfileModal = () => {
  const { language, setLanguage } = useSelectedLanguage();
  const modal = useModal();
  const onSelect = React.useCallback(
    (option: Option) => {
      setLanguage(option.value as Language);
      modal.dismiss();
    },
    [setLanguage, modal]
  );

  const langs = React.useMemo(
    () => [
      { label: translate('SETTING.ENGLISH'), value: 'en' },
      { label: translate('SETTING.VIETNAMESE'), value: 'vi' },
    ],
    []
  );

  const selectedLanguage = React.useMemo(
    () => langs.find((lang) => lang.value === language),
    [language, langs]
  );

  return (
    <>
      <Options
        ref={modal.ref}
        options={langs}
        onSelect={onSelect}
        value={selectedLanguage?.value}
      />
    </>
  );
};
