import { NativeModule, requireNativeModule } from 'expo';

import { AuthLocalModuleEvents } from './AuthLocal.types';

declare class AuthLocalModule extends NativeModule<AuthLocalModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<AuthLocalModule>('AuthLocal');
