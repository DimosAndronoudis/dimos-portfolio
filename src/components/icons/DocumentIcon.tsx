/**
 * A sheet with a folded corner and three ruled lines. Hairline stroke and
 * square corners, to sit with the panel borders rather than the type.
 */
export function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
      className={className}
    >
      <path d="M14 2.5H6.5v19h11V6z" />
      <path d="M14 2.5V6h3.5" />
      <path d="M9.5 12h5M9.5 15h5M9.5 18h3" />
    </svg>
  );
}
