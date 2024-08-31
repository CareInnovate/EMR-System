import { Patient, Staff } from "@prisma/client";
import NextAuth, { DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's name. */
			name: string;
			role: string;
			id: string;
			deptId: string | null;
		};
	}

	interface User {
		id: string;
		firstName: string;
		middleName: string;
		lastName: string;
		email: string | null;
		role: {
			name: string;
		};
		departmentId: string | null;
	}
}
declare module "next-auth/jwt" {
	interface JWT {
		name: string;
		id: string;
		role: string;
		email: string | null;
		departmentId: string | null;
	}
}
