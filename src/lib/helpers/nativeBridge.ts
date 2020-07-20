import { isAndroid, isIOS } from './mobileHelper';
import { setItemFromLocalStorage } from './localStorage';
import { DEVICE_TOKEN_KEY } from '../constants/common';

export enum NativeModule {
  SPEECH = 'speech',
  NW = 'getNwStatus',
  DEVICE_TOKEN = 'getDeviceToken',
}

export function callNativeFunc(moduleKey: NativeModule, arg?: any) {
  switch (moduleKey) {
    case NativeModule.SPEECH:
      speech(arg);
      break;

    case NativeModule.NW:
      // todo TBD
      break;

    case NativeModule.DEVICE_TOKEN:
      reqDeviceToken();
      break;

    default:
      break;
  }
}

function speech(text: string) {
  try {
    if (isAndroid()) {
      (window as any).native[NativeModule.SPEECH](text);
    } else if (isIOS()) {
      (window as any).webkit.messageHandlers[NativeModule.SPEECH].postMessage(
        text,
      );
    }
  } catch (err) {
    throw new Error('현재 기기에서 TTS 기능을 사용할 수 없습니다.');
  }
}

function reqDeviceToken() {
  try {
    if (isAndroid()) {
      (window as any).native[NativeModule.DEVICE_TOKEN]('');
    } else if (isIOS()) {
      (window as any).webkit.messageHandlers[
        NativeModule.DEVICE_TOKEN
      ].postMessage('');
    } else {
      setDeviceTokenFromBorwserToLocalStorage();
    }
  } catch (err) {
    throw new Error('현재 기기의 device token을 알아낼 수 없습니다.');
  }
}

function setDeviceTokenFromBorwserToLocalStorage() {
  setItemFromLocalStorage(DEVICE_TOKEN_KEY, 'device info from browser.');
}
