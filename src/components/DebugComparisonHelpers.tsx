import React from 'react';
import { Text } from 'react-native';

export const DebugLine: React.FC<{ label: string; value?: string | number | boolean | null }> = ({
  label,
  value,
}) => {
  return <Text>{label}: {value === undefined ? '-' : String(value)}</Text>;
};

