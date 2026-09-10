import Link from "next/link";
import Image from "next/image";
import { Lightbulb, Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { BlogContentBlock } from "@/data/blogs";
import type { ReactElement, ReactNode } from "react";

const calloutIcons: Record<string, typeof Lightbulb> = {
  Lightbulb,
  Info,
  AlertTriangle,
  CheckCircle2,
};

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderInlineText(text: string): ReactNode[] {
  const parts: (string | ReactElement)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    parts.push(
      <Link key={key++} href={href} className="text-primary font-semibold hover:underline underline-offset-2">
        {label}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

function ChartBlock({ title, data }: { title?: string; data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-6 md:p-8">
      {title && <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">{title}</h3>}
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-foreground">{item.label}</span>
              <span className="font-bold text-primary">{item.value}</span>
            </div>
            <div className="w-full h-3 rounded-full bg-border/50 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BlogContentRenderer({ blocks }: { blocks: BlogContentBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={i} className="text-xl md:text-2xl font-heading font-bold text-foreground mt-4">
                {block.text}
              </h2>
            );

          case "paragraph":
            return (
              <p key={i} className="text-base text-foreground/70 leading-relaxed">
                {renderInlineText(block.text)}
              </p>
            );

          case "image":
            return (
              <figure key={i} className="flex flex-col gap-3">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border/50">
                  <Image src={block.src} alt={block.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 700px" />
                </div>
                {block.caption && (
                  <figcaption className="text-sm text-muted-foreground text-center">{block.caption}</figcaption>
                )}
              </figure>
            );

          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-2xl border border-border/50">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-secondary/30">
                      {block.headers.map((header, h) => (
                        <th key={h} className="text-left font-bold text-[11px] tracking-widest uppercase text-muted-foreground px-4 py-3.5 whitespace-nowrap">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className={r % 2 === 1 ? "bg-secondary/15" : undefined}>
                        {row.map((cell, c) => (
                          <td key={c} className="px-4 py-3.5 text-foreground/80 whitespace-nowrap">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "chart":
            return <ChartBlock key={i} title={block.title} data={block.data} />;

          case "callout": {
            const Icon = calloutIcons[block.icon] ?? Info;
            return (
              <div key={i} className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-2xl p-5">
                <Icon size={20} className="text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/80 leading-relaxed">{block.text}</p>
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
