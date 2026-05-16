import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  reveal?: boolean;
};

export function Hairline({ className, reveal = false }: Props) {
  return (
    <div className={cn("hairline w-full", reveal && "grow-line", className)} />
  );
}
