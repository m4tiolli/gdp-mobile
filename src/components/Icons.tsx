import React from 'react';
import * as I from '@expo/vector-icons'
import { StyleProp, ViewStyle } from 'react-native';

export const Icons = {
  MaterialCommunityIcons: I.MaterialCommunityIcons,
  MaterialIcons: I.MaterialIcons,
  Ionicons: I.Ionicons,
  Feather: I.Feather,
  FontAwesome: I.FontAwesome,
  FontAwesome5: I.FontAwesome5,
  FontAwesome6: I.FontAwesome6,
  AntDesign: I.AntDesign,
  Entypo: I.Entypo,
  SimpleLineIcons: I.SimpleLineIcons,
  Octicons: I.Octicons,
  Foundation: I.Foundation,
  Fontisto: I.Fontisto,
  EvilIcons: I.EvilIcons,
  Zocial: I.Zocial
}


export interface IconProps {
  type: any;
  name: string;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const Icon = ({ type, name, color, size = 24, style }: IconProps) => {
  const fontSize = 24;
  const Tag = type;
  return (
    <>
      {type && name && (
        <Tag name={name} size={size || fontSize} color={color} style={style} />
      )}
    </>
  )
}

export default Icon