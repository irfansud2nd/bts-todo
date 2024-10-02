"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAndRegister } from "@/lib/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  register?: boolean;
};

const LoginRegisterCard = ({ register }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await loginAndRegister(username, password, email, register);

      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Klik
          {register ? " Login " : " Daftar "}
          jika
          {register ? " Sudah " : " Belum "}
          memiliki akun
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password "
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {register && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email of your project"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={register}
                />
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Link href={register ? "/login" : "/register"}>
            {register ? "Login" : "Daftar"}
          </Link>
        </Button>
        <Button onClick={handleSubmit}>{register ? "Daftar" : "Login"}</Button>
      </CardFooter>
    </Card>
  );
};
export default LoginRegisterCard;
