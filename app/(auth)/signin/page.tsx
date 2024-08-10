"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";

export default function SignIn({
	searchParams,
}: {
	searchParams?: { callbackUrl?: string; error?: string };
}) {
	const phoneInput = useRef("");
	const passInput = useRef("");
	return (
		<div className="w-full h-[100vh] flex justify-center items-center">
			<form
				className="p-8 flex flex-col gap-5 justify-center items-center w-[400px] h-1/2 rounded-2xl sign-in-form relative"
				onSubmit={(e) =>
					handleSubmit(
						e,
						{
							phoneNo: phoneInput.current,
							password: passInput.current,
						},
						searchParams?.callbackUrl
					)
				}
			>
				{!!searchParams?.error && (
					<h1 className="absolute top-0 p-4 w-full text-center bg-red-200 rounded-t-2xl text-red-800">
						Authentication Failed
					</h1>
				)}
				<h1 className="text-3xl font-bold mb-5">Sign In</h1>
				<input
					type="text"
					className="rounded-3xl w-full mx-2 border border-gray-400 p-3"
					placeholder="Phone No."
					onChange={(e) => (phoneInput.current = e.target.value)}
				/>
				<input
					type="password"
					className="rounded-3xl w-full mx-2 border border-gray-400 p-3"
					placeholder="Password"
					onChange={(e) => (passInput.current = e.target.value)}
				/>
				<Link
					href={"#"}
					className="w-full text-right hover:text-blue-700 underline text-gray-500"
				>
					Forgot Password?
				</Link>
				<button className="mt-6 px-4 py-3 rounded-3xl bg-teal-700 text-white w-full mx-2">
					Log in
				</button>
			</form>
		</div>
	);
}
async function handleSubmit(
	e: React.FormEvent<HTMLFormElement>,
	data: { phoneNo: string; password: string },
	callbackUrl?: string
) {
	e.preventDefault();
	await signIn("credentials", {
		phoneNo: data.phoneNo,
		password: data.password,
		redirect: true,
		callbackUrl: callbackUrl ?? "/",
	});
}
