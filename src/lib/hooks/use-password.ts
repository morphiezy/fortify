import { useState, useEffect } from "react";
import { useToast } from "./use-toast";
import { Options } from "generate-password-ts/dist/Options";
import generator from "generate-password-ts";

export type PasswordQualityType = {
  status: string;
  color: string;
};

export type HookPasswordReturn = {
  password: string;
  size: number;
  generate: (opt?: Options) => void;
  copy: () => Promise<void>;
  quality: PasswordQualityType;
};

export function usePassword(
  size: number,
  defaultPw?: string,
): HookPasswordReturn {
  const [password, setPassword] = useState<string>(defaultPw || "");
  const [options, setOptions] = useState<Options>({
    length: size,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: true,
    strict: true,
    exclude: "< >",
  });
  const [quality, setQuality] = useState<PasswordQualityType>(
    {} as PasswordQualityType,
  );

  const { toast } = useToast();

  const generate = (opt?: Options): void => {
    const newOptions = { ...options, ...opt };
    const pass = generator.generate(newOptions);

    setOptions(newOptions);
    setPassword(pass);

    void passwordQuality(pass.length);
  };

  const copy = async (): Promise<void> => {
    if (navigator?.clipboard) {
      try {
        await navigator.clipboard.writeText(password);
        toast({
          title: "Password Copied!",
          description: "Now you can pasting it anywhere",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed copy password",
          description: "Something wrong please try again",
        });
      }
    }
  };

  const passwordQuality = (pwLength: number = size) => {
    const qualityStatus = {} as PasswordQualityType;

    if (pwLength <= 7) {
      qualityStatus.status = "weak";
      qualityStatus.color = "bg-red-500";
    } else if (pwLength <= 11) {
      qualityStatus.status = "strong";
      qualityStatus.color = "bg-green-500";
    } else {
      qualityStatus.status = "very strong";
      qualityStatus.color = "bg-[#7306C9]";
    }

    setQuality(qualityStatus);
  };

  useEffect(() => {
    if (!defaultPw) generate();
    passwordQuality(size);
  }, []);

  return {
    copy,
    generate,
    size,
    password,
    quality,
  };
}
