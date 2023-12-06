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

  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} text-black bg-primary-400 p-2 h-[35px] md:h-[40px] md:px-4 rounded-lg text-sm md:text-base duration-300 hover:shadow-custom hover:bg-primary-400/75`}
      {...rest}
    >
      {children}
    </button>
  );
}
