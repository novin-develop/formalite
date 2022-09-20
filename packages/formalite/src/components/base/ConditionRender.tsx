interface ConditionRenderProps {
  condition: boolean;
  fallback?: JSX.Element;
  children: JSX.Element;
}

export const ConditionRender = ({
  condition,
  children,
  fallback,
}: ConditionRenderProps) => {
  if (condition) {
    return children;
  }
  if (fallback) {
    return fallback;
  }
  return null;
};
