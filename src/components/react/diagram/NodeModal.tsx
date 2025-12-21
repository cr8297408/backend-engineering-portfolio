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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-neutral-900 border-b border-white/10 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {nodeData.label}
                  </h2>
                  {nodeData.description && (
                    <p className="text-white/60">{nodeData.description}</p>
                  )}
                </div>
                <button
                  onClick={() => onOpenChange(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {nodeData.details && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">
                      Details
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {nodeData.details}
                    </p>
                  </div>
                )}

                {nodeData.technologies && nodeData.technologies.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {nodeData.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-white/5 text-white text-sm rounded-lg border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {nodeData.metrics && Object.keys(nodeData.metrics).length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">
                      Key Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(nodeData.metrics).map(([key, value]) => (
                        <div
                          key={key}
                          className="p-4 bg-white/5 rounded-2xl border border-white/10"
                        >
                          <div className="text-xs text-white/40 capitalize mb-1">
                            {key.replace(/_/g, ' ')}
                          </div>
                          <div className="text-xl font-semibold text-blue-400">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-neutral-900 border-t border-white/10 p-6">
                <button
                  onClick={() => onOpenChange(false)}
                  className="w-full px-6 py-3 bg-white text-black rounded-2xl hover:bg-white/90 transition-all duration-200 font-medium"
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
