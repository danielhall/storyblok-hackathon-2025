'use client';

import { fetchStoryCardTree } from '@/lib/storyblok/fetch-client';
import {
    Background,
    Controls,
    Edge,
    ReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CustomNode, SmartTrunkEdge } from './components';


const storyData = await fetchStoryCardTree();
const data = storyData[4];

export function Dashboard() {
    const datasets = storyData.map((data, xIndex) => {
        const root = {
            id: `${data.id}`,
            data: { label: data.name, storyType: data.storyType },
            position: { x: xIndex * 500, y: 0 },
            type: 'custom'
        }
    
        const childs = data.children.map((child, idx) => ({
            id: `${child.id}`,
            data: { label: child.name, storyType: child.storyType },
            position: { x: xIndex * 500 + 150, y: 100 * (idx + 1) },
            type: 'custom',
        }));

        return [root, ...childs];
    })

    const nodes = datasets.flat();

    const nodeTypes = {
        custom: CustomNode,
    };

    const edgeTypes = {
        smartTrunk: SmartTrunkEdge,
    };


    const trunkEndY = data.children.length > 0 ? 100 * data.children.length + 100 : 100;

    const edges: Edge[] = data.children.map((child, idx) => ({
        id: `${data.id}-${child.id}`,
        source: `${data.id}`,
        target: `${child.id}`,
        type: 'smartTrunk',
        data: {
            isFirst: idx === 0,
            isLast: idx === data.children.length - 1,
            trunkEndY,
        },
    }));

    return (
        <div style={{ height: '90dvh' }}>
            <ReactFlow 
                nodes={nodes} 
                edges={edges} 
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                fitViewOptions={{
                    padding: 0.2,
                }}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}