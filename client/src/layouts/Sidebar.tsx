import { Component, createSignal } from "solid-js";

import {
	HiOutlineHome,
	HiSolidMenuAlt1,
	HiOutlineCalendar,
	HiOutlineViewGrid,
	HiOutlineCog,
} from "solid-icons/hi";

import { colors } from "@configs/colors";
import { IconTypes } from "solid-icons";
import { DefaultColors } from "tailwindcss/types/generated/colors";

interface TabIconButtonProps {
	size: number;
	color: keyof DefaultColors;
	icon: IconTypes;
	onClick?: () => any;
	active?: boolean;
}

const TabIconButton: Component<TabIconButtonProps> = (props) => (
	<props.icon
		onClick={props.onClick}
		role="button"
		size={props.size}
		color={colors.indigo[800]}
		class={`bg-indigo-50 p-2 rounded-lg hover:scale-110 scale-95 transition`}
	/>
);

const Sidebar = () => {
	return (
		<div class="bg-white dark:bg-gray-800 min-h-full rounded-l-xl py-8 px-2 flex flex-col justify-between items-center">
			<TabIconButton
				icon={HiSolidMenuAlt1}
				size={42}
				color={"violet"}
			/>
			<div class="space-y-4">
				<TabIconButton icon={HiOutlineHome} size={42} color={"violet"} />
				<TabIconButton icon={HiOutlineCalendar} size={42} color={"emerald"} />
				<TabIconButton icon={HiOutlineViewGrid} size={42} color={"sky"} />
			</div>
			<div class="space-y-4">
				<TabIconButton icon={HiOutlineCog} size={42} color={"red"} />
			</div>
		</div>
	);
};

export default Sidebar;
