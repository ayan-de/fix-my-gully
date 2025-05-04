import React from "react";

type Props = {
  children: React.ReactNode;
};

const BorderLayout = ({ children }: Props) => {
  return (
    <div className="border-4 border-dashed border-yellow-500 p-4 min-h-screen box-border">
      {children}
    </div>
  );
};

export default BorderLayout;
