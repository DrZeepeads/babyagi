import React, { useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { fetchGraph } from '../api/agent';
import type { GraphData, GraphNode } from '../types';

// register layout extension
cytoscape.use(dagre);

function GraphPage() {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], edges: [] });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchGraph();
        setGraphData(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const layout = { name: 'dagre', rankDir: 'LR', fit: true } as cytoscape.LayoutOptions;

  const handleCyInit = (cy: cytoscape.Core) => {
    cyRef.current = cy;
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      const id = node.id();
      const label = node.data('label');
      setSelectedNode({ data: { id, label } });
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full" style={{ height: '75vh' }}>
      <div className="flex-1 border rounded">
        <CytoscapeComponent
          elements={[...graphData.nodes, ...graphData.edges] as any}
          style={{ width: '100%', height: '100%' }}
          cy={(cy) => handleCyInit(cy)}
          layout={layout}
          stylesheet={[
            {
              selector: 'node',
              style: {
                label: 'data(label)',
                'background-color': '#1d4ed8',
                color: '#fff',
                'text-valign': 'center',
                'text-halign': 'center',
              },
            },
            {
              selector: 'edge',
              style: {
                width: 2,
                'line-color': '#94a3b8',
                'target-arrow-color': '#94a3b8',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
              },
            },
          ]}
        />
      </div>

      <div className="w-full lg:w-1/3 border rounded p-4 space-y-2 bg-gray-50 overflow-auto">
        <h3 className="font-semibold">Function Details</h3>
        {selectedNode ? (
          <div>
            <p className="font-medium">Name: {selectedNode.data.label}</p>
            {/* Further details could be fetched/displayed here */}
          </div>
        ) : (
          <p className="text-gray-500">Click a function node to view details.</p>
        )}

        <div className="space-x-2 pt-4 border-t">
          <button
            onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 1.2)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Zoom In
          </button>
          <button
            onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 0.8)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Zoom Out
          </button>
          <button
            onClick={() => cyRef.current?.fit()}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Fit
          </button>
        </div>
      </div>
    </div>
  );
}

export default GraphPage;