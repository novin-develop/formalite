import React, { useState } from "react";
import { SketchPicker } from "react-color";

interface ChoromPickerProps {
  colorPicked: string;
  onColorChange: (selectedColor: string) => void;
}

export const ChromePickerComponent = ({
  colorPicked,
  onColorChange,
}: ChoromPickerProps) => {
  const [currentColor, setCurrentColor] = useState(colorPicked);

  return (
    <SketchPicker
      color={currentColor}
      onChange={(value) => setCurrentColor(value.hex)}
      onChangeComplete={(value) => {
        onColorChange(value.hex);
      }}
    />
  );
};
