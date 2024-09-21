import { getServerSession } from "next-auth";
import Link from "next/link";
import SignInButton from "./_components/SignInButton";
import Image from "next/image";
import bgImage from "@/public/LandingPageBg.jpg";

export default async function LandingPage() {
	const user = await getServerSession();
	return (
		<div className="w-full flex flex-col">
			<nav className="h-24 flex flex-col items-center justify-center mb-10 relative ">
				<div className="w-full flex justify-end items-center text-5xl font-bold px-10">
					{user ? (
						<Link
							href={"/dashboard"}
							className="text-lg px-4 py-2 bg-blue-700 text-white rounded-lg"
						>
							Dashboard
						</Link>
					) : (
						<SignInButton />
					)}
				</div>
			</nav>
			<div className="h-full w-full fixed bg-gradient-to-t from-gray-700 via-white to-transparent opacity-20 -z-10"></div>
			<Image
				src={bgImage}
				alt=""
				className="fixed -z-20 object-cover w-full"
			></Image>
			<main className="w-full mt-24 flex justify-center py-4 px-10">
				<h1 className="text-5xl font-bold text-blue-800">
					Digital Health Care Management System
				</h1>
			</main>
		</div>
	);
}
