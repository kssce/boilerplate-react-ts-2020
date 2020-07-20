import { DEVICE_TOKEN_KEY } from '../constants/common';
import { callNativeFunc, NativeModule } from '../helpers/nativeBridge';
import { setItemFromLocalStorage } from '../helpers/localStorage';

export default function useInitDeviceToken() {
  (window as any).setDeviceToken = (deviceToken: string) => {
    setItemFromLocalStorage(DEVICE_TOKEN_KEY, deviceToken);
  };

  callNativeFunc(NativeModule.DEVICE_TOKEN);
}
