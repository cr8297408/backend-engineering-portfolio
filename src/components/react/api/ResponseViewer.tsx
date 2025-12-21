import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import type { APIResponse } from '../../../types/api';

interface Props {
  response: APIResponse;
}

export const ResponseViewer: React.FC<Props> = ({ response }) => {
  const isSuccess = response.status >= 200 && response.status < 300;
  const isError = response.status >= 400;

  return (
    <div className="bg-surface-primary border border-border-primary rounded-2xl overflow-hidden">
      {/* Status Header */}
      <div className="p-6 border-b border-border-primary bg-surface-secondary">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-text-primary">Response</h4>
          <div className="flex items-center gap-2">
            {isSuccess && <CheckCircle className="w-5 h-5 text-status-success" />}
            {isError && <XCircle className="w-5 h-5 text-status-error" />}
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                isSuccess
                  ? 'bg-status-success/10 text-status-success'
                  : isError
                  ? 'bg-status-error/10 text-status-error'
                  : 'bg-status-info/10 text-status-info'
              }`}
            >
              {response.status} {response.statusText}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Response Headers */}
        {response.headers && Object.keys(response.headers).length > 0 && (
          <div>
            <h5 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
              Response Headers
            </h5>
            <pre className="p-4 bg-surface-secondary rounded-lg text-xs font-mono text-text-secondary overflow-x-auto border border-border-primary">
              {JSON.stringify(response.headers, null, 2)}
            </pre>
          </div>
        )}

        {/* Response Body */}
        <div>
          <h5 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
            Response Body
          </h5>
          <pre className="p-4 bg-surface-secondary rounded-lg text-xs font-mono text-text-secondary overflow-x-auto border border-border-primary max-h-[400px] overflow-y-auto">
            {response.error
              ? response.error
              : JSON.stringify(response.data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
