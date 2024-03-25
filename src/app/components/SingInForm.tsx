"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function SingInForm() {
	const [email, setEmail] = useState<null | string>(null)

	async function SingInWithEmail() {
		const singInResult = await signIn("email", {
			email: email,
			callbackUrl: `${window.location.origin}`,
		})
	}
	return (
		<form action={SingInWithEmail}>
			<div className='flex flex-col gap-y-2'>
				<Label>Email</Label>
				<Input
					onChange={(e) => setEmail(e.target.value)}
					name='email'
					type='email'
					placeholder='name@example.com'
				/>
			</div>
			<Button
				type='submit'
				className='mt-4 w-full'
			>
				Войти с Email
			</Button>
		</form>
	)
}
