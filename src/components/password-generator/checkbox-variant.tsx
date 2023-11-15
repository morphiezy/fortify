import { memo } from "react";
import { Checkbox, Label } from "../ui";
import { CheckboxGenerator } from "@/lib/types/password-generator";

interface CheckboxGeneratorProps {
  variants: CheckboxGenerator[];
  updateChekbox: (v: CheckboxGenerator) => void;
}

function CheckBoxVariant({
  variants,
  updateChekbox,
}: CheckboxGeneratorProps): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-6 font-fira-code text-silver text-base animate-in zoom-in-95">
      {variants.map((variant) => (
        <div className="flex items-center space-x-2" key={variant.name}>
          <Checkbox
            id={variant.name}
            defaultChecked={variant.disabled}
            name={variant.name}
            checked={variant.enable}
            disabled={variant.disabled}
            onCheckedChange={() =>
              updateChekbox({
                name: variant.name,
                enable: !variant.enable,
                disabled: variant.disabled,
              })
            }
          />
          <Label
            htmlFor={variant.name}
            className="text-xs md:text-sm text-silver cursor-pointer"
          >
            {variant.name}
          </Label>
        </div>
      ))}
    </div>
  );
}

export default memo(CheckBoxVariant);
