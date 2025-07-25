import { Mail, Phone, User, Users, Lock } from "lucide-react";
import ErrorMessage from "./ErrorMessage";
import Input from "./Input";
import { InputWithIcon } from "./InputWithIcon";
import Button from "./Button";
import { Link } from "react-router-dom";
import { FormSectionProps } from "../../common/interfaces/components";
import { signUpPageMessages } from "../../common/constants";
import { routes } from "../../routes";

export const SignUpFormSection: React.FC<FormSectionProps> = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  isLoading,
  error,
}) => (
  <div className="bg-white py-8 px-6 rounded-xl shadow-lg">
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={signUpPageMessages.serialNumber.title}
          name={signUpPageMessages.serialNumber.name}
          value={formData.serialNumber}
          onChange={handleChange}
          error={errors.serialNumber}
          placeholder={signUpPageMessages.serialNumber.placeHolder}
        />
        <InputWithIcon
          Icon={User}
          label={signUpPageMessages.fullName.title}
          name={signUpPageMessages.fullName.name}
          type={signUpPageMessages.fullName.type}
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder={signUpPageMessages.fullName.placeHolder}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputWithIcon
          Icon={Mail}
          label={signUpPageMessages.email.title}
          name={signUpPageMessages.email.name}
          type={signUpPageMessages.email.type}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder={signUpPageMessages.email.placeHolder}
        />
        <InputWithIcon
          Icon={Lock}
          label={signUpPageMessages.password.title}
          type={signUpPageMessages.password.type}
          name={signUpPageMessages.password.name}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder={signUpPageMessages.password.placeHolder}
        />
      </div>

      <InputWithIcon
        Icon={Phone}
        label={signUpPageMessages.phone.title}
        type={signUpPageMessages.phone.type}
        name={signUpPageMessages.phone.name}
        value={formData.phoneNumber}
        onChange={handleChange}
        error={errors.phoneNumber}
        placeholder={signUpPageMessages.phone.placeHolder}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputWithIcon
          Icon={Users}
          label={signUpPageMessages.emergencyPerson.title}
          type={signUpPageMessages.emergencyPerson.type}
          name={signUpPageMessages.emergencyPerson.name}
          value={formData.emergencyPerson}
          onChange={handleChange}
          placeholder={signUpPageMessages.emergencyPerson.placeHolder}
        />
        <InputWithIcon
          Icon={Phone}
          label={signUpPageMessages.emergencyContact.title}
          type={signUpPageMessages.emergencyContact.type}
          name={signUpPageMessages.emergencyContact.name}
          value={formData.emergencyContact}
          onChange={handleChange}
          placeholder={signUpPageMessages.emergencyContact.placeHolder}
        />
      </div>

      <Button type="submit" loading={isLoading} className="w-full" size="lg">
        {signUpPageMessages.submit.title}
      </Button>

      <p className="text-center text-sm text-gray-600">
        {signUpPageMessages.alreadyAccount}
        <Link
          to={routes.login}
          className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
        >
          {signUpPageMessages.signinHere}
        </Link>
      </p>
    </form>
  </div>
);
