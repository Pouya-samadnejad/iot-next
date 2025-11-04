import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";

interface InputSectionProps {
  label: string;
  type?: string;
  placeholder?: string;
}

export default function InputSection({
  label,
  type = "text",
  placeholder = "",
}: InputSectionProps) {
  return (
    <div className="w-full my-2">
      <Label htmlFor={label}>{label}</Label>
      <Input type={type} id={label} placeholder={placeholder} />
    </div>
  );
}
