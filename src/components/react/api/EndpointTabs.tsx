import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { APITester } from './APITester';
import type { Endpoint } from '../../../types/api';
import type { DiagramNode, DiagramEdge } from '../../../types/diagram';

interface Props {
  endpoints: Endpoint[];
  diagramNodes: DiagramNode[];
  diagramEdges: DiagramEdge[];
}

const MAX_VISIBLE_TABS = 3;

export const EndpointTabs: React.FC<Props> = ({ endpoints, diagramNodes, diagramEdges }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const visibleEndpoints = endpoints.slice(0, MAX_VISIBLE_TABS);
  const dropdownEndpoints = endpoints.slice(MAX_VISIBLE_TABS);
  const hasDropdown = dropdownEndpoints.length > 0;

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10';
      case 'POST':
        return 'border-blue-500/50 text-blue-400 bg-blue-500/10';
      case 'PUT':
        return 'border-amber-500/50 text-amber-400 bg-amber-500/10';
      case 'PATCH':
        return 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10';
      case 'DELETE':
        return 'border-red-500/50 text-red-400 bg-red-500/10';
      default:
        return 'border-white/20 text-white/70 bg-white/5';
    }
  };

  const activeEndpoint = endpoints[activeTab];

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto">
        {/* Visible Tabs */}
        {visibleEndpoints.map((endpoint, index) => (
          <button
            key={endpoint.id}
            onClick={() => setActiveTab(index)}
            className={`
              px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-all duration-200
              ${
                activeTab === index
                  ? 'border-white text-white'
                  : 'border-transparent text-white/50 hover:text-white/80 hover:border-white/30'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getMethodColor(endpoint.method)}`}>
                {endpoint.method}
              </span>
              <span>{endpoint.name}</span>
            </div>
          </button>
        ))}

        {/* Dropdown Tab for Remaining Endpoints */}
        {hasDropdown && (
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
                px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-all duration-200 flex items-center gap-2
                ${
                  activeTab >= MAX_VISIBLE_TABS
                    ? 'border-white text-white'
                    : 'border-transparent text-white/50 hover:text-white/80 hover:border-white/30'
                }
              `}
            >
              <span>More</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-neutral-900 border border-white/10 rounded-2xl shadow-xl overflow-hidden z-10">
                {dropdownEndpoints.map((endpoint, index) => {
                  const actualIndex = MAX_VISIBLE_TABS + index;
                  return (
                    <button
                      key={endpoint.id}
                      onClick={() => {
                        setActiveTab(actualIndex);
                        setIsDropdownOpen(false);
                      }}
                      className={`
                        w-full px-4 py-3 text-left transition-colors duration-150 flex items-center gap-3
                        ${
                          activeTab === actualIndex
                            ? 'bg-white/10 text-white'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }
                      `}
                    >
                      <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{endpoint.name}</div>
                        <div className="text-xs text-white/40 truncate">{endpoint.path}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Active Tab Content */}
      <APITester
        endpoint={activeEndpoint}
        diagramNodes={diagramNodes}
        diagramEdges={diagramEdges}
      />
    </div>
  );
};
