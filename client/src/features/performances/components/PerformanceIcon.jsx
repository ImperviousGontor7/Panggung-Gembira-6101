const ICONS = {
  play: <path d="M8 5v14l11-7L8 5Z" fill="currentColor" stroke="none" />,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3" /></>,
  camera: <><path d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13" r="4" /></>,
  arrowLeft: <><path d="m14 18-6-6 6-6" /><path d="M20 12H8" /></>,
  arrowRight: <><path d="m10 18 6-6-6-6" /><path d="M4 12h12" /></>,
  thumbUp: <><path d="M7 10v11H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3Z" /><path d="M7 10 12 3a3 3 0 0 1 2 3v3h5a2 2 0 0 1 2 2l-1.5 8a2 2 0 0 1-2 2H7" /></>,
  thumbDown: <><path d="M7 14V3H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3Z" /><path d="m7 14 5 7a3 3 0 0 0 2-3v-3h5a2 2 0 0 0 2-2l-1.5-8a2 2 0 0 0-2-2H7" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></>,
};

export default function PerformanceIcon({ name, size = 18, strokeWidth = 1.7, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name] || ICONS.image}
    </svg>
  );
}
