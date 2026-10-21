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
export type Assignment = {
  task_id: string;
  member_id: string;
  reviewer_id: string | null;
  blocker: string | null;
};
export type ProjectRow = {
  id: string;
  title: string;
  description: string;
  status: string;
  lead: string | null;
  version: number;
};
export function message(e: unknown) {
  return e instanceof Error
    ? e.message
    : typeof e === "object" && e && "message" in e
      ? String(e.message)
      : "Something went wrong. Please try again.";
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
