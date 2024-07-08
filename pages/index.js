import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()
  return (
    <Layout>
      <div className="text-black flex justify-between">
        <h2>
          Welcome, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex  gap-2 text-black rounded-lg overflow-hidden" >
          <img src={session?.user?.image} alt="" className="w-8 h-8 rounded-full" />
          <span className="px-1">
            {session?.user?.name}
          </span>
        </div>
      </div>
    </Layout>

  )
}
