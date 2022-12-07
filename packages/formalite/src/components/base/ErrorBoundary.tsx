import { useI18nContext } from "@components/base/I18nProvider";
import { alpha, Box, Button, styled, Typography } from "@mui/material";
import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

const FallBackContainer = styled(Box)(({ theme }) => {
  const isLight: boolean = theme.palette.mode === "light";
  return {
    backgroundColor: isLight
      ? alpha(theme.palette.error.main, 0.08)
      : alpha(theme.palette.error.main, 0.16),
    color: theme.palette.error.main,
    minHeight: "18.75rem",
  };
}) as any;

const FallBackButton = styled(Button)(({ theme }) => ({
  textDecoration: "underline",
  fontWeight: theme.typography.fontWeightRegular,
})) as any;

const FallBack = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { t } = useI18nContext();
  return (
    <FallBackContainer
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
          {t("error_boundary_title")}
        </Typography>
        <Typography variant="body1">{t("error_boundary_body")}</Typography>
        <FallBackButton color="error" onClick={() => resetErrorBoundary()}>
          {t("error_boundary_btn")}
        </FallBackButton>
      </Box>
    </FallBackContainer>
  );
};

interface ErrorBoundaryWrapperProps {
  children: React.ReactChild;
}
const ErrorBoundaryWrapper = ({ children }: ErrorBoundaryWrapperProps) => {
  return <ErrorBoundary FallbackComponent={FallBack}>{children}</ErrorBoundary>;
};
export default ErrorBoundaryWrapper;
