import { View, Text } from 'react-native'
import React from 'react'
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form'
import { Select as SelectBase } from '../Select'

export interface ISelect {
  control: Control<FieldValues, any>,
  errors: FieldErrors<FieldValues>,
  name: string,
  options: Array<{ label: string, id: number }>
  placeholder: string,
  label: string
}

const Select = ({ control, errors, name, options, placeholder, label }: ISelect) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View>
          <SelectBase
            onSelect={onChange}
            selectedValue={value}
            options={options}
            placeholder={placeholder}
            label={label}
            labelKey="label"
            valueKey="id"
          />
          {errors.email && <Text className='text-red'>{errors.email.message as React.ReactNode}</Text>}
        </View>
      )}
    />
  )
}

export default Select