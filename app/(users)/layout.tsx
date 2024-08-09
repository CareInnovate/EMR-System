import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "../_components/Nav";
import Aside from "../_components/Aside";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "EMR",
	description: "Digital Healthcare web app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Nav />
				<div className="w-full absolute top-0 flex h-[100vh] items-start justify-start">
					<Aside />
					{children}
				</div>
			</body>
		</html>
	);
}
