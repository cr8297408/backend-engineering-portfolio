import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from '@xyflow/react';
import { NodeModal } from './NodeModal';
import { CustomNodeTypes } from './CustomNodes';
import type { DiagramData, NodeData } from '../../../types/diagram';

interface Props {
  diagram: DiagramData;
}

export const ArchitectureDiagram: React.FC<Props> = ({ diagram }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(diagram.nodes as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(diagram.edges as Edge[]);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.data as NodeData);
    setIsModalOpen(true);
  }, []);

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden border-2 border-border-primary bg-background-secondary">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={CustomNodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        className="bg-background-secondary"
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="var(--color-border-secondary)"
          gap={16}
          size={1}
        />
        <Controls
          className="bg-surface-primary border border-border-primary rounded-xl shadow-md"
        />
        <MiniMap
          className="bg-surface-secondary border border-border-primary rounded-lg"
          nodeBorderRadius={8}
          nodeColor={(node) => {
            if (node.selected) return 'var(--color-accent-blue)';
            return 'var(--color-surface-primary)';
          }}
        />
      </ReactFlow>

      <NodeModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        nodeData={selectedNode}
      />
    </div>
  );
};
