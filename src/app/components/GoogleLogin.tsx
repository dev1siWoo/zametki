"use client"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import React, { FC, useState } from "react"

interface GoogleLoginProps {
	children: React.ReactNode
}

const GoogleLogin: FC<GoogleLoginProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const singInGoogle = async () => {
		try {
			setIsLoading(true)
			await signIn("google", {
				callbackUrl: "http://localhost:3000/",
			})
		} catch (err) {
			setIsLoading(false)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<form action={singInGoogle}>
			<Button
				disabled={isLoading}
				type='submit'
				className='mt-4 w-full'
			>
				{isLoading && (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='h-4 w-4 mr-2 animate-spin'
					>
						<path d='M21 12a9 9 0 1 1-6.219-8.56' />
					</svg>
				)}
				{children}
			</Button>
		</form>
	)
}

export default GoogleLogin
