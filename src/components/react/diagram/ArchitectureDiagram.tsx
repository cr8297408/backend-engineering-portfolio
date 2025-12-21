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
    <div className="w-full h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900">
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
        className="bg-neutral-900"
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="rgba(255,255,255,0.1)"
          gap={16}
          size={1}
        />
        <Controls
          className="bg-neutral-800 border border-white/10 rounded-xl shadow-lg [&>button]:bg-neutral-800 [&>button]:border-white/10 [&>button]:text-white [&>button:hover]:bg-neutral-700"
        />
        <MiniMap
          className="bg-neutral-800 border border-white/10 rounded-lg"
          nodeBorderRadius={8}
          nodeColor={(node) => {
            if (node.selected) return '#3b82f6';
            return '#262626';
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
