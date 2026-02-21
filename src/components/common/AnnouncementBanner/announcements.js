export const ANNOUNCEMENTS = [
  {
    id: 'unified-model-generator-2026-02',
    severity: 'info',
    title: 'Plate/Case/PCB 통합 모델 생성 기능이 추가되었습니다',
    content: [
      '이제 Plate, Case, PCB 모델을 하나의 다이얼로그에서 생성할 수 있습니다.',
      'STL (3D) 또는 DXF (2D) 포맷을 선택하여 다운로드할 수 있습니다.',
      '3D 미리보기 기능도 모든 파트 타입에 대해 지원됩니다.',
      '플로팅 독 또는 상단 메뉴의 "Generate Model" 버튼을 클릭하여 사용하세요.'
    ],
    dismissible: true
  },
  {
    id: 'browser-based-rendering-2026-02',
    severity: 'info',
    title: '3D 모델 렌더링이 브라우저 기반으로 변경되었습니다',
    content: [
      'Thanks to Claude Code! 기존 서버에서 처리하던 3D 모델 렌더링이 브라우저에서 직접 처리되도록 변경되었습니다.',
      '더 이상 서버 대기열을 기다릴 필요가 없으며, 즉시 결과를 확인할 수 있습니다.',
      '렌더링 속도는 사용자의 기기 성능에 따라 달라질 수 있습니다. (키보드 크기에 따라 수 분 소요 가능)'
    ],
    dismissible: true
  },
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
