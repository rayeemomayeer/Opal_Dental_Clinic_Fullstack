import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center", className)}>
      <Image
        src="/logo.svg"
        alt="Opal Dental Clinic & Implant Centre"
        width={120}
        height={48}
        className="h-20 w-auto"
        priority
        unoptimized
      />
    </span>
  );
}
