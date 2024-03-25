import { getServerSession } from "next-auth"
import { authOptions } from "./utils/auth"
import Header from "./components/Header"
import LoginWindow from "./components/LoginWindow"
import { redirect } from "next/navigation"

export default async function Home() {
	const session = await getServerSession(authOptions)
	if (session?.user?.email) {
		const user = await prisma?.user.findUnique({
			where: {
				email: session.user.email,
			},
		})

		const userId = user?.id

		if (session) {
			return redirect(`/${userId}`)
		}
	}

	return (
		<div>
			<Header />
			<div className='w-screen h-screen flex flex-col items-center text-center justify-center'>
				<LoginWindow />
			</div>
		</div>
	)
}
