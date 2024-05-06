import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any): Promise<any> {
        return await fetch(`${process.env.NEXT_API_URL}/test/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email || "",
            password: credentials.password || "",
          }),
        })
          .then(async (userCredential: any) => {
            const data = await userCredential.json();
            if (data.token) {
              return data.token;
            } else {
              return null;
            }
          })
          .catch((error: any) => {
            console.error(error);
          });
      },
    }),
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
