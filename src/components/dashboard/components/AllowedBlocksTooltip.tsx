"use client";
import * as Popover from "@radix-ui/react-popover";
import Tag from "@/components/tag";
import { FiInfo } from "react-icons/fi";

export function AllowedBlocksTooltip({ allowedBlocks }: { allowedBlocks?: string[] }) {

    if (!allowedBlocks || allowedBlocks.length === 0) {
        return  null
    }
    return (
        <Popover.Root>
        <Popover.Trigger asChild>
            <button
            type="button"
            className="ml-2 p-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
            aria-label="Show allowed blocks"
            >
            <FiInfo />
            </button>
        </Popover.Trigger>
        <Popover.Portal>
            <Popover.Content
                side="right"
                align="start"
                className="z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[180px] max-w-xs"
                sideOffset={8}
            >
            <div className="mb-2 font-semibold text-sm">Allowed Blocks</div>
            {allowedBlocks && allowedBlocks.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                {allowedBlocks.map((block) => (
                    <Tag key={block} tag={block} pastel={true} />
                ))}
                </div>
            ) : (
                <div className="text-gray-400 text-xs">No allowed blocks</div>
            )}
            <Popover.Arrow className="fill-white" />
            </Popover.Content>
        </Popover.Portal>
        </Popover.Root>
    );
}
