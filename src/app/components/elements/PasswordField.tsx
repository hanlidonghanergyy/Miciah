import { forwardRef, useState } from "react";

import Input, { InputProps } from "./Input";
import IconedButton from "./IconedButton";
import { ReactComponent as EyeIcon } from "app/icons/eye.svg";
import { ReactComponent as OpenedEyeIcon } from "app/icons/opened-eye.svg";

const PasswordField = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "ref" | "type" | "actions">
>(({ ...rest }, ref) => {
  const [show, setShow] = useState(false);

  return (
    <Input
      ref={ref}
      type={show ? "text" : "password"}
      actions={
        <IconedButton
          Icon={show ? EyeIcon : OpenedEyeIcon}
          aria-label={`${show ? "Hide" : "Show"} password`}
          theme="tertiary"
          onClick={() => setShow(!show)}
        />
      }
      {...rest}
    />
  );
});

export default PasswordField;
