import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "./prisma";
import { Role } from "../../generated/prisma";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URI!,
    },

    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value!;
        const firstName = profile.name?.givenName ?? "";
        const lastName = profile.name?.familyName ?? "";
        const image = profile.photos?.[0].value ?? null;
        const googleId = profile.id;

        const existingUser = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: "google",
              providerAccountId: profile.id,
            },
          },
          include: { user: true },
        });

        if (existingUser) return done(null, existingUser.user);

        let user = await prisma.user.findUnique({ where: { email } });

        if (user) {
          await prisma.account.create({
            data: {
              provider: "google",
              providerAccountId: googleId,
              userId: user.id,
            },
          });

          return done(null, user);
        }

        const adminEmails =
          process.env.ADMIN_EMAILS!.split(",").map((email) => email.trim()) ??
          [];

        const role: Role = adminEmails.includes(email) ? "ADMIN" : "CUSTOMER";

        user = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            role,
            isVerified: true,
            account: {
              create: {
                provider: "google",
                providerAccountId: googleId,
              },
            },
          },
        });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

export default passport;
