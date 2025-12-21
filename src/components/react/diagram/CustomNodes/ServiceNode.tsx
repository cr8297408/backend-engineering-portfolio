import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import {
  Server,
  Database,
  Zap,
  Package,
  Cloud,
  Globe,
  MessageSquare,
  Box
} from 'lucide-react';

const iconMap = {
  gateway: Globe,
  users: Server,
  package: Package,
  database: Database,
  zap: Zap,
  cloud: Cloud,
  'message-queue': MessageSquare,
  service: Server,
  api: Globe,
  cache: Zap,
  queue: MessageSquare,
  external: Cloud,
  custom: Box,
};

export const ServiceNode: React.FC<NodeProps> = ({ data, selected }) => {
  const IconComponent = iconMap[data.icon as keyof typeof iconMap] || Server;

  return (
    <motion.div
      className={`
        px-6 py-4 rounded-2xl border bg-neutral-800
        ${selected ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-white/10'}
        hover:border-blue-500/50 transition-all duration-200 cursor-pointer
        min-w-[180px] max-w-[220px]
      `}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500 border-2 border-neutral-900"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <IconComponent className="w-5 h-5 text-blue-400" />
        </div>
        <span className="font-semibold text-white text-sm">{data.label}</span>
      </div>

      {data.description && (
        <p className="text-xs text-white/50 line-clamp-2">
          {data.description}
        </p>
      )}

      {data.technologies && data.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {data.technologies.slice(0, 2).map((tech: string, idx: number) => (
            <span
              key={idx}
              className="px-1.5 py-0.5 bg-white/5 text-white/40 text-[10px] rounded border border-white/10"
            >
              {tech}
            </span>
          ))}
          {data.technologies.length > 2 && (
            <span className="px-1.5 py-0.5 text-white/40 text-[10px]">
              +{data.technologies.length - 2}
            </span>
          )}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500 border-2 border-neutral-900"
      />
    </motion.div>
  );
};
