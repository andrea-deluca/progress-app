import { Component, For } from "solid-js";

import { useFormHandler } from "solid-form-handler";

import { CreateSchema } from "@validations";

import { Sidebar, Header } from "@layouts";

import { HiSolidPlusCircle, HiSolidFolderAdd } from "solid-icons/hi";

import { useModal, useStorage } from "@hooks";
import { Task } from "@components/features";
import Input from "./components/form/Input";
import { Button, Modal } from "@components/ui-core";

const EmptyTasks = () => <div>No tasks here</div>;

const Brand = () => (
	<div class="space-y-4">
		<h1 class="text-5xl font-black">Progress</h1>
		<small class="text-md text-slate-400 font-semibold">
			Your favorite todos application
		</small>
	</div>
);

const App: Component = () => {
	const { state, setState } = useStorage("tasks", [], "tasks.dat");
	const { isOpen, close, open } = useModal(false);

	const formHandler = useFormHandler(CreateSchema);
	const { formData } = formHandler;

	const handleCreate = (e: SubmitEvent) => {
		e.preventDefault();

		formHandler
			.validateForm()
			.then(() => {
				const task = {
					text: formData().name,
					completed: false,
					inserted_at: new Date(),
				};
				setState((old) => [...old, task]);
			})
			.catch(console.error)
			.finally(formHandler.resetForm);
	};

	return (
		<>
			<div class="overflow-hidden h-screen flex">
				{/* <Sidebar /> */}
				<div class="space-y-8 py-8 px-16 w-full rounded-r-xl bg-gradient-to-br from-slate-50 dark:from-gray-900 via-slate-100 dark:via-gray-900 to-violet-50 dark:to-gray-900 h-full">
					<Header />

					<div class="scrollable space-y-8 p-8">
						<div class="space-x-8 w-full flex h-48">
							<div
								onClick={open}
								class="relative w-6/12 rounded-lg bg-gradient-to-br from-amber-400 to-red-500 hover:shadow-lg hover:scale-105 scale-100 transition hover:cursor-pointer"
							>
								<h3 class="text-white font-black text-3xl p-8 scale-100 w-full h-full hover:scale-125 hover:translate-x-32 hover:translate-y-4 transition">
									Create a new
									<br />
									To-Do
								</h3>
								<HiSolidPlusCircle
									class="absolute bottom-2 right-2 -z-50 opacity-80"
									size={88}
									color="white"
								/>
							</div>
							<div class="opacity-40 relative w-6/12 rounded-lg bg-gradient-to-br from-teal-400 to-sky-500 hover:shadow-lg hover:scale-105 scale-100 transition hover:cursor-pointer">
								<h3 class="text-white font-black text-3xl p-8 scale-100 w-full h-full hover:scale-125 hover:translate-x-32 hover:translate-y-4 transition">
									Create a new
									<br />
									group
								</h3>
								<HiSolidFolderAdd
									class="absolute bottom-2 right-2 -z-50 opacity-80"
									size={88}
									color="white"
								/>
							</div>
						</div>

						<div class="flex space-x-8">
							<div class="w-1/2 space-y-4">
								<h1 class="text-2xl font-bold">To-do list</h1>
								<div class="space-y-4">
									<For each={state()} fallback={EmptyTasks}>
										{(task) => <Task task={task}></Task>}
									</For>
								</div>
							</div>
							<div class="w-1/2 space-y-4">
								<h1 class="text-2xl font-bold">Completed tasks</h1>
								<div class="space-y-4">
									<For each={[]} fallback={EmptyTasks}>
										{(task) => <Task task={task}></Task>}
									</For>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal title="What's your new To-Do?" show={isOpen} onClose={close}>
				<div class="mt-2">
					<p class="text-slate-900 dark:text-slate-400">
						You should write a title for your new To-Do, so that you will
						remember it later
					</p>
				</div>

				<form class="space-y-4 items-baseline" onSubmit={handleCreate}>
					<Input
						id="input-text"
						name="name"
						type="text"
						handler={formHandler}
						placeholder="Create a startup..."
					/>
					<Button type="submit">Create</Button>
				</form>
			</Modal>
		</>
	);
};

export default App;
