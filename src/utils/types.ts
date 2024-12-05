export type TransitionViewProps = {
    children: React.ReactNode; // 기본 상태에서 렌더링할 요소
    detailContent: React.ReactNode; // 확대 후 표시할 상세 콘텐츠
    animationDuration?: number; // 애니메이션 지속 시간 (기본값: 800ms)
    onTransitionEnd?: () => void; // 전환 완료 시 호출할 콜백
};
