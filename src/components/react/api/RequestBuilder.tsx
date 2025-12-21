import React from 'react';

interface Props {
  headers: Record<string, string>;
  body?: string;
  onHeadersChange: (headers: Record<string, string>) => void;
  onBodyChange?: (body: string) => void;
}

export const RequestBuilder: React.FC<Props> = ({
  headers,
  body,
  onHeadersChange,
  onBodyChange,
}) => {
  const handleHeaderChange = (key: string, value: string) => {
    onHeadersChange({ ...headers, [key]: value });
  };

  return (
    <div className="space-y-4">
      {/* Headers Section */}
      {Object.keys(headers).length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
            Headers
          </h4>
          <div className="space-y-2">
            {Object.entries(headers).map(([key, value]) => (
              <div key={key} className="grid grid-cols-2 gap-3">
                <div className="px-3 py-2 bg-surface-secondary text-text-tertiary rounded-lg text-sm font-mono border border-border-primary">
                  {key}
                </div>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleHeaderChange(key, e.target.value)}
                  className="px-3 py-2 bg-surface-secondary text-text-primary rounded-lg text-sm font-mono border border-border-primary focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all duration-200"
                  placeholder="Enter value"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Body Section */}
      {body !== undefined && onBodyChange && (
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
            Request Body
          </h4>
          <textarea
            value={body}
            onChange={(e) => onBodyChange(e.target.value)}
            rows={10}
            className="w-full px-4 py-3 bg-surface-secondary text-text-primary rounded-lg text-sm font-mono border border-border-primary focus:outline-none focus:ring-2 focus:ring-accent-blue resize-none transition-all duration-200"
            placeholder="Enter JSON body..."
          />
        </div>
      )}
    </div>
  );
};
