import React, { useState } from 'react';
import { Control, FieldValues, FieldErrors, Controller } from 'react-hook-form';
import { TouchableOpacity, Text, View } from 'react-native';
import * as Base from 'react-native-date-picker';

export interface IDatePicker {
  control: Control<FieldValues, any>;
  errors: FieldErrors<FieldValues>;
  name: string;
  placeholder: string;
  label: string;
}

const formatDate = (date: Date | null) => {
  if (!date) return '';
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const DatePicker = ({ control, errors, name, placeholder, label }: IDatePicker) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View className="flex flex-col gap-1.5">
          {label && (
            <Text className="text-base text-primary">
              {label}
            </Text>
          )}
          <TouchableOpacity
            className="border border-input py-2.5 px-4 rounded-lg bg-white"
            onPress={() => setOpen(true)}
          >
            <Text className="text-primary">
              {value ? formatDate(new Date(value)) : placeholder}
            </Text>
          </TouchableOpacity>
          <Base.default
            modal
            locale="pt-BR"
            mode="date"
            open={open}
            date={value ? new Date(value) : new Date()}
            onConfirm={(date) => {
              setOpen(false);
              onChange(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          {errors[name] && (
            <Text className="text-red">{errors[name]?.message as React.ReactNode}</Text>
          )}
        </View>
      )}
    />
  );
};

export default DatePicker;
