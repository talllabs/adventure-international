"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

interface BaseProps {
  label: string;
  error?: string;
  className?: string;
}

interface InputProps extends BaseProps {
  type?: "input";
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}

interface TextareaProps extends BaseProps {
  type: "textarea";
  inputProps: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

interface SelectProps extends BaseProps {
  type: "select";
  options: { value: string; label: string }[];
  inputProps: SelectHTMLAttributes<HTMLSelectElement>;
}

type FormFieldProps = InputProps | TextareaProps | SelectProps;

const inputBase =
  "w-full border border-charcoal/20 bg-transparent px-4 py-3 text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-gold transition-colors text-sm";

export function FormField(props: FormFieldProps) {
  const { label, error, className } = props;

  return (
    <div className={cn("", className)}>
      <label className="block text-xs tracking-widest uppercase text-charcoal-soft mb-2">
        {label}
      </label>
      {(!props.type || props.type === "input") && (
        <input
          className={cn(inputBase, error && "border-red-400")}
          {...(props as InputProps).inputProps}
        />
      )}
      {props.type === "textarea" && (
        <textarea
          className={cn(inputBase, "resize-none min-h-32", error && "border-red-400")}
          {...(props as TextareaProps).inputProps}
        />
      )}
      {props.type === "select" && (
        <select
          className={cn(inputBase, error && "border-red-400")}
          {...(props as SelectProps).inputProps}
        >
          <option value="">Select...</option>
          {(props as SelectProps).options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
