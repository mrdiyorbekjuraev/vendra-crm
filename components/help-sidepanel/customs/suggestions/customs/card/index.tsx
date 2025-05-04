"use client";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import instruction_dark from "@/public/icons/empty-state/instruction-dark.svg";
import instruction_light from "@/public/icons/empty-state/instruction-light.svg";

type TInstructionCard = {
  title: string;
  description: string;
};

const InstructionCard = (props: TInstructionCard) => {
  const { title, description } = props;
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";
  const instructionImage = isDarkTheme ? instruction_dark : instruction_light;

  return (
    <motion.div>
      <div className="w-full  relative flex flex-col items-center">
        <div className="flex gap-3">
          <motion.div
            whileHover="hover"
            initial="rest"
            className="flex items-center gap-2 h-[72px] w-[337px] cursor-pointer border rounded-2xl dark:hover:bg-muted/50 hover:bg-gray-50 transition-colors px-2 py-2"
          >
            <motion.div className="flex-shrink-0 w-14 h-14 rounded-[13px] border flex items-center justify-center overflow-hidden">
              <Image
                src={instructionImage}
                alt="Instruction"
                width={56}
                height={56}
                className="object-cover"
              />
            </motion.div>
            <div className="text-sm ml-2">
              <Typography
                variant="p"
                className={cn("font-medium text-primary text-sm")}
              >
                {title}
              </Typography>
              <Typography
                variant="p-muted"
                className={cn(
                  "font-medium  text-xs text-muted-foreground line-clamp-2"
                )}
              >
                {description}
              </Typography>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default InstructionCard;
