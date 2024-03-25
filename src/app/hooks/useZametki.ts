"use client"
import { useEffect, useState } from "react"

export type Zametki = Array<{
	id: string
	Title: string
	description: string
	userId: string
}>

export function useZametiki(userId: string) {
	const [zametki, setZametki] = useState<Zametki>([])

	const getZametki = async () => {
		const data = await fetch(
			`http://localhost:3000/api/zametki?userId=${userId}`,
			{ cache: "no-cache" }
		).then((res) => res.json())
		console.log("da")
		setZametki(data)
	}

	const addZametki = async (title: string, description: string) => {
		try {
			const response = await fetch("http://localhost:3000/api/zametki", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, description }),
			})
			const newZametka = await response
				.json()
				.then(() => window.location.reload())
		} catch (error) {
			console.error("Error adding note:", error)
		}
	}

	const deleteZametki = async (id: string) => {
		try {
			await fetch(`http://localhost:3000/api/zametki?id=${id}`, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then(() => window.location.reload())
		} catch (err) {
			console.log(err)
		}
	}

	const editZametki = async (
		id: string,
		updatedData: { title: string; description: string }
	) => {
		try {
			if (!updatedData.title.trim() || !updatedData.description.trim()) {
				alert("Заголовок или описание неможет быть пустым!")
				return
			}
			await fetch(`http://localhost:3000/api/zametki?id=${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedData),
			})
				.then((res) => res.json())
				.then(() => window.location.reload())
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getZametki()
	}, [userId])

	return { zametki, addZametki, editZametki, deleteZametki }
}
