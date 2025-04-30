"use client";
import {
	Background,
	BackgroundVariant,
	Controls,
	type Edge,
	type EdgeTypes,
	MiniMap,
	type Node,
	type NodeTypes,
	Position,
	ReactFlow,
	useEdgesState,
	useNodesState,
	useReactFlow,
} from "@xyflow/react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { BaseEdge } from "./customs/edges";
import { StoreNode } from "./customs/nodes/store-node";
import WorkerNode from "./customs/nodes/worker-node";

import "@xyflow/react/dist/style.css";
import dagre from "dagre";

const nodeTypes: NodeTypes = {
	store: StoreNode,
	worker: WorkerNode,
};

const edgeTypes: EdgeTypes = {
	"base-edge": BaseEdge,
};

const nodeWidth = 220;
const nodeHeight = 480;

export const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
	const dagreGraph = new dagre.graphlib.Graph();
	dagreGraph.setDefaultEdgeLabel(() => ({}));
	dagreGraph.setGraph({ rankdir: "TB", nodesep: 100, ranksep: 100 });

	for (const node of nodes) {
		dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
	}

	for (const edge of edges) {
		dagreGraph.setEdge(edge.source, edge.target);
	}

	dagre.layout(dagreGraph);

	const layoutedNodes = nodes.map((node) => {
		const pos = dagreGraph.node(node.id);
		return {
			...node,
			position: {
				x: pos.x - nodeWidth / 2,
				y: pos.y - nodeHeight / 2,
			},
			sourcePosition: Position.Bottom,
			targetPosition: Position.Top,
		};
	});

	return { nodes: layoutedNodes, edges };
};

export const initialNodes = [
	{
		id: "store-1",
		type: "store",
		position: { x: 0, y: 0 },
		data: {
			name: "Main Store",
			id: "store-001",
			status: "Active",
			products: "248",
			revenue: "$24.8k",
			performance: "82%",
			performanceValue: 82,
			customers: "2,480",
			avgOrder: "$92.45",
			returnRate: "1.8%",
			location: "123 Retail Ave, Shopping District",
		},
	},
	{
		id: "worker-1",
		type: "worker",
		position: { x: 0, y: 0 },
		data: {
			name: "Sarah Johnson",
			position: "Store Manager",
			department: "Management",
			image: "https://randomuser.me/api/portraits/women/17.jpg",
			status: "Active",
			experience: "5 years",
			shift: "Morning",
			location: "Main Store, Floor 1",
			joined: "Mar 12, 2020",
			performanceValue: 92,
			skills: ["Leadership", "Operations", "Scheduling", "Training"],
		},
	},
	{
		id: "worker-2",
		type: "worker",
		position: { x: 0, y: 0 },
		data: {
			name: "Ali Karimov",
			position: "Cashier",
			department: "Sales",
			image: "https://randomuser.me/api/portraits/men/18.jpg",
			status: "Active",
			experience: "2 years",
			shift: "Evening",
			location: "Main Store, Floor 1",
			joined: "Jan 10, 2022",
			performanceValue: 87,
			skills: ["Customer Service", "POS Handling", "Fast Checkout"],
		},
	},
	{
		id: "worker-3",
		type: "worker",
		position: { x: 0, y: 0 },
		data: {
			name: "Madina Rustamova",
			position: "Stock Manager",
			department: "Inventory",
			image: "https://randomuser.me/api/portraits/women/19.jpg",
			status: "Active",
			experience: "3 years",
			shift: "Morning",
			location: "Main Store, Basement",
			joined: "Sep 5, 2021",
			performanceValue: 80,
			skills: ["Inventory Control", "Restocking", "Warehouse Safety"],
		},
	},
	{
		id: "worker-4",
		type: "worker",
		position: { x: 0, y: 0 },
		data: {
			name: "John Lee",
			position: "Security",
			department: "Operations",
			image: "https://randomuser.me/api/portraits/men/20.jpg",
			status: "Active",
			experience: "6 years",
			shift: "Night",
			location: "Main Store, Entrance",
			joined: "Aug 19, 2018",
			performanceValue: 85,
			skills: ["Monitoring", "Safety Protocols", "Emergency Response"],
		},
	},
];

export const initialEdges = [
	{
		id: "edge-store-1-worker-1",
		source: "store-1",
		target: "worker-1",
		type: "base-edge",
	},
	{
		id: "edge-store-1-worker-2",
		source: "store-1",
		target: "worker-2",
		type: "base-edge",
	},
	{
		id: "edge-store-1-worker-3",
		source: "store-1",
		target: "worker-3",
		type: "base-edge",
	},
	{
		id: "edge-store-1-worker-4",
		source: "store-1",
		target: "worker-4",
		type: "base-edge",
	},
];

const ChartView = () => {
	const { resolvedTheme } = useTheme();
	const { setViewport, zoomIn, zoomOut } = useReactFlow();
	const [nodes, setNodes, onNodesChange] = useNodesState<Node<any, any>>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge<any, any>>([]);

	useEffect(() => {
		const storeNode = initialNodes.find((n) => n.type === "store");
		if (!storeNode) return;

		const workerNodes = initialNodes.filter((n) => n.type === "worker");

		const autoEdges = workerNodes.map((worker) => ({
			id: `edge-${storeNode.id}-${worker.id}`,
			source: storeNode.id,
			target: worker.id,
			sourceHandle: null,
			targetHandle: null,
			type: "base-edge",
		}));

		const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
			initialNodes,
			autoEdges,
		);

		setNodes(layoutedNodes);
		setEdges(layoutedEdges);
	}, [setNodes, setEdges]);

	return (
		<div>
			<div className="reactflow-wrapper flex-1 relative w-full h-[calc(100vh-98px)]">
				<ReactFlow
					fitView
					defaultViewport={{ x: 0, y: 0, zoom: 20 }}
					elementsSelectable={false}
					nodesConnectable={false}
					panOnScroll={true}
					defaultEdgeOptions={{
						animated: true,
					}}
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					edgeTypes={edgeTypes}
				>
					<Controls
						showInteractive={true}
						showZoom={true}
						onZoomIn={() => zoomIn({ duration: 800 })}
						onZoomOut={() => zoomOut({ duration: 800 })}
						className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm"
					/>
					<Background
						variant={BackgroundVariant.Dots}
						color={resolvedTheme === "dark" ? "#334155" : "#e2e8f0"}
						gap={12}
						size={1}
						lineWidth={1}
						className="dark:bg-slate-900"
					/>
					<MiniMap
						pannable
						zoomable
						inversePan
						nodeStrokeWidth={3}
						className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm"
						position="bottom-right"
						style={{ width: 159, height: 81 }}
					/>
				</ReactFlow>
			</div>
		</div>
	);
};

export default ChartView;
