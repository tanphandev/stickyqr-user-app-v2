import ArrowDown from 'assets/actions/arrow-down.svg';
import BackIcon from 'assets/actions/arrow-left-2.svg';
import SearchIcon from 'assets/actions/search-icon.svg';
import XmarkBlack from 'assets/actions/xmark-black-icon.svg';
import XmarkIcon from 'assets/actions/xmark-gray-icon.svg';
import clsx from 'clsx';
import { PhoneNumberUtil } from 'google-libphonenumber';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import type { Country } from '@/configs/country';
import { countryList } from '@/configs/country';
import { defaultCountry as dfCountry } from '@/configs/country';
import { ERROR_KEY } from '@/constants/error-key';
import type { TxKeyPath } from '@/core/i18n';
import { translate } from '@/core/i18n';

import RadioButton from './radio-button';

const phoneUtil = PhoneNumberUtil.getInstance();

export type PhoneInputRef = {
  selectedCountry: Country;
};

type Props = {
  phoneLabel: string;
  phonePlaceholder?: string;
  name: string;
  defaultCountry: Country | null;
  control: any;
  allowEditPhone?: boolean;
  phoneError: any;
  errorApi?: string;
  clearErrorApi?: (error: string) => void;
};

// eslint-disable-next-line max-lines-per-function
const PhoneInput = forwardRef<PhoneInputRef, Props>(function Component(
  {
    phoneLabel,
    phonePlaceholder,
    name,
    defaultCountry,
    control,
    allowEditPhone = true,
    phoneError,
    errorApi,
    clearErrorApi,
  },
  ref
) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    defaultCountry || dfCountry
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const renderItem = ({ item }: { item: Country }) => (
    <Pressable
      className="flex-row items-center border-b border-gray-300 p-2"
      onPress={() => {
        setSelectedCountry(item);
        setModalVisible(false);
      }}
    >
      <Text className="text-2xl">{item.flag}</Text>
      <Text className="ml-2 text-base">
        {item.name} (+{item.phoneCode})
      </Text>
      <View className="ml-auto">
        <RadioButton
          checked={
            selectedCountry.isoCode + selectedCountry.phoneCode ===
            item.isoCode + item.phoneCode
          }
        />
      </View>
    </Pressable>
  );

  const normalizedSearchQuery = searchQuery.replace('+', '');

  const filteredCountries = countryList.filter(
    (country) =>
      country.name
        .toLowerCase()
        .startsWith(normalizedSearchQuery.toLowerCase()) ||
      country.phoneCode.startsWith(normalizedSearchQuery) ||
      country.phoneCode.replaceAll('-', '').startsWith(normalizedSearchQuery)
  );

  useImperativeHandle(ref, () => ({
    selectedCountry,
  }));
  return (
    <View>
      <Text className="mb-2 text-base font-light">{phoneLabel}</Text>
      <View
        className={clsx(
          'flex-row items-center rounded-xl border border-gray-ebe',
          {
            'border-red-ff0': phoneError,
            'border-black': isFocused && !phoneError,
          }
        )}
      >
        <TouchableOpacity
          className="flex-row items-center pl-3"
          onPress={() => {
            if (allowEditPhone) {
              setModalVisible(true);
            }
          }}
          disabled={!allowEditPhone}
        >
          <Text className="text-2xl">{selectedCountry.flag}</Text>
          <Text className="ml-1 text-lg">
            +{selectedCountry.phoneCode.replaceAll('-', '')}
          </Text>
          <View className="px-[2px]">
            <ArrowDown width={18} height={18} />
          </View>
        </TouchableOpacity>
        <View className="flex flex-1 flex-row items-center">
          <Controller
            control={control}
            rules={{
              required: ERROR_KEY.PHONE_REQUIRED,
              validate: (value) => {
                try {
                  const number = phoneUtil.parse(
                    value,
                    selectedCountry.isoCode
                  );
                  const isValidNumber = phoneUtil.isValidNumber(number);
                  if (!isValidNumber) {
                    return ERROR_KEY.PHONE_INVALID;
                  }
                  return true;
                } catch (error) {
                  return ERROR_KEY.PHONE_INVALID;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="flex h-12 flex-1 flex-row items-center">
                <TextInput
                  className={`mb-[6px] flex-1 text-lg`}
                  onBlur={() => {
                    onBlur();
                    setIsFocused(false); // Set isFocused to false on blur
                  }}
                  onChangeText={(value) => {
                    onChange(value);
                    clearErrorApi?.('');
                  }}
                  onFocus={() => {
                    if (allowEditPhone) {
                      setIsFocused(true);
                    }
                  }}
                  value={value}
                  placeholder={phonePlaceholder}
                  editable={allowEditPhone}
                  keyboardType="phone-pad"
                />
                {value.length > 0 && allowEditPhone && (
                  <Pressable onPress={() => onChange('')} className="pl-1 pr-2">
                    <XmarkIcon width={24} height={24} />
                  </Pressable>
                )}
              </View>
            )}
            name={name}
          />
        </View>
      </View>
      {(errorApi || phoneError) && (
        <Text className="error-message self-start">
          {errorApi
            ? errorApi
            : translate(`ERROR_MESSAGE.${phoneError.message}` as TxKeyPath)}
        </Text>
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="mt-10 flex-1 justify-center p-4">
          <View>
            <View className="flex flex-row items-center justify-between">
              <Pressable
                onPress={() => setModalVisible(false)}
                className="py-2 pr-2"
              >
                <BackIcon width={24} height={24} className="" />
              </Pressable>
              <Text className="text-xl font-semibold">
                {translate('AUTH.SELECT')}
              </Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                className="py-2 pl-2"
              >
                <XmarkBlack width={26} height={26} />
              </Pressable>
            </View>
            <View className="mb-2 flex flex-row items-center justify-center rounded-xl bg-black/[0.08]">
              <View className="px-3">
                <SearchIcon width={20} height={20} />
              </View>
              <TextInput
                className="h-10 flex-1"
                placeholder="Search country"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <View className="px-[6px]">
                    <XmarkIcon width={24} height={24} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {filteredCountries.length > 0 ? (
            <FlatList
              data={filteredCountries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          ) : (
            <View className="flex-1">
              <Text className="mt-4 text-center text-base font-normal">
                {translate('AUTH.NOT_FOUND')}
              </Text>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
});

export default PhoneInput;
