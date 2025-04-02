import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './AuthLocal.types';

type AuthLocalModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class AuthLocalModule extends NativeModule<AuthLocalModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(AuthLocalModule);
