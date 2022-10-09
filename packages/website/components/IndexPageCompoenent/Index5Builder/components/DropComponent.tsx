import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Stack } from "@mui/material";

type DropComponentProps = {
  children:JSX.Element[]
}

export const DropComponent = (props:DropComponentProps) => {

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
    <Droppable droppableId={"droppable"}>
      {(provided, snapshot) => (
        <Stack spacing={2}  {...provided.droppableProps} ref={provided.innerRef}>
          {props.children}
        </Stack>
      )}
    </Droppable>
  );
}
