import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { createLead } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const leadInputSchema = z.object({
  name: z.string().trim().min(2).max(160),
  phone: z.string().trim().regex(/^[0-9+()\-\s]{7,32}$/, "Enter a valid phone number"),
  configuration: z.enum(["3 BHK", "4 BHK"]),
  budget: z.enum(["₹1 Cr", "₹2 Cr", "₹3 Cr", "₹4 Cr+"]),
  source: z.string().trim().max(80).optional(),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  lead: router({
    capture: publicProcedure.input(leadInputSchema).mutation(async ({ input }) => {
      await createLead({ ...input, source: input.source ?? "lead-popup" });
      return { success: true } as const;
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
