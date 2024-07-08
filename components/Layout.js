import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav";

export default function Layout({ children }) {
    const { data: session } = useSession()
    if (!session) {
        return (<div className="bg-blue-700 w-screen h-screen flex items-center">
            {/* <div className="flex text-center w-full">
                <b> Welocme To Admin Panel </b>
            </div> */}
            <div className="text-center w-full">
                <button on onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg"> Login with Google </button>
            </div>
        </div>)
    }
    return (
        <div className="bg-blue-900 min-h-screen flex">
            <Nav />
            <div className="bg-white flex-grow mr-2 mt-2 mb- 2 rounded-lg p-4 ">
                {children}
            </div>
        </div>
    );
}
