"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CiBookmarkCheck } from "react-icons/ci"

interface Items {
    title: string,
    icon: React.ReactNode,
    href: string,
}

export const SidebarItem = ({ title, href, icon }: Items) => {
    const pathName = usePathname();

    return (
        <li key={title} >
            <Link href={href} className={`hover: bg-gradient-to-r hover:bg-sky-600 hover:text-white px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group ${href === pathName ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400" : ""}`}>
                {icon}
                <span className="group-hover:text-white-700">{title}</span>
            </Link>
        </li >
    )
}
