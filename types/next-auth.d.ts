import { Patient, Staff } from "@prisma/client";
import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's name. */
			name: string;
			role: string;
		};
	}
	interface User extends Patient, DefaultUser {}
}
