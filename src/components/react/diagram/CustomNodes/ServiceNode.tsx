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
        px-6 py-4 rounded-xl border-2 bg-surface-primary
        ${selected ? 'border-accent-blue shadow-lg' : 'border-border-primary'}
        hover:border-accent-blue transition-all duration-200 cursor-pointer
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
        className="w-3 h-3 bg-accent-blue border-2 border-white"
      />

      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-accent-blueTint rounded-lg">
          <IconComponent className="w-5 h-5 text-accent-blue" />
        </div>
        <span className="font-semibold text-text-primary text-sm">{data.label}</span>
      </div>

      {data.description && (
        <p className="text-xs text-text-secondary line-clamp-2">
          {data.description}
        </p>
      )}

      {data.technologies && data.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {data.technologies.slice(0, 2).map((tech: string, idx: number) => (
            <span
              key={idx}
              className="px-1.5 py-0.5 bg-surface-secondary text-text-tertiary text-[10px] rounded"
            >
              {tech}
            </span>
          ))}
          {data.technologies.length > 2 && (
            <span className="px-1.5 py-0.5 text-text-tertiary text-[10px]">
              +{data.technologies.length - 2}
            </span>
          )}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-accent-blue border-2 border-white"
      />
    </motion.div>
  );
};
