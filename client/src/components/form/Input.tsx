import { JSX, Component, createSignal } from "solid-js";
import { FormHandler } from "solid-form-handler";
import classNames from "classnames";

interface InputProps extends JSX.HTMLAttributes<HTMLInputElement> {
	type: string;
	placeholder?: string;
	name: string;
	handler: FormHandler;
}

const Input: Component<InputProps> = ({
	type = "text",
	handler,
	...props
}: InputProps) => {
	const [error, setError] = createSignal(false);
	const { name } = props;

	const handleInput = (event: InputEvent) => {
		const currentTarget = event.currentTarget;
		const { value } = currentTarget as HTMLInputElement;
		handler.setFieldValue(name, value);
	};

	const handleBlur = () => {
		handler.validateField(name);
		handler.touchField(name);
		handler.fieldHasError(name) ? setError(true) : setError(false);
	};

	return (
		<div class="flex flex-col w-full space-y-2">
			<input
				{...props}
				value={handler.getFieldValue(props.name)}
				onInput={handleInput}
				onBlur={handleBlur}
				class={`w-full p-2 bg-white dark:bg-gray-800 border rounded-lg ${
					error() ? "border-red-700" : "border-slate-200 dark:border-gray-700"
				}`}
			/>
			<small class="text-red-700 font-semibold">
				{handler.getFieldError(props.name)}
			</small>
		</div>
	);
};

export default Input;
