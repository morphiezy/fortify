export interface PasswordGeneratorProps {
  passwordSize: number;
  defaultPw?: string;
  onChange?: (value: string) => void;
}

export interface CheckboxGenerator {
  name: "uppercase" | "lowercase" | "numbers" | "symbols";
  enable: boolean;
  disabled: boolean;
}
