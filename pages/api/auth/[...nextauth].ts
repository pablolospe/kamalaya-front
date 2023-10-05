import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { URL } from '@/config';

export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
            email: { label: "email", type: "text", placeholder: "admin@mail.com" },
          password: { label: "password", type: "password" }
        },
        async authorize(credentials, req) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          const { email, password } = credentials as any;
          const res = await fetch(`${URL}/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
            }),
          })
          const user = await res.json()
          
          // If no error and we have user data, return it
          if (res.ok && user) {
              
            return user
          }
          // Return null if user data could not be retrieved
          return null
        }
      })
    
    // ...add more providers here
  ],

  session:{
    strategy:"jwt"
  },
  pages:{
    signIn:'/auth/login'
  },
  callbacks:{
    async jwt({ token, user }){
        return { ...token, ...user};
    },
    async session({ session, token, user }){
        session.user = token;
        return session;
    }
  },
}

export default NextAuth(authOptions)