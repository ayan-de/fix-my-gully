import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold", font.className)}>
        <Image
          src="/marker.png"
          width={50}
          height={50}
          alt="Logo picure"
          style={{ display: "block", margin: "0 auto" }}
        />
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
