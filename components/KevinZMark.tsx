type KevinZMarkProps = {
  className?: string
  decorative?: boolean
}

export function KevinZMark({
  className = "",
  decorative = true,
}: KevinZMarkProps) {
  return (
    <span
      aria-hidden={decorative}
      className={`kz-mark ${className}`.trim()}
    >
      <span className="kz-mark-k">K</span>
      <span className="kz-mark-thread" />
      <span className="kz-mark-z">Z</span>
    </span>
  )
}
