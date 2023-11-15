import { useEffect, useState, useCallback } from "react";
import { useScramble } from "use-scramble";
import { useAuth } from "@/lib/context/auth";
import { usePassword } from "@/lib/hooks/use-password";
import { cn } from "@/lib/utils";
import {
  CheckboxGenerator,
  PasswordGeneratorProps,
} from "@/lib/types/password-generator";
import QualityIndicator from "./quality-indicator";
import CheckBoxVariant from "./checkbox-variant";
import { Slider } from "../ui";

import { encrypt } from "@/lib/crypto";
import { Separator, Tooltip, Icon, Button } from "../ui";
import GenerateIcon from "@/assets/icons/generate-icon.svg";
import CopyIcon from "@/assets/icons/copy-icon.svg";

export function PasswordGenerator({
  passwordSize,
  onChange,
  defaultPw,
}: PasswordGeneratorProps): JSX.Element {
  const [pwVariants, setPwVariants] = useState<CheckboxGenerator[]>([
    {
      name: "uppercase",
      enable: true,
      disabled: false,
    },
    {
      name: "lowercase",
      enable: true,
      disabled: false,
    },
    {
      name: "numbers",
      enable: true,
      disabled: false,
    },
    {
      name: "symbols",
      enable: true,
      disabled: false,
    },
  ]);

  const [advanceMode, setAdvanceMode] = useState<boolean>(false);

  const { copy, size, generate, password, quality } = usePassword(
    passwordSize,
    defaultPw,
  );

  const { user } = useAuth();
  const { ref } = useScramble({
    text: password,
  });

  const updateVariants = useCallback(
    (variant: CheckboxGenerator) => {
      const activeVariants = pwVariants.filter(
        (v) =>
          (v.name === variant.name && variant.enable) ||
          (v.name !== variant.name && v.enable),
      );

      return pwVariants.map((v) => {
        const target = activeVariants.find((i) => i.name === v.name);

        return target
          ? {
              name: target.name,
              enable:
                target.name === variant.name ? variant.enable : target.enable,
              disabled: activeVariants.length === 1,
            }
          : v.name === variant.name
          ? variant
          : v;
      });
    },
    [pwVariants],
  );

  const onChangeboxChange = useCallback(
    (variant: CheckboxGenerator): void => {
      const variants = updateVariants(variant);
      const config = variants.reduce((acc, cur) => {
        acc[cur.name] = cur.enable;
        return acc;
      }, {} as Record<string, boolean>);

      generate({ ...config, length: password.length });
      setPwVariants(variants);
    },
    [pwVariants, password.length],
  );

  useEffect(() => {
    if (onChange) {
      const encrypted = user.pin ? encrypt(password, user.pin) : password;
      onChange(encrypted);
    }
  }, [password]);

  return (
    <div className="w-full flex flex-col space-y-7 md:space-y-10 select-none">
      <div className="w-full flex flex-col">
        <div
          className={cn(
            "w-full flex flex-shrink items-center flex-grow h-14",
            "bg-onyx rounded-2xl text-base border border-graphite",
            !advanceMode ? "pl-3" : "",
          )}
        >
          {advanceMode || !defaultPw ? (
            <div
              className={cn(
                "border border-transparent border-r-graphite",
                "pl-1 w-8 md:w-[35px] h-5",
                "flex justify-center items-center flex-shrink-0",
              )}
            >
              <p className="text-sapphire font-semibold text-xs md:text-sm -mt-[3px] animate-in zoom-in-90 duration-300 ease-out">
                {password.length}
              </p>
            </div>
          ) : (
            false
          )}
          <p
            ref={ref}
            className={cn(
              "px-2 md:px-3 w-full max-w-[200px] sm:max-w-[61.5%] overflow-hidden",
              "text-ellipsis whitespace-nowrap font-fira-code text-silver text-sm md:text-base",
            )}
          ></p>
          <div className="ml-auto flex flex-shrink-0 items-center space-x-1.5 pr-2.5">
            {advanceMode || !defaultPw ? (
              <div className="animate-in zoom-in-90 duration-300 ease-out">
                <QualityIndicator
                  color={quality.color}
                  status={quality.status}
                />
              </div>
            ) : (
              false
            )}
            <Tooltip
              trigger={<Icon onClick={copy} svgURL={CopyIcon} />}
              content="Copy"
            />
            <Separator orientation="vertical" className="h-5 bg-graphite" />
            <Tooltip
              trigger={
                <Icon onClick={() => generate()} svgURL={GenerateIcon} />
              }
              content="Generate"
            />
          </div>
        </div>
        {defaultPw ? (
          <Button
            className={cn(
              "w-fit h-fit ml-auto mt-2.5 py-1 px-1 bg-transparent hover:bg-transparent rounded-sm text-[10px] hover:text-silver font-bold transition-all duration-300",
              advanceMode
                ? "text-cyan-300 hover:text-cyan-300"
                : "text-silver/50",
            )}
            onClick={() => setAdvanceMode(!advanceMode)}
          >
            ADVANCE MODE
          </Button>
        ) : (
          false
        )}
      </div>
      {advanceMode || !defaultPw ? (
        <Slider
          name="slider-password-length"
          defaultValue={[size]}
          onValueCommit={(num) => generate({ length: +num })}
          min={6}
          max={62}
          step={1}
          className="cursor-pointer animate-in zoom-in-95"
        />
      ) : (
        false
      )}
      {advanceMode || !defaultPw ? (
        <CheckBoxVariant
          variants={pwVariants}
          updateChekbox={onChangeboxChange}
        />
      ) : (
        false
      )}
    </div>
  );
}
