import React, { useState } from 'react';
import { Play, Loader } from 'lucide-react';
import { RequestBuilder } from './RequestBuilder';
import { ResponseViewer } from './ResponseViewer';
import { FlowAnimator } from './FlowAnimator';
import type { Endpoint } from '../../../types/api';
import type { DiagramNode, DiagramEdge } from '../../../types/diagram';

interface Props {
  endpoint: Endpoint;
  diagramNodes: DiagramNode[];
  diagramEdges: DiagramEdge[];
}

export const APITester: React.FC<Props> = ({ endpoint, diagramNodes, diagramEdges }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [showFlow, setShowFlow] = useState(false);
  const [speed, setSpeed] = useState(2); // Default 2x slower (more time to see)

  // Initialize headers and body from endpoint config
  const initialHeaders = endpoint.headers?.reduce(
    (acc, h) => ({ ...acc, [h.key]: h.value }),
    {} as Record<string, string>
  ) || {};

  const [headers, setHeaders] = useState(initialHeaders);
  const [body, setBody] = useState(endpoint.body?.example || '');

  const handleExecute = async () => {
    setIsRunning(true);
    setShowFlow(true);
    setResponse(null);

    try {
      // Calculate total animation duration based on sequence length and speed
      const baseDelayPerStep = 800; // Fixed delay per step in FlowAnimator
      const totalSteps = endpoint.flowVisualization?.nodeSequence.length || 1;
      const animationDuration = baseDelayPerStep * speed * totalSteps;

      // Simulate API request - wait for animation to complete
      await new Promise((resolve) => setTimeout(resolve, animationDuration));

      // Mock successful response
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/json',
          'x-request-id': `req_${Math.random().toString(36).substr(2, 9)}`,
          'x-response-time': '87ms',
        },
        data: {
          success: true,
          message: 'Request completed successfully',
          timestamp: new Date().toISOString(),
          ...(endpoint.method === 'GET'
            ? {
                data: [
                  { id: 1, name: 'Product 1', price: 29.99 },
                  { id: 2, name: 'Product 2', price: 49.99 },
                ],
                total: 2,
              }
            : {
                id: Math.floor(Math.random() * 1000),
                created: true,
              }),
        },
      };

      setResponse(mockResponse);
    } catch (error) {
      setResponse({
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setIsRunning(false);
      // Keep flow visible for a bit after completion
      setTimeout(() => setShowFlow(false), 1500);
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'POST':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'PUT':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'PATCH':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'DELETE':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-white/5 text-white border-white/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Endpoint Info Card */}
      <div className="bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/10 bg-white/[0.02]">
          <h3 className="text-xl font-bold text-white mb-2">{endpoint.name}</h3>
          <p className="text-sm text-white/60 mb-4">{endpoint.description}</p>

          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`px-3 py-1.5 rounded-lg font-mono text-sm font-bold border ${getMethodColor(
                endpoint.method
              )}`}
            >
              {endpoint.method}
            </span>
            <code className="text-sm text-white/70 font-mono bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              {endpoint.path}
            </code>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Request Builder */}
          <RequestBuilder
            headers={headers}
            body={endpoint.body ? body : undefined}
            onHeadersChange={setHeaders}
            onBodyChange={endpoint.body ? setBody : undefined}
          />

          {/* Flow Speed Control */}
          {endpoint.flowVisualization && (
            <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-white">
                  Flow Animation Speed
                </label>
                <span className="text-xs text-white/50 px-2 py-1 bg-white/5 rounded-lg">
                  {speed === 0.5 ? 'Fast (2x)' : speed === 1 ? 'Normal (1x)' : speed === 2 ? 'Slow (0.5x)' : `${speed}x slower`}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                disabled={isRunning}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs text-white/40 mt-2">
                <span>Fast</span>
                <span>Slow</span>
              </div>
            </div>
          )}

          {/* Execute Button */}
          <button
            onClick={handleExecute}
            disabled={isRunning}
            className={`
              w-full px-6 py-3 rounded-2xl font-semibold
              transition-all duration-200 flex items-center justify-center gap-2
              ${
                isRunning
                  ? 'bg-white/5 text-white/40 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-white/90 shadow-lg hover:shadow-xl'
              }
            `}
          >
            {isRunning ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Running Request...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Execute Request
              </>
            )}
          </button>
        </div>
      </div>

      {/* Flow Visualization */}
      {showFlow && endpoint.flowVisualization && (
        <FlowAnimator
          nodes={diagramNodes}
          edges={diagramEdges}
          sequence={endpoint.flowVisualization.nodeSequence}
          timing={endpoint.flowVisualization.timing}
          isActive={isRunning}
          speedMultiplier={speed}
        />
      )}

      {/* Response Viewer */}
      {response && <ResponseViewer response={response} />}
    </div>
  );
};
