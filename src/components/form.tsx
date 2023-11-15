import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Label, Button } from "./ui";
import { formSchema, FormSchema } from "@/lib/validations/form-validation";
import { FormProps } from "@/lib/types/form";
import { PasswordGenerator } from "./password-generator";

export function Form({
  defaultValues,
  formSubmit,
  passwordGenerator,
}: FormProps): JSX.Element {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const submit = (data: FormSchema) => {
    formSubmit(data, () => form.reset());
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-5">
        <Input
          type="text"
          label="Title"
          placeholder="Ex: Second Facebook Account"
          {...form.register("name")}
        />
        <Input
          type="text"
          label="Platform name"
          placeholder="Facebook"
          {...form.register("platform")}
        />
        <Input
          type="text"
          label="Email or username"
          placeholder="example@email.com"
          {...form.register("account")}
        />
        <div className="flex flex-col space-y-2.5">
          <Label htmlFor="password" className="text-sm text-silver">
            Password
          </Label>
          <Controller
            name="password"
            render={({ field: { onChange } }) => (
              <PasswordGenerator onChange={onChange} {...passwordGenerator} />
            )}
          />
        </div>
        <div className="w-full">
          <Button onClick={form.handleSubmit(submit)} className="w-full mt-8">
            Save Password
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
