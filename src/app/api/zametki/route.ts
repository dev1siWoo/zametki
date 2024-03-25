import { authOptions } from "@/app/utils/auth"
import prisma from "@/app/utils/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const userId = searchParams.get("userId")

	let zametki

	if (userId) {
		zametki = await prisma.zametka.findMany({
			where: {
				userId,
			},
		})
	} else {
		zametki = await prisma.zametka.findMany()
	}

	return NextResponse.json(zametki)
}

export async function POST(req: Request) {
	const session = await getServerSession(authOptions)

	if (!session?.user?.email) {
		return new Response("Unauthorized", { status: 401 })
	}

	const { title, description } = await req.json()

	const newZametka = await prisma.zametka.create({
		data: {
			Title: title,
			description,
			user: {
				connectOrCreate: {
					where: {
						email: session.user.email,
					},
					create: {
						email: session.user.email,
						name: session.user.name,
					},
				},
			},
		},
	})

	return NextResponse.json(newZametka)
}

export async function PUT(req: Request) {
	const { searchParams } = new URL(req.url)
	const zametkaId = searchParams.get("id")
  
	if (!zametkaId) {
	  return new Response("Zametka ID is required", { status: 400 })
	}
  
	const existingZametka = await prisma.zametka.findUnique({
	  where: {
		id: zametkaId,
	  },
	})
  
	if (!existingZametka) {
	  return new Response("Заметка не найдена", { status: 404 })
	}
  
	const { Title, description } = await req.json()
  
	const updatedZametka = await prisma.zametka.update({
	  where: {
		id: zametkaId,
	  },
	  data: {
		Title,
		description,
	  },
	})
  
	return NextResponse.json(updatedZametka)
  }
  

export async function DELETE(req: Request) {
	const { searchParams } = new URL(req.url)
	const zametkaId = searchParams.get("id")

	if (!zametkaId) {
		return new Response("Zametka ID is required", { status: 400 })
	}

	const existingZametka = await prisma.zametka.findUnique({
		where: {
			id: zametkaId,
		},
	})

	if (!existingZametka) {
		return new Response("Заметка не найдена", { status: 404 })
	}

	const deletedZametka = await prisma.zametka.delete({
		where: {
			id: zametkaId,
		},
	})

	return NextResponse.json(deletedZametka)
}
