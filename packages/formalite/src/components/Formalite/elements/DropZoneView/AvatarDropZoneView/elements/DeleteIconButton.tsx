import React, { Dispatch, SetStateAction } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Grow, IconButton } from "@mui/material";
import { CustomFile, OutsideFile } from "@components/Formalite";
import { FormikProps, FormikValues } from "formik";

type DeleteIconButtonPropsType<T> = {
  name: string;
  file: (CustomFile | OutsideFile)[];
  uploadController: AbortController;
  setFile: Dispatch<SetStateAction<(CustomFile | OutsideFile)[]>>;
  formik: FormikProps<T>;
  onDelete: (
    id: string,
    isFromDefault: boolean,
    isSuccess: boolean
  ) => Promise<void>;
};

export const DeleteIconButton = <T extends FormikValues>(
  props: DeleteIconButtonPropsType<T>
) => {
  const { file, uploadController, setFile, formik, onDelete, name } = props;

  return (
    <Grow
      in={file[0] && !["uploading", "deleting"].includes(file[0].status || "")}
    >
      <IconButton
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 5,
          background: theme.palette.background.paper,
          boxShadow: 1,
          "&:hover": {
            background:
              theme.palette.mode === "dark"
                ? theme.palette.grey["800"]
                : theme.palette.grey["200"],
          },
        })}
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          uploadController?.abort();
          setFile((pre) => {
            const tempArray = [...pre];
            if (tempArray.length) {
              tempArray[0].status = "deleting";
            }
            return tempArray;
          });
          try {
            file[0]?.controller.abort();
          } catch (e1) {
            // Do nothing
          }
          if (onDelete) {
            onDelete(
              file[0]?.uid || "",
              file[0]?.original === "default",
              !!file[0]?.errorText?.length
            )
              .then(() => {
                formik.setFieldValue(name, {});
                setFile([]);
              })
              .catch((e1) => {
                setFile((pre) => {
                  const tempArray = [...pre];
                  if (tempArray.length && tempArray[0]?.status) {
                    tempArray[0].status = "error";
                    tempArray[0].errorText = e1.message;
                  }
                  return tempArray;
                });
              });
          }
        }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Grow>
  );
};
