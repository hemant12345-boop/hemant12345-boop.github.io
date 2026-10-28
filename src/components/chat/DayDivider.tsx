/** Centered timestamp between parts of the conversation ("Today 9:41"). */
export function DayDivider({ children }: { children: string }) {
  return (
    <p className="py-3 text-center text-xs font-medium tracking-wide text-faint uppercase">
      {children}
    </p>
  )
}
