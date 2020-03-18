import React from "react";

export interface SizedBoxProps {
  children?: React.ReactNode;
  width?: string;
  height?: string;
}

export const SizedBox: React.FC<SizedBoxProps> = ({
  children,
  width,
  height
}) => <div style={{ width: width, height: height }}>{children}</div>;
