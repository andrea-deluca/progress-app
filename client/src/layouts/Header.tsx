import dayjs from "dayjs";

const Header = () => {
	return (
		<div class="flex space-x-4">
			<div class="flex space-x-8 items-baseline">
				<span class="text-2xl font-bold opacity-40">
					{dayjs().subtract(1, "day").format("MMM DD")}
				</span>
				<span class="text-3xl font-bold">Today</span>
				<span class="text-2xl font-bold opacity-40">
					{dayjs().add(1, "day").format("MMM DD")}
				</span>
			</div>
		</div>
	);
};

export default Header;
