'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logIn, signUp } from '@/services/authServices';
import { setToken } from '@/services/tokenServices';
import { FormEvent, useState } from 'react';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password: string;
  confirmPass?: string;
}

export function TabsDemo() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [logInEmail, setLogInEmail] = useState('');
  const [logInPass, setLogInPass] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInfo = {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPass,
    };
    try {
      if (password === confirmPass) {
        const accsessTokenResponse = await signUp(userInfo);
        setToken(accsessTokenResponse.accesessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogIn = async (e: FormEvent) => {
    e.preventDefault();
    const userSign = {
      email: email,
      password: password,
    };
    try {
      const accsessTokenResponse = await logIn(userSign);
      setToken(accsessTokenResponse.accesessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tabs defaultValue="signup" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Signup</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent className="   ">
              <div className="flex">
                <div className=" mt-4 mx-4">
                  <Label htmlFor="firstName">First Name </Label>
                  <Input
                    onChange={(e) => setFirstName(e.target.value)}
                    id="firstName"
                    placeholder="Pedro"
                  />
                </div>
                <div className=" m-4">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    onChange={(e) => setLastName(e.target.value)}
                    id="lastName"
                    placeholder="Duarte "
                  />
                </div>
              </div>
              <div className="flex flex-col mx-4">
                <div className=" mb-4 ">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className=" mb-4">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    onChange={(e) => setPhone(Number(e.target.value))}
                    id="phone"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className=" mb-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className=" mb-4 ">
                  <Label htmlFor="confirmPass">Confirm Password</Label>
                  <Input
                    onChange={(e) => setConfirmPass(e.target.value)}
                    id="confirmPass"
                    placeholder="Confirm password"
                  />
                </div>
                <div className="flex justify-center items-start space-x-2 text-sm m-4">
                  <input type="checkbox" className="mt-1" />
                  <p>
                    By clicking “Create account”, you accept the terms and
                    conditions given by Fast Track, for the community Create
                    account.
                  </p>
                </div>
                <Button type="submit">Create Account</Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </TabsContent>
      <TabsContent value="login">
        <form onSubmit={handleLogIn}>
          <Card className="flex flex-col justify-center ">
            <CardContent className="m-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => setLogInEmail(e.target.value)}
                  id="email"
                />
              </div>
              <div className="">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => setLogInPass(e.target.value)}
                  id="password"
                />
              </div>
            </CardContent>
            <div className="flex flex-col m-4">
              <Button type="submit">Log in</Button>
              <div className="text-center m-4">
                <a href="#">Forgot Password</a>
              </div>
              <div className="text-center mb-4">or</div>
              <Button>Log in with LinkedIn</Button>
              <br />
              <Button>Log in with Google</Button>
            </div>
          </Card>
        </form>
      </TabsContent>
    </Tabs>
  );
}
