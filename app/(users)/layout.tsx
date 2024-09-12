import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "../_components/Nav";
import Aside from "../_components/Aside";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { use } from "react";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "EMR",
	description: "Digital Healthcare web app",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getServerSession(options);
	return (
		<>
			<Nav />
			<div className="w-full absolute top-0 flex h-[100vh] items-start justify-start">
				<Aside role={user?.user.role as string} />
				{children}
			</div>
		</>
	);
}
