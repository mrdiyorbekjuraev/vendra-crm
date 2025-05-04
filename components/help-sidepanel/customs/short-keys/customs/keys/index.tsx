import { Kbd } from "@/components/ui/kbd";
import React, { ReactNode } from "react";

type TKeyProps = {
  action: string;
  short_key: ReactNode;
};
const Keys = (props: TKeyProps) => {
  const { short_key, action } = props;
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-sm">{action}</span>
      {short_key}
    </div>
  );
};

export default Keys;
