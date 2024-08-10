"use client";
import { signIn } from "next-auth/react";
import React from "react";

const SignInButton = () => {
	return (
		<button
			className="text-xl py-2 px-4 bg-blue-950 rounded-lg text-white z-20 hover:bg-blue-900"
			onClick={() => signIn()}
		>
			Sign In
		</button>
	);
};

export default SignInButton;
