import { FC, PropsWithChildren } from "react";
import classNames from "clsx";
import * as Switch from "@radix-ui/react-switch";

type ThemeType = "large" | "small";

type AssetsSwitcherProps = Switch.SwitchProps & {
  theme?: ThemeType;
  className?: string;
};

const AssetsSwitcher: FC<AssetsSwitcherProps> = ({
  theme = "large",
  checked,
  onCheckedChange,
  className,
}) => {
  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={classNames(
        "flex items-center",
        theme === "large" && "rounded-[.875rem] after:rounded-[.875rem] gap-2",
        theme === "small" && "rounded-[.625rem] after:rounded-[.625rem] gap-1",
        "bg-black/10",
        "transition-colors",
        "hover:bg-brand-main/[.05] focus-visible:bg-brand-main/[.05]",
        "p-1",
        "relative",
        "after:absolute after:inset-0 after:border after:border-brand-main/[.05] after:pointer-events-none",
        className,
      )}
    >
      <SwitchOption
        theme={theme}
        className={classNames(!checked && "font-bold")}
      >
        Tokens
      </SwitchOption>
      <SwitchOption
        theme={theme}
        className={classNames(checked && "font-bold")}
      >
        NFTs
      </SwitchOption>
      <Switch.Thumb
        className={classNames(
          "absolute",
          "bg-brand-main/[.05]",
          "rounded-[.625rem]",
          "transition-transform",
          theme === "large" && "w-[calc(50%-0.25rem-0.25rem)]",
          theme === "small" && "w-[calc(50%-0.125rem-0.25rem)]",
          theme === "small" && "h-8 rounded-md",
          theme === "large" && "h-9",
          theme === "small" && checked && "translate-x-[calc(100%+0.25rem)]",
          theme === "large" && checked && "translate-x-[calc(100%+0.5rem)]",
        )}
      />
    </Switch.Root>
  );
};

type SwitchOptionProps = PropsWithChildren<{
  theme?: ThemeType;
  className?: string;
}>;

const SwitchOption: FC<SwitchOptionProps> = ({
  theme,
  children,
  className,
}) => (
  <span
    className={classNames(
      "px-2",
      "w-full flex items-center justify-center",
      "text-base color-brand-light",
      theme === "small" && "py-1",
      theme === "large" && "py-1.5",
      className,
    )}
  >
    {children}
  </span>
);

export default AssetsSwitcher;
