"use client";
import {
	type Edge,
	type EdgeProps,
	BaseEdge as ReactFlowBaseEdge,
	getSmoothStepPath,
} from "@xyflow/react";
import type { FC } from "react";

export const BaseEdge: FC<EdgeProps<Edge>> = ({ markerEnd, ...rest }) => {
	const [edgePath] = getSmoothStepPath({
		...rest,
	});

	return (
		<>
			<ReactFlowBaseEdge {...rest} path={edgePath} />
		</>
	);
};
