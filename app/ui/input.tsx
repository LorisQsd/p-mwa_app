import { ChangeEvent, Ref, useId } from "react";
import clsx from "clsx";

type InputProps = {
  children?: React.ReactNode;
  isRequired?: boolean;
  className?: string;
  errMessage?: string[] | undefined;

  name: string;
  label: string;
  type: string;

  inputRef?: Ref<HTMLInputElement> | null;

  value: string | undefined;
  onChange: (value: string) => void;
};

export default function Input({
  label,
  isRequired = false,
  children = null,
  name,
  type,
  className = "",
  errMessage = undefined,

  inputRef = null,

  value,
  onChange,
}: InputProps) {
  const inputId = useId();

  // HANLDER
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div
      className={clsx(`relative ${className}`, { hidden: type === "hidden" })}
    >
      <label
        htmlFor={inputId}
        className={clsx(
          "font-bold block z-0 duration-300 md:text-lg",
          value?.length
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full"
        )}
        // ACCESSIBILITY
        aria-hidden={value?.length ? "false" : "true"}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          className={clsx(
            "block w-full rounded-md border border-gray-200 py-[9px] md:py-[12px] text-sm outline-2 outline-primary-400 placeholder:text-gray-500 placeholder:italic md:placeholder:text-base",
            children ? "pl-10" : "pl-4"
          )}
          type={type}
          name={name}
          placeholder={label}
          required={isRequired}
          autoComplete="off"
          // React Controlled
          value={value}
          onChange={handleChange}
          // React Reference
          ref={inputRef}
          // ACCESSIBILITY
          aria-required={isRequired ? "true" : "false"}
          aria-label={label}
        />
        {children}
      </div>

      {errMessage && (
        <p className="text-red-400 italic text-sm font-semibold w-full">
          {errMessage[0]}
        </p>
      )}
    </div>
  );
}
