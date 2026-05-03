import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full py-2 px-4 text-[15px] rounded-md border border-black bg-white 
      transition duration-200 ease-in-out hover:bg-gray-300 hover:text-[18px] hover:scale-110"
    >
      {children}
    </button>
  );
}