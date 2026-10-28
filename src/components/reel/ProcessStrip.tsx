const steps = [
  { icon: '✍️', label: 'Script' },
  { icon: '🎙️', label: 'Voices' },
  { icon: '🦴', label: 'Character rig' },
  { icon: '👄', label: 'Lip-sync' },
  { icon: '🎬', label: 'Render' },
]

/** Script → Voices → Character rig → Lip-sync → Render, as a compact flow. */
export function ProcessStrip() {
  return (
    <ol aria-label="How I made the reel" className="flex flex-wrap items-center gap-x-1 gap-y-2 p-3">
      {steps.map((step, i) => (
        <li key={step.label} className="flex items-center gap-1">
          <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white/10 px-3 text-[13px] font-semibold tracking-tighter text-ink ring-1 ring-hairline ring-inset">
            <span aria-hidden>{step.icon}</span>
            {step.label}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden className="text-sm text-gold">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}
