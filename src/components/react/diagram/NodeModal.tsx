import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { NodeData } from '../../../types/diagram';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodeData: NodeData | null;
}

export const NodeModal: React.FC<Props> = ({ open, onOpenChange, nodeData }) => {
  if (!nodeData) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-surface-primary border border-border-primary rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-surface-primary border-b border-border-primary p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-2">
                    {nodeData.label}
                  </h2>
                  {nodeData.description && (
                    <p className="text-text-secondary">{nodeData.description}</p>
                  )}
                </div>
                <button
                  onClick={() => onOpenChange(false)}
                  className="p-2 rounded-lg hover:bg-surface-secondary transition-all duration-200"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {nodeData.details && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
                      Details
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {nodeData.details}
                    </p>
                  </div>
                )}

                {nodeData.technologies && nodeData.technologies.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {nodeData.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-surface-secondary text-text-primary text-sm rounded-lg border border-border-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {nodeData.metrics && Object.keys(nodeData.metrics).length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
                      Key Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(nodeData.metrics).map(([key, value]) => (
                        <div
                          key={key}
                          className="p-4 bg-surface-secondary rounded-xl border border-border-primary"
                        >
                          <div className="text-xs text-text-tertiary capitalize mb-1">
                            {key.replace(/_/g, ' ')}
                          </div>
                          <div className="text-xl font-semibold text-accent-blue">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-surface-primary border-t border-border-primary p-6">
                <button
                  onClick={() => onOpenChange(false)}
                  className="w-full px-6 py-3 bg-accent-blue text-white rounded-xl hover:bg-accent-blueHover transition-all duration-200 font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
