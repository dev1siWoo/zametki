"use client";
import React, { useState } from "react";
import LogoutButton from "../components/LogoutButton";
import PageZametki from "../components/CardGet";
import Header from "../components/Header";
import { useZametiki } from "../hooks/useZametki";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const page = ({ params }: { params: { id: string } }) => {
  const userId = params.id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { zametki, addZametki } = useZametiki(userId);

  const handleAddZametki = async () => {
    if (title.trim() !== "" && description.trim() !== "") {
      await addZametki(title, description);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div>
      <Header />
      <div className="m-auto mt-5 w-[95%] max-w-[1400px] flex gap-5 flex-col">
        <div className="flex items-center justify-center">
          <Dialog>
            <DialogTrigger>
              <Card>
                <CardHeader></CardHeader>
                <CardContent>Добавить заметку</CardContent>
                <CardFooter></CardFooter>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавление заметки</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button type="submit" onClick={handleAddZametki}>
                Добавить заметку
              </Button>
            </DialogContent>
          </Dialog>
        </div>
        {zametki.length ? (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {zametki?.map((zametka) => (
              <PageZametki
                key={zametka.id}
                id={zametka.id}
                Title={zametka.Title}
                description={zametka.description}
                userId={zametka.userId}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center text-5xl">Здесь пусто</div>
        )}
        <div className="flex justify-center align-bottom mt-5">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default page;
