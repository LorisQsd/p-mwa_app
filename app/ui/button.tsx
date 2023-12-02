type ButtonProps = {
  // Optional
  type?: "button" | "submit" | "reset";
  className?: string;

  content: string;
};

export default function Button({
  type = "button",
  className = "",

  content,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} text-black bg-primary-400 p-2 md:px-4 rounded-lg text-sm md:text-base duration-300 hover:shadow-custom hover:bg-primary-400/75`}
    >
      {content}
    </button>
  );
}
