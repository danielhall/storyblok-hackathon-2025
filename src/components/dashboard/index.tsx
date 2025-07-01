'use client';

import { computeSpaceIA } from '@/lib/services/ia-orchestration-service';
import {
    Background,
    Controls,
    ReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CustomNode, SmartTrunkEdge } from './components';

export const NODE_HEIGHT = 125;
export const NODE_Y_SPACING = 25;

const createNodes = (node: any, baseX: number, startY: number, depth: number = 0): { nodes: any[], nextY: number } => {
    const hasChildren = node.children && node.children.length > 0;
    
    const currentNode = {
        id: `${node.id}`,
        data: {
            label: node.name,
            storyType: node.storyType,
            storyUrl: node.storyUrl || null,
            allowedBlocks: node.allowedBlocks || [],
        },
        position: {
            x: baseX + (depth * 75),
            y: startY * (NODE_HEIGHT + NODE_Y_SPACING)
        },
        type: 'custom'
    };

    if (!hasChildren) {
        return { nodes: [currentNode], nextY: startY + 1 };
    }

    
    let currentY = startY + 1;
    const childNodes: any[] = [];
    
    for (const child of node.children) {
        const result = createNodes(child, baseX, currentY, depth + 1);
        childNodes.push(...result.nodes);
        currentY = result.nextY;
    } 

    return { 
        nodes: [currentNode, ...childNodes], 
        nextY: currentY 
    };
};

const nodeTypes = {
    custom: CustomNode,
};

const edgeTypes = {
    smartTrunk: SmartTrunkEdge,
};

const storyData = await computeSpaceIA(true);

export function Dashboard() {    

    const allNodes: any[] = [];
    
    storyData.forEach((rootStory, index) => {
        const baseX = index * 500;
        const result = createNodes(rootStory, baseX, 0, 0);
        allNodes.push(...result.nodes);
    });   

    return (
        <div style={{ height: '90dvh' }}>
            <ReactFlow 
                nodes={allNodes} 
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
