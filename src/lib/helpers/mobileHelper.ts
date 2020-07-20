const MOBILE = Object.freeze({
  android: 'android',
  ios: 'ios',
  other: 'other',
});

const { android, ios, other } = MOBILE;

const DEVICES = Object.freeze({
  iphone: 'iphone',
  ipad: 'ipad',
  ipod: 'ipod',
});

const { iphone, ipod, ipad } = DEVICES;

const checkMobile = () => {
  const varUA = navigator.userAgent.toLowerCase(); // userAgent 값 얻기

  // 안드로이드
  if (varUA.indexOf(android) > -1) {
    return android;
  }

  // IOS
  if (
    varUA.indexOf(iphone) > -1 ||
    varUA.indexOf(ipad) > -1 ||
    varUA.indexOf(ipod) > -1
  ) {
    return ios;
  }

  // 아이폰 , 안드로이드 외
  return other;
};

export const isAndroid = () => checkMobile() === android;

export const isIOS = () => checkMobile() === ios;
