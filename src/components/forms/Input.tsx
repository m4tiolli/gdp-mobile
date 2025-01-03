import { View, Text, KeyboardTypeOptions } from 'react-native'
import React from 'react'
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form'
import { Input as InputBase } from '../Input'

export interface IInput {
  control: Control<FieldValues, any>,
  errors: FieldErrors<FieldValues>,
  name: string,
  keyboardType?: KeyboardTypeOptions,
  placeholder: string,
  label: string,
  onBlur?: () => void
}

const Input = ({ control, errors, name, keyboardType, placeholder, label, onBlur }: IInput) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View>
          <InputBase
            keyboardType={keyboardType}
            onEndEditing={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            label={label}
          />
          {errors.email && <Text className='text-red'>{errors.email.message as React.ReactNode}</Text>}
        </View>
      )}
    />
  )
}

export default Input