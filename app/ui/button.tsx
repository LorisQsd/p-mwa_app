import Loader from "./loader";

// We want to extend the interface of the React button to be able to pass the ...rest props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Optional
  type?: "button" | "submit" | "reset";
  className?: string;
  pending?: boolean;

  children: React.ReactNode;
}

export default function Button({
  type = "button",
  className = "",
  pending = false,

  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      // If the formStatus is pending, we want to force the button type to be 'button'
      // It'll prevent multiple form submit
      type={pending ? "button" : type}
      className={`${className} text-black bg-primary-400 p-2 h-[35px] md:h-[40px] md:px-4 rounded-lg text-sm md:text-base duration-300 hover:shadow-custom hover:bg-primary-400/75 aria-disabled:cursor-not-allowed`}
      aria-disabled={pending}
      {...rest}
    >
      {pending ? <Loader minWidth={20} maxWidth={20} /> : children}
    </button>
  );
}
