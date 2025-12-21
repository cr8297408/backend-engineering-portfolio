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
        return 'bg-status-success/10 text-status-success border-status-success/20';
      case 'POST':
        return 'bg-accent-blue/10 text-accent-blue border-accent-blue/20';
      case 'PUT':
        return 'bg-status-warning/10 text-status-warning border-status-warning/20';
      case 'PATCH':
        return 'bg-status-info/10 text-status-info border-status-info/20';
      case 'DELETE':
        return 'bg-status-error/10 text-status-error border-status-error/20';
      default:
        return 'bg-surface-secondary text-text-primary border-border-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Endpoint Info Card */}
      <div className="bg-surface-primary border border-border-primary rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border-primary bg-surface-secondary">
          <h3 className="text-xl font-bold text-text-primary mb-2">{endpoint.name}</h3>
          <p className="text-sm text-text-secondary mb-4">{endpoint.description}</p>

          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`px-3 py-1.5 rounded-md font-mono text-sm font-bold border ${getMethodColor(
                endpoint.method
              )}`}
            >
              {endpoint.method}
            </span>
            <code className="text-sm text-text-secondary font-mono bg-surface-primary px-3 py-1.5 rounded-md border border-border-primary">
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
            <div className="p-4 bg-surface-secondary rounded-xl border border-border-primary">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-text-primary">
                  Flow Animation Speed
                </label>
                <span className="text-xs text-text-tertiary px-2 py-1 bg-surface-primary rounded">
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
                className="w-full h-2 bg-surface-primary rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-blue [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-tertiary mt-2">
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
              w-full px-6 py-3 rounded-xl font-semibold
              transition-all duration-200 flex items-center justify-center gap-2
              ${
                isRunning
                  ? 'bg-surface-secondary text-text-tertiary cursor-not-allowed'
                  : 'bg-accent-blue text-white hover:bg-accent-blueHover shadow-md hover:shadow-lg'
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
