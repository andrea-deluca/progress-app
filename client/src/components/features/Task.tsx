import { Component, JSX } from "solid-js";
import { HiOutlineCheck } from "solid-icons/hi";
import dayjs from "dayjs";
import colors from "tailwindcss/colors";

interface Task {
	text: string;
	completed: boolean;
	inserted_at: Date;
}

interface TaskProps extends JSX.HTMLAttributes<HTMLDivElement> {
	task: Task;
}

const Task: Component<TaskProps> = ({ task, ...props }: TaskProps) => {
	return (
		<div class="bg-white dark:bg-gray-800 p-4 rounded-lg text-slate-700 dark:text-slate-100 shadow" {...props}>
			<div class={`flex border-l-8 border-slate-300 dark:border-slate-600 p-6 space-x-8 items-center`}>
				<div class="p-4 bg-slate-200 rounded-full h-min">
					<HiOutlineCheck size={24} color={colors.slate[700]} />
				</div>
				<div class="flex flex-col space-y-4">
					<h6 class="text-lg font-bold">{task.text}</h6>
					<p class="text-slate-500 dark:text-slate-400">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
						aliquid eligendi magni optio adipisci, cupiditate reprehenderit
						excepturi dolorum ratione, eos quia qui earum eius officia vel vero!
						Veniam, nobis incidunt.
					</p>
					<small class="d-block text-indigo-700 dark:text-indigo-200">
						Inserted on{" "}
						{dayjs(task.inserted_at).format("dddd DD MMMM YYYY, HH:mm")}
					</small>
				</div>
			</div>
		</div>
	);
};

export default Task;
