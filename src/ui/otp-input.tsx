// import clsx from 'clsx';
// import React, { useRef } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import { Pressable, Text, TextInput, View } from 'react-native';

// interface OTPInputProps {
//   onSubmit: (data: string) => void;
// }

// interface OTPFormData {
//   otp: string[];
// }

// // eslint-disable-next-line max-lines-per-function
// const OTPInput: React.FC<OTPInputProps> = ({ onSubmit }) => {
//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//     setValue,
//     getValues,
//   } = useForm<OTPFormData>({
//     mode: 'onChange',
//     defaultValues: {
//       otp: ['', '', '', '', '', ''],
//     },
//   });

//   const inputRefs = useRef<(TextInput | null)[]>([]);

//   const handleChange = (value: string, index: number) => {
//     const currentOTP = getValues('otp');
//     currentOTP[index] = value;
//     setValue('otp', currentOTP, { shouldValidate: true });
//     if (value.length === 1 && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyPress = (e: any, index: number) => {
//     const currentOTP = getValues('otp');
//     if (e.nativeEvent.key === 'Backspace') {
//       if (currentOTP[index] === '') {
//         if (index > 0) {
//           inputRefs.current[index - 1]?.focus();
//           currentOTP[index - 1] = '';
//           setValue('otp', currentOTP, { shouldValidate: true });
//         }
//       } else {
//         currentOTP[index] = '';
//         setValue('otp', currentOTP, { shouldValidate: true });
//       }
//     }
//   };

//   const onSubmitOTP = (data: OTPFormData) => {
//     const otp = data.otp.join('');
//     onSubmit(otp);
//   };

//   return (
//     <View className="p-4">
//       <Text className="mb-4 text-lg">Enter the OTP sent to your phone</Text>
//       <View className="flex flex-row justify-between space-x-2">
//         {Array.from({ length: 6 }, (_, i) => (
//           <Controller
//             key={i}
//             control={control}
//             name={`otp[${i}]`}
//             rules={{
//               required: 'All fields are required',
//               validate: (value) =>
//                 value.trim() !== '' || 'All fields are required',
//             }}
//             render={({ field: { onChange, onBlur, value } }) => {
//               console.log('value', value);
//               return (
//                 <TextInput
//                   ref={(ref) => (inputRefs.current[i] = ref)}
//                   className={clsx(
//                     'h-12 w-12 rounded border text-center',
//                     errors.otp ? 'border-red-500' : 'border-gray-300'
//                   )}
//                   onBlur={onBlur}
//                   onChangeText={(value) => handleChange(value, i)}
//                   value={value}
//                   keyboardType="number-pad"
//                   maxLength={1}
//                   onKeyPress={(e) => handleKeyPress(e, i)}
//                 />
//               );
//             }}
//           />
//         ))}
//       </View>
//       {errors.otp && (
//         <Text className="mt-2 text-red-500">{errors.otp.message}</Text>
//       )}
//       <Pressable
//         className="mt-4 rounded bg-blue-500 p-2"
//         onPress={handleSubmit(onSubmitOTP)}
//       >
//         <Text className="text-white">Submit</Text>
//       </Pressable>
//     </View>
//   );
// };

// export default OTPInput;
