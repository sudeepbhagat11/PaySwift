import prisma from "@/db";
import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
import * as bcrypt from "bcryptjs";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
        number : { label: "Number", type: "number", required: true }
      },
      async authorize(credentials: any) {
        if (!credentials) return null;
      
        // Check if user already exists by number
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.email },
              { number: credentials.number }
            ]
          }
        });
      
        // If user exists, attempt sign-in
        if (existingUser && existingUser.password) {
          const isValid = await bcrypt.compare(credentials.password, existingUser.password);
          if (isValid) {
            return {
              id: existingUser.id.toString(),
              email: existingUser.email,
              number: existingUser.number,
            };
          } else {
            // Password wrong
            throw new Error("Invalid credentials");
          }
        }
      
        // If no user exists, create a new user
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
      
        try {
          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              number: credentials.number,
              password: hashedPassword,
            },
          });
      
          return {
            id: newUser.id.toString(),
            email: newUser.email,
            number: newUser.number,
          };
        } catch (e: any) {
          console.error("User creation error:", e);
          throw new Error("Failed to create user. Email or number might already be taken.");
        }
      }
      
         ,
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.number = user.number;
      }
      return token;
    },
    async session({ token, session }: any) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.number = token.number;
      return session;
    },
  },
};

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}
