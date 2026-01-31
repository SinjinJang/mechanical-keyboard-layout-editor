export const ANNOUNCEMENTS = [
  {
    id: 'server-limitations-2022-10',
    severity: 'warning',
    title: '무료 서버 사용으로 인한 제약 사항',
    content: [
      '서버 사양이 낮아 많은 키들을 배치한 경우 도면 생성 작업이 오래 걸립니다. (layout-full 기준 약 30분)',
      '도면 생성 요청 시 작업 대기열에 추가가 되며, 하나씩 순차적으로 도면 생성 작업이 진행됩니다.',
      '위 처리 방식 및 도면 생성 시간을 참고하여 사용하시기 바랍니다.'
    ],
    dismissible: true
  }
];
