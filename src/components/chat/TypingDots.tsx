export function TypingDots({ className = '' }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Hemant is typing"
      className={`inline-flex h-10 items-center gap-1 rounded-bubble rounded-bl-tail bg-bubble px-4 shadow-bubble ${className}`}
    >
      {[0, 160, 320].map((delay) => (
        <span
          key={delay}
          className="size-2 animate-typing rounded-full bg-ink-2"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  )
}
