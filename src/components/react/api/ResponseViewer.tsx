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
    <div className="bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden">
      {/* Status Header */}
      <div className="p-6 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-white">Response</h4>
          <div className="flex items-center gap-2">
            {isSuccess && <CheckCircle className="w-5 h-5 text-emerald-400" />}
            {isError && <XCircle className="w-5 h-5 text-red-400" />}
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                isSuccess
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : isError
                  ? 'bg-red-500/10 text-red-400'
                  : 'bg-blue-500/10 text-blue-400'
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
            <h5 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">
              Response Headers
            </h5>
            <pre className="p-4 bg-white/5 rounded-2xl text-xs font-mono text-white/70 overflow-x-auto border border-white/10">
              {JSON.stringify(response.headers, null, 2)}
            </pre>
          </div>
        )}

        {/* Response Body */}
        <div>
          <h5 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">
            Response Body
          </h5>
          <pre className="p-4 bg-white/5 rounded-2xl text-xs font-mono text-white/70 overflow-x-auto border border-white/10 max-h-[400px] overflow-y-auto">
            {response.error
              ? response.error
              : JSON.stringify(response.data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
