import { InputWithIconProps } from "../../common/interfaces/components";
import Input from "./Input";

export const InputWithIcon: React.FC<InputWithIconProps> = ({
  Icon,
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div className="relative">
    <Icon className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
    <Input
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      className="pl-10"
      placeholder={placeholder}
    />
  </div>
);
