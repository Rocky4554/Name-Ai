export const authConfig = {
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.sub;
                console.log("Session User:", { name: session.user.name, email: session.user.email });
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                console.log("User logged in:", { name: user.name, email: user.email });
            }
            return token;
        },
        authorized({ auth, request: nextUrl }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.nextUrl.pathname.startsWith('/dashboard');
            const isOnAuth = nextUrl.nextUrl.pathname.startsWith('/auth');
            const isOnDomain = nextUrl.nextUrl.pathname.startsWith('/domain');

            if (isOnAuth) {
                if (isLoggedIn) {
                    return Response.redirect(new URL('/dashboard', nextUrl.nextUrl));
                }
                return true;
            }

            if (isOnDashboard || isOnDomain) {
                if (isLoggedIn) {
                    return true;
                }
                return false; // Redirect to signin
            }

            return true;
        },
    },
    providers: [], // Providers are added in lib/auth.js
    secret: process.env.NEXTAUTH_SECRET, // Ensure secret is passed here
};
