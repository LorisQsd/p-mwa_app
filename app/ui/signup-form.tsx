import { useState } from "react";
import Input from "./input";
import Button from "./button";
import {
  AtSymbolIcon,
  EyeSlashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

export default function SignupForm() {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);

  // HANDLERS //
  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handlePasswordConfirmationVisibility = () => {
    setIsPasswordConfirmationVisible((prevState) => !prevState);
  };

  return (
    <form className="mt-5 flex flex-col gap-2">
      <div className="md:flex md:justify-between">
        <Input
          label="Nom"
          isRequired
          type="text"
          value={lastname}
          onChange={setLastname}
        />

        <Input
          label="Prénom"
          isRequired
          type="text"
          value={firstname}
          onChange={setFirstname}
        />
      </div>

      <Input
        label="Email"
        isRequired
        type="email"
        className="mt-5"
        value={email}
        onChange={setEmail}
      >
        <AtSymbolIcon className="absolute text-primary-400 top-1/2 -translate-y-1/2 left-2 w-[20px] md:w-[24px]" />
      </Input>

      <Input
        label="Mot de passe"
        isRequired
        type={isPasswordVisible ? "text" : "password"}
        className="mt-5"
        value={password}
        onChange={setPassword}
      >
        {isPasswordVisible ? (
          <EyeIcon
            onClick={handlePasswordVisibility}
            className="absolute cursor-pointer text-primary-400 top-1/2 -translate-y-1/2 left-2 w-[20px] md:w-[24px]"
          />
        ) : (
          <EyeSlashIcon
            onClick={handlePasswordVisibility}
            className="absolute cursor-pointer text-primary-400 top-1/2 -translate-y-1/2 left-2 w-[20px] md:w-[24px]"
          />
        )}
      </Input>

      <Input
        label="Confirmation de mot de passe"
        isRequired
        type={isPasswordConfirmationVisible ? "text" : "password"}
        value={passwordConfirmation}
        onChange={setPasswordConfirmation}
      >
        {isPasswordConfirmationVisible ? (
          <EyeIcon
            onClick={handlePasswordConfirmationVisibility}
            className="absolute cursor-pointer text-primary-400 top-1/2 -translate-y-1/2 left-2 w-[20px] md:w-[24px]"
          />
        ) : (
          <EyeSlashIcon
            onClick={handlePasswordConfirmationVisibility}
            className="absolute cursor-pointer text-primary-400 top-1/2 -translate-y-1/2 left-2 w-[20px] md:w-[24px]"
          />
        )}
      </Input>

      <Button content="S'inscrire" type="submit" className="mt-10" />
    </form>
  );
}
