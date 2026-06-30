export default function Loader({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <svg width="64" height="64" viewBox="0 0 80 80">
        <circle
          cx="30"
          cy="62"
          r="5"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
        />
        <circle
          cx="56"
          cy="62"
          r="5"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
        />
        <path
          d="M14 18h6l8 32h28l7-22H26"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          className="box-drop"
          x="40"
          y="20"
          width="10"
          height="10"
          rx="1.5"
          fill="var(--color-primary)"
        />
        <rect
          className="box-drop box-drop-delay"
          x="40"
          y="20"
          width="10"
          height="10"
          rx="1.5"
          fill="var(--color-primary)"
        />
      </svg>
      {message && <p className="text-text-secondary text-sm">{message}</p>}

      <style jsx>{`
        .box-drop {
          animation: drop 1.4s ease-in-out infinite;
          transform-origin: center;
        }
        .box-drop-delay {
          animation-delay: 0.7s;
          opacity: 0;
        }
        @keyframes drop {
          0% {
            transform: translate(2px, -22px);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          55%,
          70% {
            transform: translate(2px, 0);
            opacity: 1;
          }
          85%,
          100% {
            transform: translate(2px, 0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
