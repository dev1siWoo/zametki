"use client"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import React, { useState } from "react"
import { useZametiki } from "../hooks/useZametki"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface PageZametkiProps {
	id: string
	Title: string
	description: string
	userId: string
}

const PageZametki: React.FC<PageZametkiProps> = ({
	id,
	Title,
	description,
	userId,
}) => {
	const { deleteZametki, editZametki } = useZametiki(userId)
	const [editedTitle, setEditedTitle] = useState(Title)
	const [editedDescription, setEditedDescription] = useState(description)


	const handleUpdateZametka = () => {
		editZametki(id, { title: editedTitle, description: editedDescription })
	}
	return (
		<div>
			<Card key={id}>
				<CardHeader>
					<CardTitle className='backgroung'>{Title}</CardTitle>
				</CardHeader>
				<CardContent>{description}</CardContent>
				<CardFooter className='flex justify-between'>
					<button
						onClick={() => deleteZametki(id)}
						className='rounded-md bg-slate-300 hover:bg-slate-600 hover:text-slate-200 duration-300 p-2'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 448 512'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='feather feather-external-link'
						>
							<polyline points='15 3 21 3 21 9'></polyline>
							<path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z' />
						</svg>
					</button>
					<Dialog>
						<DialogTrigger>
							<button
								className='rounded-md bg-slate-300 hover:bg-slate-600 hover:text-slate-200 duration-300 p-2 text-slate-600'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='feather feather-edit-3'
								>
									<path d='M12 20h9'></path>
									<path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'></path>
								</svg>
							</button>
						</DialogTrigger>
						<DialogContent>
							<DialogTitle>Редактирование заметки</DialogTitle>
							<Input
								placeholder='Заголовок'
								value={editedTitle}
								onChange={(e) => setEditedTitle(e.target.value)}
								required
							/>
							<Textarea
								placeholder='Описание'
								value={editedDescription}
								onChange={(e) =>
									setEditedDescription(e.target.value)
								}
								required
							/>
							<Button onClick={handleUpdateZametka}>
								Обновить заметку
							</Button>
						</DialogContent>
					</Dialog>
				</CardFooter>
			</Card>
		</div>
	)
}

export default PageZametki
