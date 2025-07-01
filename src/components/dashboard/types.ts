import { XYPosition } from "@xyflow/react";

export interface NodeData {
    id: string;
    position: XYPosition;
    data: {
        label: string;
        storyType: string;
    };
}