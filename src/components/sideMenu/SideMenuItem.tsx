import { usePathname } from "next/navigation";
import Link from "next/link";

const SideMenuItem = ({
  href,
  texto,
  children,
}: {
  href: string;
  texto: string;
  children: any;
}) => {
  const pathname = usePathname();

  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <li
      className={`w-full hover:bg-white/10 duration-300 ${
        isActive ? "bg-white/10" : ""
      }`}
    >
      <Link
        href={href}
        className={`group w-full py-4 border-t-[5px] md:border-l-[5px] md:border-t-0 hover:border-primaryColor flex flex-col gap-y-1 items-center text-xs font-semibold duration-300 ${
          isActive ? "border-primaryColor" : "border-transparent"
        }`}
      >
        {children}
        <span
          className={`text-center group-hover:text-white duration-100 ${
            isActive ? "text-white" : "text-white/70"
          }`}
        >
          {texto}
        </span>
      </Link>
    </li>
  );
};

export default SideMenuItem;
