import AddIcon from 'assets/account/add.svg';
import EditIcon from 'assets/account/edit.svg';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text } from 'react-native';

import { UpdateAddressModal } from '@/components/account/update-address-modal';
import { UpdateGenderModal } from '@/components/account/update-gender-modal';
import { UpdateNameModal } from '@/components/account/update-name-modal';
import { UpdatePasswordModal } from '@/components/account/update-password-modal';
import { translate } from '@/core';
import type { Address } from '@/types/profile.type';
import { FocusAwareStatusBar, Modal, useModal, View } from '@/ui';
import { ArrowLeft } from '@/ui/icons/arrow-left';

export default function ProfileScreen() {
  const router = useRouter();
  const { ref, present, dismiss } = useModal();
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [titleModal, setTitleModal] = useState('');
  const [snapPointsModal, setSnapPointsModal] = useState<string[]>([]);
  const [profile, setProfile] = useState({
    id: 'clwpu3htm000zj2031t758myj',
    avatar: {
      id: 'cly73kya2000211xhcmaa8v54',
      publicId: 'clwpu3htm000zj2031t758myj/media/nmxDMWj0KdV27PoyonIEu',
      file: 'https://stickyqr-dev.s3.ap-southeast-1.amazonaws.com/clwpu3htm000zj2031t758myj/media/nmxDMWj0KdV27PoyonIEu',
      mimetype: 'application/octet-stream',
      size: 69767,
      format: null,
      name: 'sticky_qr_user_2024-07-04-10:02:02.842718Z',
      version: null,
      thumbnail: null,
      businessId: null,
      createdAt: '2024-07-04T10:02:04.929Z',
      updatedAt: '2024-07-04T10:02:04.929Z',
      authorId: 'clwpu3htm000zj2031t758myj',
      announcementId: null,
      announcementThumbId: null,
      offerId: null,
    },
    firstName: null,
    lastName: null,
    displayName: 'Blackmeow',
    createdAt: '2024-05-28T03:24:46.714Z',
    updatedAt: '2024-08-01T09:04:04.420Z',
    username: null,
    email: 'yenle16032002+4@gmail.com',
    emailVerified: '2024-07-04T08:06:18.063Z',
    phone: '+84898200723',
    phoneVerified: null,
    totalPoints: 6,
    lifetimePoints: 2256,
    avatarId: 'cly73kya2000211xhcmaa8v54',
    isActive: true,
    language: 'vi',
    gender: 'f',
    address: {
      id: 'clx2k8uu6000kxuaqiwx55050',
      createdAt: '2024-06-06T01:10:00.991Z',
      updatedAt: '2024-07-04T08:09:14.091Z',
      street: '',
      city: '',
      state: '',
      country: null,
      lat: null,
      lng: null,
      zipCode: '',
    },
    dateOfBirth: '06-10',
    timeZone: 'Asia/Ho_Chi_Minh',
  });

  const handleBackToAccount = () => {
    router.back();
  };

  const onOpenBottomSheet = (field: string) => {
    switch (field) {
      case 'displayName':
        setTitleModal('UPDATE NAME');
        setSnapPointsModal(['30%']);
        setModalContent(
          <UpdateNameModal
            type="displayName"
            initialValue={profile.displayName}
            handleUpdateProfile={(type, newName) =>
              handleUpdateProfile(type, newName)
            }
          />
        );
        present();
        break;
      case 'address':
        setTitleModal('UPDATE ADDRESS');
        setSnapPointsModal(['60%']);
        setModalContent(
          <UpdateAddressModal
            type="address"
            initialValue={profile.address as unknown as Address}
            handleUpdateProfile={(type, newAddress) =>
              handleUpdateProfile(type, newAddress)
            }
          />
        );
        present();
        break;
      case 'gender':
        setTitleModal('UPDATE GENDER');
        setSnapPointsModal(['40%']);
        setModalContent(
          <UpdateGenderModal
            type="gender"
            initialValue={profile.gender}
            handleUpdateProfile={(type, newGender) =>
              handleUpdateProfile(type, newGender)
            }
          />
        );
        present();
        break;
      case 'password':
        setTitleModal('UPDATE PASSWORD');
        setSnapPointsModal(['50%']);
        setModalContent(
          <UpdatePasswordModal
            type="password"
            handleUpdateProfile={(currentPassword, newPassword) =>
              console.log('update password', currentPassword, newPassword)
            }
          />
        );
        present();
        break;
      default:
        break;
    }
  };

  const formatAddress = (address: any) => {
    const { street, city, state, country, zipCode } = address;
    const addressParts = [street, city, state, country, zipCode].filter(
      Boolean
    );
    return addressParts.join(', ');
  };

  const getAddress = () => {
    if (profile?.address && formatAddress(profile.address)) {
      return formatAddress(profile.address);
    }
    return null;
  };

  const getGender = (gender: string) => {
    switch (gender) {
      case 'm':
        return `${translate('ACCOUNT.MALE')}`;
      case 'f':
        return `${translate('ACCOUNT.FEMALE')}`;
      default:
        return `${translate('ACCOUNT.OTHER')}`;
    }
  };

  const handleUpdateProfile = (type: string, value: any) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [type]: value,
    }));
    dismiss();
  };
  return (
    <>
      <View className="flex-1">
        <FocusAwareStatusBar />
        <ScrollView>
          <View className="flex flex-row items-center px-4 pb-3 pt-16">
            <Pressable onPress={handleBackToAccount}>
              <ArrowLeft />
            </Pressable>
            <Text className="flex-1 text-center text-xl font-bold">
              {translate('ACCOUNT.PERSONAL_INFORMATION')}
            </Text>
          </View>
          <View className="px-4 py-6">
            <View className="mb-4 border-b border-neutral-200 pb-3">
              <Text className="text-sm font-normal text-[#7D7D7D]">
                {translate('ACCOUNT.YOUR_NAME')}
              </Text>
              <View className="flex flex-row items-center justify-between py-2">
                {profile.displayName ? (
                  <>
                    <Text className="leading-6">{profile.displayName}</Text>
                    <Pressable onPress={() => onOpenBottomSheet('displayName')}>
                      <EditIcon />
                    </Pressable>
                  </>
                ) : (
                  <>
                    <Text className="leading-6 text-[#999CA0]">
                      {translate('ACCOUNT.NOT_UPDATED_YET')}
                    </Text>
                    <Pressable onPress={() => onOpenBottomSheet('displayName')}>
                      <AddIcon />
                    </Pressable>
                  </>
                )}
              </View>
            </View>

            <View className="mb-4 border-b border-neutral-200 pb-3">
              <Text className="text-sm font-normal text-[#7D7D7D]">
                {translate('ACCOUNT.PHONE_NUMBER')}
              </Text>
              <View className="flex flex-row items-center justify-between py-2">
                <Text className="leading-6">{profile.phone}</Text>
              </View>
            </View>
            <View className="mb-4 border-b border-neutral-200 pb-3">
              <Text className="text-sm font-normal text-[#7D7D7D]">
                {translate('ACCOUNT.EMAIL')}
              </Text>
              <View className="flex flex-row items-center justify-between py-2">
                {profile.email ? (
                  <>
                    <Text className="leading-6">{profile.email}</Text>
                  </>
                ) : (
                  <>
                    <Text className="leading-6 text-[#999CA0]">
                      {translate('ACCOUNT.NOT_UPDATED_YET')}
                    </Text>
                    <Pressable onPress={() => onOpenBottomSheet('email')}>
                      <AddIcon />
                    </Pressable>
                  </>
                )}
              </View>
            </View>
            <View className="mb-4 border-b border-neutral-200 pb-3">
              <Text className="text-sm font-normal text-[#7D7D7D]">
                {translate('ACCOUNT.ADDRESS')}
              </Text>
              <View className="flex flex-row items-center justify-between py-2">
                {getAddress() ? (
                  <Text className="leading-6">{getAddress()}</Text>
                ) : (
                  <Text className="leading-6 text-[#999CA0]">
                    {translate('ACCOUNT.NOT_UPDATED_YET')}
                  </Text>
                )}
                <Pressable onPress={() => onOpenBottomSheet('address')}>
                  <EditIcon />
                </Pressable>
              </View>
            </View>
            <View className="mb-4 border-b border-neutral-200 pb-3">
              <Text className="text-sm font-normal text-[#7D7D7D]">
                {translate('ACCOUNT.GENDER')}
              </Text>
              <View className="flex flex-row items-center justify-between py-2">
                {profile.gender ? (
                  <Text className="leading-6">{getGender(profile.gender)}</Text>
                ) : (
                  <Text className="leading-6 text-[#999CA0]">
                    {translate('ACCOUNT.NOT_UPDATED_YET')}
                  </Text>
                )}
                <Pressable onPress={() => onOpenBottomSheet('gender')}>
                  <EditIcon />
                </Pressable>
              </View>
            </View>
            <View className="mb-4 border-b border-neutral-200 pb-3">
              <Text className="text-sm font-normal text-[#7D7D7D]">
                {translate('ACCOUNT.PASSWORD')}
              </Text>
              <View className="flex flex-row items-center justify-between py-2">
                <Text className="leading-6 text-black">•••••••••</Text>
                <Pressable onPress={() => onOpenBottomSheet('password')}>
                  <EditIcon />
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <Modal
        ref={ref}
        title={titleModal}
        snapPoints={snapPointsModal}
        classNameTitle="text-[18px] leading-[24px] font-semibold py-3"
      >
        {modalContent}
      </Modal>
    </>
  );
}
