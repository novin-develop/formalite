import { ReactNode, useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";
import { Stack } from "@mui/material";

type DropComponentProps = {
  children: ReactNode
} & Omit< DroppableProps, "children">

export const DropComponent = (props:DropComponentProps) => {
  const {children, ...otherProps} = props;

  const [ enabled, setEnabled ] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Droppable {...otherProps}>
      {(provided, snapshot) => (
        <Stack spacing={2}  {...provided.droppableProps} ref={provided.innerRef}>
          {props.children}
        </Stack>
      )}
    </Droppable>
  );
}
