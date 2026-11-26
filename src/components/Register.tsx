"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useDispatch } from "react-redux";
import { useState } from "react";

const FormSchema = z.object({
    fullname: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Enter a valid email address" }),
    mobile: z.string().regex(/^\d{10}$/, {
        message: "Enter a valid mobile number",
    }),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message:
            "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullname: "",
            email: "",
            mobile: "",
            password: "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
        setIsDrawerOpen(true);
    }

    return (
        <div className="py-5">
            <h1 className="text-midnight w-1/4 text-4xl font-bold text-center py-2 mx-auto">
                SMART DEPOT
            </h1>
            <Card className="w-1/3 mx-auto px-4 py-2 mt-2 rounded-xl border-2 shadow-lg">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                        <CardHeader>
                            <CardTitle className="text-center">Create Account</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="fullname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold p-1">Name :</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Eg:- Ananthu M A" {...field} type="text" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold p-1">Email :</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Eg:- name@example.com" {...field} type="email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="mobile"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold p-1">Mobile :</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Eg:- 9876543210" {...field} type="tel" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold p-1">Password :</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Eg:- P@55word"
                                                {...field}
                                                type={isChecked ? "text" : "password"}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardContent className="text-center">
                            <CardContent className="flex justify-between text-center p-1">
                                <Label className="flex text-xs font-semibold p-1">
                                    <Input
                                        type="checkbox"
                                        className="w-3"
                                        checked={isChecked}
                                        onChange={() => setIsChecked(!isChecked)}
                                        aria-label="Show Password"
                                    />
                                    <Label className="py-3 px-1">Show Password</Label>
                                </Label>
                                <Button type="submit" className="bg-midnight hover:bg-gray-900 text-lightGray">
                                    Verify Email
                                </Button>
                            </CardContent>
                        </CardContent>
                    </form>
                </Form>

                {isDrawerOpen && (
                    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                        <DrawerContent className="w-1/4 mx-auto">
                            <DrawerHeader>
                                <DrawerTitle className="mx-auto">Enter OTP</DrawerTitle>
                                <DrawerDescription className="mx-auto">
                                    Enter OTP in 01:30s
                                </DrawerDescription>
                                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                                    <InputOTPGroup className="mx-auto border border-midnight">
                                        <InputOTPSlot className="border-r border-midnight" index={0} />
                                        <InputOTPSlot className="border-r border-midnight" index={1} />
                                        <InputOTPSlot className="border-r border-midnight" index={2} />
                                        <InputOTPSlot className="border-r border-midnight" index={3} />
                                        <InputOTPSlot className="border-r border-midnight" index={4} />
                                        <InputOTPSlot className="border-r border-midnight" index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </DrawerHeader>
                            <DrawerFooter>
                                <Button type="button">Submit</Button>
                                <DrawerClose>
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                )}

                <CardContent className="text-center">
                    <CardDescription>
                        <Link href="/login">Already have an account ?</Link>
                    </CardDescription>
                </CardContent>
            </Card>
            <h1 className="text-midnight w-1/4 text-sm font-semibold text-center py-4 mx-auto">
                <Link href={`https://portfolio.smartdepot.co.in/`}>smartdepot.co.in</Link>
            </h1>
        </div>
    );
};

export default Register;
