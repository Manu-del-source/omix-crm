export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1280px] px-5 sm:px-8 ${className}`}>{children}</div>
}
