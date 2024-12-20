import * as RadixDialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import {CloseMenuIcon} from "@payloadcms/ui";
import type { ReactNode } from "react";
import React from "react";

type Props = {
  className?: string;
  trigger?: ReactNode;
} & RadixDialog.DialogProps;

export const Dialog = ({
  children,
  className,
  trigger,
  ...dialogProps
}: Props) => {
  const handleClose = () => {
    window.location.reload();
  };

  return (
    <RadixDialog.Root {...dialogProps}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay asChild>
          <div className={clsx("dialog-overlay", className)}>
            <RadixDialog.Content asChild>
              <div className={"dialog-content"}>
                <RadixDialog.Title className="dialog-title" style={{ marginBottom: "10px" }}>
                  Collection Documents Order
                </RadixDialog.Title>
                <RadixDialog.Close
                  className="close"
                  style={{ cursor: "pointer" }}
                  onClick={handleClose}
                >
                  <CloseMenuIcon />
                </RadixDialog.Close>
                {children}
              </div>
            </RadixDialog.Content>
          </div>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
