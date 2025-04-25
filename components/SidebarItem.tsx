// "use client"
// import { usePathname, useRouter } from "next/navigation";
// import React from "react";

// export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
//     const router = useRouter();
//     const pathname = usePathname()
//     const selected = pathname === href

//     return <div className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer  p-2 pl-8`} onClick={() => {
//         router.push(href);
//     }}>
//         <div className="pr-2">
//             {icon}
//         </div>
//         <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
//             {title}
//         </div>
//     </div>
// }





"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({
  href,
  title,
  icon,
  protected: isProtected,
  isLoggedIn,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
  protected?: boolean;
  isLoggedIn?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  const handleClick = () => {
    if (isProtected && !isLoggedIn) {
      router.push("/api/auth/signin"); // Redirect to the signin page
    } else {
      router.push(href); // Navigate normally if not protected or the user is logged in
    }
  };

  return (
    <div
      className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer p-2 pl-8`}
      onClick={handleClick}
    >
      <div className="pr-2">
        {icon}
      </div>
      <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
        {title}
      </div>
    </div>
  );
};
