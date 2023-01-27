import { Accessor, Component, Setter, JSX } from "solid-js";
import {
	Transition,
	TransitionChild,
	Dialog,
	DialogTitle,
	DialogOverlay,
	DialogPanel,
} from "solid-headless";

interface ModalProps extends JSX.HTMLAttributes<HTMLElement> {
	show: Accessor<boolean>;
	onClose: () => boolean;
	title: string;
}

const Overlay = () => (
	<TransitionChild
		enter="ease-out duration-300"
		enterFrom="opacity-0"
		enterTo="opacity-100"
		leave="ease-in duration-200"
		leaveFrom="opacity-100"
		leaveTo="opacity-0"
	>
		<DialogOverlay class="fixed inset-0 bg-slate-700/70 dark:bg-gray-800/70" />
	</TransitionChild>
);

const Modal: Component<ModalProps> = ({ show, onClose, ...props }) => {
	return (
		<Transition appear show={show()}>
			<Dialog
				isOpen
				class="fixed inset-0 z-10 overflow-y-auto"
				onClose={onClose}
			>
				<div class="min-h-screen px-4 flex items-center justify-center">
					<Overlay />
					<TransitionChild
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<DialogPanel class="inline-block max-w-3xl space-y-8 p-8 overflow-hidden text-left align-middle transition-all transform bg-slate-50 dark:bg-gray-900 shadow-xl rounded-lg">
							<DialogTitle
								as="h3"
								class="text-3xl font-bold text-slate-700 dark:text-slate-300 leading-6"
							>
								{props.title}
							</DialogTitle>
							{props.children}
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Modal;
