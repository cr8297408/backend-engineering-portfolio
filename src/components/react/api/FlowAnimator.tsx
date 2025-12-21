import React, { useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from '@xyflow/react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomNodeTypes } from '../diagram/CustomNodes';
import type { DiagramNode, DiagramEdge } from '../../../types/diagram';

interface Props {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  sequence: string[];
  timing: Record<string, number>;
  isActive: boolean;
  speedMultiplier?: number;
}

export const FlowAnimator: React.FC<Props> = ({ nodes, edges: initialEdges, sequence, timing, isActive, speedMultiplier = 1 }) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [animatedNodes, setAnimatedNodes] = useNodesState(nodes as Node[]);
  const [edges] = useEdgesState(initialEdges as Edge[]);

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(-1);
      // Reset all nodes to default state
      setAnimatedNodes((prevNodes) =>
        prevNodes.map((n) => ({
          ...n,
          className: '',
        }))
      );
      return;
    }

    // Initially set all nodes - dim those not in sequence
    setAnimatedNodes((prevNodes) =>
      prevNodes.map((n) => ({
        ...n,
        className: sequence.includes(n.id) ? '' : 'opacity-30',
      }))
    );

    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const animateSequence = () => {
      if (currentIndex >= sequence.length) {
        return;
      }

      const nodeId = sequence[currentIndex];

      // Fixed base delay of 800ms per step, controlled only by speedMultiplier
      const baseDelay = 800;
      const delay = baseDelay * speedMultiplier;

      timeoutId = setTimeout(() => {
        setCurrentStep(currentIndex);

        // Highlight active node, keep others dimmed if not in sequence
        setAnimatedNodes((prevNodes) =>
          prevNodes.map((n) => ({
            ...n,
            className: n.id === nodeId
              ? 'animate-pulse ring-4 ring-white'
              : sequence.includes(n.id)
              ? ''
              : 'opacity-30',
          }))
        );

        currentIndex++;
        animateSequence();
      }, delay);
    };

    animateSequence();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isActive, sequence, speedMultiplier, setAnimatedNodes]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative w-full h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-neutral-900"
        >
          <ReactFlow
            nodes={animatedNodes}
            edges={edges}
            nodeTypes={CustomNodeTypes}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            zoomOnScroll={false}
            panOnDrag={false}
            proOptions={{ hideAttribution: true }}
          >
            <Background
              color="rgba(255,255,255,0.1)"
              gap={16}
              size={1}
            />
          </ReactFlow>

          {/* Progress Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-neutral-900/90 px-6 py-3 rounded-full border border-white/10 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <p className="text-sm font-medium text-white">
                {currentStep >= 0 && currentStep < sequence.length
                  ? `Processing: ${sequence[currentStep]}`
                  : 'Initializing request...'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-white to-white/50"
              initial={{ width: '0%' }}
              animate={{
                width: currentStep >= 0 ? `${((currentStep + 1) / sequence.length) * 100}%` : '0%',
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
