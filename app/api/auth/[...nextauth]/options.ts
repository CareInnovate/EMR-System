import getUserByPhone from "@/app/utils/user";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
	providers: [
		Credentials({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: "Authenticate with Mobile Number",
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				phoneNo: {
					label: "Phone Number",
					type: "text",
					placeholder: "255-255-2554",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Password",
				},
			},
			async authorize(credentials, req) {
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)
				const user = await getUserByPhone(
					credentials?.phoneNo as string,
					credentials?.password as string
				);

				// If no error and we have user data, return it
				if (user) {
					return user;
				}
				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],
	pages: {
		signIn: "/signin",
	},
	callbacks: {
		async jwt({ account, token, user }) {
			if (account) {
				token.name = user.firstName;
				token.id = user.id;
				token.role = user.role.name;
				token.email = user.email;
				token.departmentId = user.departmentId;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.name = token.name as string;
			session.user.role = token.role;
			session.user.id = token.id as string;
			session.user.deptId = token.departmentId;
			return session;
		},
	},
};
