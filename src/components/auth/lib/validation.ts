export const idRules = {
  required: { value: true, message: genMsg('ID') },
};
export const pwRules = {
  required: { value: true, message: genMsg('PW') },
};

function genMsg(msg: string) {
  return `${msg}를 입력해 주세요.`;
}
