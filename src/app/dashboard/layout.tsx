// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { SideBar } from '@/components';
import { TopMenu } from '@/components';

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            {/* @ts-expect-error Server Component */}
            <SideBar />

            {/* Main Layout content - Contenido principal del Layout */}
            <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">

                <TopMenu />

                {/* TODO: Contenido en el Layout.tsx */}
                <div className="px-6 pt-6 bg-white p-2 m-2 pb-5 rounded">
                    {children}
                    {/* TODO: Fin del contenido en el Layout.tsx */}
                </div>
            </div>
        </>
    );
}