import Tag from "@/components/tag";
import { AllowedBlocksTooltip } from "./AllowedBlocksTooltip";
import { BaseEdge, EdgeProps, Handle, NodeProps, Position } from "@xyflow/react";
import { NODE_HEIGHT } from "..";
import { NodeData } from "../types";
import Link from "next/link";
import { FiExternalLink } from 'react-icons/fi';

export function SmartTrunkEdge({
    sourceX,
    sourceY,
    targetX,
    targetY,
    style = {},
    markerEnd,
    data
}: EdgeProps) {
    const isFirst = data?.isFirst || false;
    const isLast = data?.isLast || false;
    const trunkEndY = data?.trunkEndY || targetY;
    
    // Trunk X position (slightly offset from source)
    const trunkX = sourceX + 50;
    
    let pathData = '';
    
    if (isFirst && isLast) {
        // Only one child - simple L shape
        pathData = `M ${sourceX},${sourceY} L ${trunkX},${sourceY} L ${trunkX},${targetY} L ${targetX},${targetY}`;
    } else if (isFirst) {
        // First child - draw from source down to trunk end, then branch to target
        pathData = `M ${sourceX},${sourceY} L ${trunkX},${sourceY} L ${trunkX},${trunkEndY} M ${trunkX},${targetY} L ${targetX},${targetY}`;
    } else if (isLast) {
        // Last child - just draw the branch (trunk already exists)
        pathData = `M ${trunkX},${targetY} L ${targetX},${targetY}`;
    } else {
        // Middle child - just draw the branch
        pathData = `M ${trunkX},${targetY} L ${targetX},${targetY}`;
    }
    
    return (
        <BaseEdge 
            path={pathData} 
            markerEnd={markerEnd} 
            style={{
                ...style,
                strokeWidth: isFirst ? 3 : 2,
                stroke: '#4f46e5',
            }} 
        />
    );
}

export function CustomNode({ data, isConnectable }: NodeProps<NodeData>) {
    return (
        <div style={{
            padding: '12px 16px',
            borderRadius: '8px',
            background: '#ffffff',
            border: '2px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            minWidth: '120px',
            maxWidth: '300px',
            minHeight: NODE_HEIGHT,
            overflow:'hidden'
        }}>
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                style={{
                    background: '#4f46e5',
                    border: '2px solid #fff',
                    width: '10px',
                    height: '10px'
                }}
            />
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 600, marginBottom: 4 }}>
                {data.label}
                <AllowedBlocksTooltip allowedBlocks={data.allowedBlocks ?? []} />
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
                <Tag tag={data.storyType} />
            </div>
            {data.storyUrl ? (
                <Link href={data.storyUrl} target="_blank" className="inline-flex items-center gap-1 mt-3 text-sm">
                    Go to Story <FiExternalLink style={{ fontSize: '0.7em', verticalAlign: 'middle' }} />
                </Link>
            ) : null}
            <Handle
                type="source"
                position={Position.Bottom}
                isConnectable={isConnectable}
                style={{
                    opacity:0
                }}
            />
        </div>
    );
}