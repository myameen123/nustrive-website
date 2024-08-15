import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
function SidebarItem({ icon, label, href }) {
  const Icon = icon;
  const pathname = usePathname();
  const router = useRouter();
  const isAtive = (pathname === "/" && href === "/") || pathname === href;

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "xlex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isAtive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className=" flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isAtive && "text-sky-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-[#4463FB] h-full transition-all",
          isAtive && "opacity-100"
        )}
      />
    </button>
  );
}

export default SidebarItem;
