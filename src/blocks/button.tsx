import { Component, JSX, mergeProps, splitProps } from "solid-js";

import "./base.css";
import "./button.scss";

export type ButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & {
    uppercase?:boolean,
    rectangle: boolean,
    help: boolean,
    transparent: boolean,
    outline: boolean,
    round:boolean,
    rounded:boolean,
    square: boolean,
    color?: "primary" | "secondary" | "accent" | "danger" | "link" | "icon";
};

export const Button: Component<ButtonProps> = (props) => {
  const [local, buttonProps] = splitProps(props, ["uppercase", "rectangle", "help","transparent",
      "outline", "color", "round", "square", "classList"]);

  return (
    <button
      {...buttonProps}
      classList={mergeProps(local.classList ?? {}, {
        "sb-button": true,
        "uppercase": local.uppercase,
          "rectangle": local.rectangle,
          "help": local.help,
          "transparent": local.transparent,
          "outline": local.outline,
          "round": local.round,
          "rounded": local.rounded,
          "square": local.square,
      })}
    />
  );
};
