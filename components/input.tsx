

type InputProps = {
  id?: string;
  label?: string;
  type?: string;
  value?: string;
  className?: string
  containerClassName?: string;
  placeholder?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export function Input({
  id,
  label,
  type = "text",
  placeholder,
  value,
  className,
  containerClassName,
  onChange,
}: InputProps) {
    
  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
    </div>
  );
}