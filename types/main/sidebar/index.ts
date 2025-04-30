import type { ReactElement, ReactNode } from "react";

export type MenuLinkProps = {
	icon?: ReactNode;
	title?: string;
	pathname?: string;
	hasBadge?: boolean;
	badgeElement?: React.ReactElement | string | number;
	tooltipContent?: ReactElement;
	hasTooltip?: boolean;
	id: string;
	shouldRenderCustomElement?: boolean;
	customElement?: ReactNode;
	subLinks?: MenuLinkProps[];
	hideCustomIcon?: boolean;
};
