// API 설정
export const API_HOST = 'https://pk92p8sd0k.execute-api.ap-northeast-2.amazonaws.com/main';

// 키보드 레이아웃 상수
export const KEYBOARD_LAYOUT = {
  PLATE_PADDING: 15,
  UNIT_1: 60,
  UNIT_0_25: 15, // UNIT_1 / 4
  KEY_GAP: 4, // 스위치 간격
};

// 각도 제한
export const ANGLE_LIMITS = {
  MIN: -90,
  MAX: 90,
};

// 기본 키 설정
export const DEFAULT_KEY = {
  label: 'New Key',
  w: 1,
  h: 1,
  x: 0,
  y: 0,
  a: 0,
};
