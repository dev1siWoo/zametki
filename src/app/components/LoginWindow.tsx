import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SingInForm from "./SingInForm";
import GoogleLogin from "./GoogleLogin";

const LoginWindow = () => {
  return (
    <Suspense>
      <div>
        <Card>
          <CardHeader>
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Приветствуем на сайте по созданию заметок
            </h3>
            <p className="text-sm text-muted-foreground">
              На этом сайте после регистрации вы сможете оставлять заметки
            </p>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Войти</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Чтобы получить доступ к заметкам</DialogTitle>
                  <DialogDescription>
                    Пожалуйста введите свой Email чтобы войти
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col">
                  <SingInForm />
                </div>
              </DialogContent>
            </Dialog>{" "}
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
};

export default LoginWindow;
