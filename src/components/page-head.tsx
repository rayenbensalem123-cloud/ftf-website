import type { ReactNode } from "react";

/**
 * Consistent institutional page header: eyebrow, title, optional lead and action.
 * Replaces the per-page heading markup that previously assumed a dark backdrop.
 */
export function PageHead({
  eyebrow,
  title,
  lead,
  action,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
      <div className="min-w-0">
        <p className="eyebrow text-brand-red">{eyebrow}</p>
        <h1 className="title-page mt-2">{title}</h1>
        {lead && (
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{lead}</p>
        )}
      </div>
      {action}
    </div>
  );
}
