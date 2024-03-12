import Image from "next/image"
import Link from "next/link"
import { IoCalendarOutline, IoCartOutline, IoCheckboxOutline, IoGlobeOutline, IoListOutline, IoPersonOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci"
import { LogoutButton, SidebarItem } from ".."
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const menuItems = [
    {
        title: "Dashboard",
        icon: <IoCalendarOutline />,
        href: "/dashboard",
    },
    {
        title: "Rest TODOs",
        icon: <IoCheckboxOutline />,
        href: "/dashboard/rest-todos",
    },
    {
        title: "Server Actions",
        icon: <IoListOutline />,
        href: "/dashboard/server-actions",
    },
    {
        title: "Cookies",
        icon: <IoGlobeOutline />,
        href: "/dashboard/cookies"
    },
    {
        title: "Products",
        icon: <IoCartOutline />,
        href: "/dashboard/products"
    },
    {
        title: "Profile",
        icon: <IoPersonOutline />,
        href: "/dashboard/profile"
    }
]

export const SideBar = async() => {
    const session = await getServerSession(authOptions);
    const name = session?.user?.name ?? "No Name";
    const email = session?.user?.email ?? "";
    const image = session?.user?.image ?? "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";

    return (
        <>
            {/* TODO: src/components <Sidebar /> */}
            <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
                <div>
                    <div className="-mx-6 px-6 py-4">
                        {/* TODO: Next/Link hacia dashboard */}
                        <Link href="/dashboard" title="home">
                            {/* Next/Image */}
                            <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" width={50} height={50} className="w-32" alt="tailus logo" />
                        </Link>
                    </div>

                    <div className="mt-8 text-center">
                        {/* Next/Image */}
                        <Image src={image} width={50} height={50} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
                        <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{name}</h5>
                        <span className="hidden text-gray-400 lg:block">{email}</span>
                    </div>
                    <ul className="space-y-2 tracking-wide mt-8">
                    {
                        menuItems.map( item => ( <SidebarItem key={item.href} {...item} /> ) )
                    }
                    </ul>
                    {/* <SidebarItem /> */}
                </div>

                <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <LogoutButton />
                </div>
            </aside>

            {/*TODO: Fin del <Sidebar /> */}
        </>
    )
}
