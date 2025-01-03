import { View, Text, KeyboardTypeOptions } from 'react-native'
import React from 'react'
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form'
import { MaskedInput as InputBase } from '../MaskedTextInput'
import { Mask } from 'react-native-mask-input'

export interface IInput {
  control: Control<FieldValues, any>,
  errors: FieldErrors<FieldValues>,
  name: string,
  keyboardType: KeyboardTypeOptions,
  placeholder: string,
  label: string,
  mask: Mask,
  onBlur: () => void
}

const MaskedInput = ({ control, errors, name, keyboardType, placeholder, label, mask, onBlur }: IInput) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View>
          <InputBase
            keyboardType={keyboardType}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            label={label}
            mask={mask}
            onEndEditing={onBlur}
          />
          {errors.email && <Text className='text-red'>{errors.email.message as React.ReactNode}</Text>}
        </View>
      )}
    />
  )
}

export default MaskedInput