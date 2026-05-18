import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

export function InputandLabel({ label, className, containerClassName, id, ...props }: InputProps) {
  return (
  <div className={cn(styleInput.containerPrincipal, containerClassName)}>
    <input
      {...props}
      id={id}
      placeholder=" "
      className={styleInput.containerComponenteinput + " " + cn(className)}
    />
    
    {label && (
      <label 
        htmlFor={id} 
        className={styleInput.containerLabel + " " + cn(className)}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
                   peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:bg-white peer-focus:px-1
                   :not(:placeholder-shown):top-0 :not(:placeholder-shown):text-xs :not(:placeholder-shown):bg-white :not(:placeholder-shown):px-1"
      >
        {label}
      </label>
    )}
  </div>
);
}