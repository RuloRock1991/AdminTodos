import { WidgetItem } from "@/components/WidgetItem";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if ( !session ){
    redirect("/api/auth/signin");
  }
  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        <WidgetItem title="Usuario conectado Server Side">
            <div className="flex flex-col">
              <span>{session.user?.name}</span>
              <span>{session.user?.email}</span>
              <span>{session.user?.image}</span>
            </div>
        </WidgetItem>
      </div>
    </>
  );
}