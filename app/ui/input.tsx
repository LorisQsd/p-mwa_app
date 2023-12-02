import { ChangeEvent, Ref, useId } from "react";
import clsx from "clsx";

type InputProps = {
  children?: React.ReactNode;
  label: string;
  isRequired?: boolean;
  type: string;

  inputRef?: Ref<HTMLInputElement> | null;

  value: string | undefined;
  onChange: (value: string) => void;
};

export default function Input({
  label,
  isRequired = false,
  children = null,
  type,

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
    <div>
      <label
        htmlFor={inputId}
        className={clsx(
            'font-bold block z-0 duration-300 opacity-0 translate-y-full',
            {
              'opacity-100 -translate-y-0': value?.length,
            },
          )}
        // ACCESSIBILITY
        aria-hidden={value?.length ? "false" : "true"}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          className="block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 outline-primary-400 placeholder:text-gray-500 placeholder:italic"
          type={type}
          name="email"
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
    </div>
  );
}
