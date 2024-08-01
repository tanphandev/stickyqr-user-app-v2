import Camera from 'assets/account/camera.svg';
import HistoryIcon from 'assets/account/history.svg';
import Notification from 'assets/account/notification.svg';
import PersonIcon from 'assets/account/person.svg';
import RefIcon from 'assets/account/ref.svg';
import VoucherIcon from 'assets/account/voucher.svg';
import React from 'react';
import { Image, ScrollView, Text } from 'react-native';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { translate, useAuth } from '@/core';
import { FocusAwareStatusBar, Pressable, View } from '@/ui';

export default function AccountScreen() {
  const signOut = useAuth.use.signOut();
  const onPressPersonalInformation = () => {
    console.log('go to profile');
  };
  const onPressReferAndEarn = () => {
    console.log('go to ref');
  };
  const onPressHistory = () => {
    console.log('go to history');
  };
  const onPressMyVoucher = () => {
    console.log('go to my voucher');
  };
  const onPressNotification = () => {
    console.log('go to notification');
  };

  const onPressUpdateAvatar = () => {
    console.log('update avatar');
  };
  const mockData = {
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
  };
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="flex-1 px-4 pt-16">
          <Text className="text-center text-xl font-bold">
            {translate('ACCOUNT.ACCOUNT')}
          </Text>
          <View className="my-6 items-center">
            <Image
              source={{
                uri: mockData.avatar.file,
              }}
              className="relative h-24 w-24 rounded-full"
            />
            <Pressable
              className="absolute bottom-14 right-44 h-8 w-8 items-center justify-center rounded-full bg-[#0000008F] p-1"
              onPress={onPressUpdateAvatar}
            >
              <Camera className="h-6 w-6" />
            </Pressable>
            <Text className="my-4 text-xl font-semibold">
              {mockData.displayName}
            </Text>
          </View>
          <View>
            <ItemsContainer
              title="ACCOUNT.MANAGE_ACCOUNT"
              titleClassName="uppercase font-semibold text-sm leading-[24px]"
              childrenClassName="border-0"
              containerClassName="mb-6"
            >
              <View>
                <View className="border-b border-neutral-200 py-2">
                  <Item
                    text="ACCOUNT.PERSONAL_INFORMATION"
                    onPress={onPressPersonalInformation}
                    icon={<PersonIcon />}
                  />
                </View>
                <View className="border-b border-neutral-200 py-2">
                  <Item
                    text="ACCOUNT.REFER_AND_EARN"
                    onPress={onPressReferAndEarn}
                    icon={<RefIcon />}
                  />
                </View>
              </View>
              <View className="border-b border-neutral-200 py-2">
                <Item
                  text="ACCOUNT.HISTORY"
                  onPress={onPressHistory}
                  icon={<HistoryIcon />}
                />
              </View>
              <View className="border-b border-neutral-200 py-2">
                <Item
                  text="ACCOUNT.MY_VOUCHERS"
                  onPress={onPressMyVoucher}
                  icon={<VoucherIcon />}
                />
              </View>
            </ItemsContainer>
            <ItemsContainer
              title="ACCOUNT.SETTING"
              titleClassName="uppercase font-semibold text-sm leading-[24px]"
              childrenClassName="border-0"
              containerClassName="mb-6"
            >
              <View>
                <View className="border-b border-neutral-200 py-2">
                  <LanguageItem />
                </View>
                <View className="border-b border-neutral-200 py-2">
                  <Item
                    text="ACCOUNT.NOTIFICATONS"
                    onPress={onPressNotification}
                    icon={<Notification />}
                  />
                </View>
              </View>
            </ItemsContainer>
          </View>
          <View className="my-8">
            <Pressable onPress={signOut}>
              <Text className="text-base font-semibold underline">
                {translate('AUTH.SIGN_OUT')}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
