import { requireNativeView } from 'expo';
import * as React from 'react';

import { AuthLocalViewProps } from './AuthLocal.types';

const NativeView: React.ComponentType<AuthLocalViewProps> =
  requireNativeView('AuthLocal');

export default function AuthLocalView(props: AuthLocalViewProps) {
  return <NativeView {...props} />;
}
