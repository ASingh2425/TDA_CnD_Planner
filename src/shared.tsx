import type { ReactNode } from "react";
export function Link({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={`#/${to}`}>
      {children}
    </a>
  );
}
export function Ext({ url, children }: { url: string; children: ReactNode }) {
  return /^https:\/\//.test(url) ? (
    <a href={url} target="_blank" rel="noreferrer">
      {children} ↗
    </a>
  ) : (
    <span>{children}</span>
  );
}
export function Title({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="page-title">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
