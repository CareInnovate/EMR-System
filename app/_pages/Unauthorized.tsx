import unauthorized from "@/public/Unauthorized.svg";
import Image from "next/image";
import Link from "next/link";
const Unauthorized = () => {
	return (
		<main className="w-full  flex flex-col items-center justify-center h-full">
			<h1 className="text-5xl sm:text-6xl font-bold">Unauthorized</h1>
			<h6 className="text-gray-700 text-lg sm:text-xl">
				You don&apos;t have access to this page
			</h6>
			<Image src={unauthorized} alt="Unauthorized 401" />
			<Link href={"/dashboard"} className="text-blue-800 underline">
				Click here to redirect to your dashboard
			</Link>
		</main>
	);
};

export default Unauthorized;
