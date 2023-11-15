import { FormSchema } from "../validations/form-validation";
import { UseFormReset } from "react-hook-form";
import { PasswordGeneratorProps } from "./password-generator";

export type FormSubmitHandler = (
  data: FormSchema,
  callback?: UseFormReset<FormSchema>,
) => void;

export interface FormProps {
  defaultValues?: FormSchema;
  formSubmit: FormSubmitHandler;
  passwordGenerator: Omit<PasswordGeneratorProps, "onChange">;
}
