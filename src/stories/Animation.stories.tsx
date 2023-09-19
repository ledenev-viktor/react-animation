import { Animation } from "../animation";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

export default {
  title: "Effects/Animation",
  component: Animation,
  argTypes: {
    children: {
      type: "string",
      description: "Элемент, либо текст, для которого применяется анимация",
      default: "element",
    },
    type: {
      type: "string",
      description: "Тип анимации",
      default: "slideUp",
      options: ["slideUp", "slideDown", "slideLeft", "slideRight"],
      control: {
        type: "select",
      },
    },
    duration: {
      type: "number",
      description: "Продолжительность анимации",
      default: "300",
      control: {
        type: "number",
      },
    },
    running: {
      type: "boolean",
      description: "Скрытие, либо отображение элемента по boolean типу",
      default: true,
      control: {
        type: "boolean",
      },
    },
    entered: {
      type: "string",
      description: "CSS свойства, которые применяются в конце анимации",
      default: "",
      control: {
        type: "object",
      },
    },
  },
} as ComponentMeta<typeof Animation>;

const Template: ComponentStory<typeof Animation> = (args) => (
  <Animation {...args} />
);

export const Default = Template.bind({});

Default.args = {
  children: "Element",
  running: true,
  duration: 300,
  type: "slideUp",
  entered: { color: "red" },
};
