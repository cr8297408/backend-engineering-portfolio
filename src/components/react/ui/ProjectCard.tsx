import React from 'react';
import { withBase } from '../../../lib/paths';
import type { DiagramData } from '../../../types/diagram';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  slug: string;
  featured?: boolean;
  github?: string;
  diagram?: DiagramData;
}

/** Custom nodes render at roughly 200x120, so this is their visual centre. */
const NODE_W = 200;
const NODE_H = 120;

/**
 * Miniature of the project's real architecture diagram — same node positions
 * and edges the detail page renders interactively, normalised into a small
 * viewBox. It carries actual information about the system, which a decorative
 * thumbnail does not.
 */
const TopologyPreview: React.FC<{ diagram: DiagramData }> = ({ diagram }) => {
  const points = new Map(
    diagram.nodes.map((n) => [n.id, { x: n.position.x + NODE_W / 2, y: n.position.y + NODE_H / 2 }])
  );
  const xs = [...points.values()].map((p) => p.x);
  const ys = [...points.values()].map((p) => p.y);

  const pad = 45;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  // Guard against a degenerate box when every node shares a coordinate.
  const width = Math.max(Math.max(...xs) - minX + pad, 1);
  const height = Math.max(Math.max(...ys) - minY + pad, 1);

  return (
    <svg
      viewBox={`${minX} ${minY} ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <g stroke="#3B82F6" strokeWidth={Math.max(width, height) / 230} opacity={0.35}>
        {diagram.edges.map((edge) => {
          const a = points.get(edge.source);
          const b = points.get(edge.target);
          if (!a || !b) return null;
          return <line key={edge.id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
        })}
      </g>
      <g fill="#93C5FD">
        {diagram.nodes.map((node) => {
          const p = points.get(node.id)!;
          return (
            <circle
              key={node.id}
              cx={p.x}
              cy={p.y}
              r={Math.max(width, height) / 72}
              opacity={node.type === 'database' || node.type === 'queue' ? 0.95 : 0.7}
            />
          );
        })}
      </g>
    </svg>
  );
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  slug,
  diagram,
}) => {
  const shown = technologies.slice(0, 3);
  const rest = technologies.length - shown.length;

  return (
    <a
      href={withBase(`/projects/${slug}`)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden border-b border-white/10 bg-[#06080e]">
        {diagram ? (
          <TopologyPreview diagram={diagram} />
        ) : (
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at center, rgba(147,197,253,0.35) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-medium text-white transition-colors duration-200 group-hover:text-blue-200">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/50">{description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5 pt-1">
          {shown.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60"
            >
              {tech}
            </li>
          ))}
          {rest > 0 && (
            <li className="px-1 py-1 text-[11px] text-white/35">+{rest}</li>
          )}
        </ul>
      </div>
    </a>
  );
};
