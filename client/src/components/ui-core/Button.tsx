import { JSX, Component } from "solid-js";

type Variant = "primary" | "secondary";
type ButtonType = "submit" | "button";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
	variant?: Variant;
	type?: ButtonType;
	disabled?: boolean;
}

const Button: Component<ButtonProps> = ({
	variant = "primary",
	children,
	type = "button",
	disabled = false,
	...props
}: ButtonProps) => {
	return (
		<button
			{...props}
			disabled={disabled}
			type={type}
			class="bg-sky-700 px-6 py-2 text-slate-100 font-bold rounded-lg"
		>
			{children}
		</button>
	);
};

export default Button;
