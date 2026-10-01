import Image from "next/image";

export default function SchoolLogo({ className = "", alt = "" }: { className?: string; alt?: string }) {
  return (
    <Image
      src="/schoolLogo.png"
      alt={alt}
      width={144}
      height={144}
      priority
      className={`h-28 w-28 shrink-0 rounded-full object-contain sm:h-36 sm:w-36 ${className}`}
    />
  );
}
