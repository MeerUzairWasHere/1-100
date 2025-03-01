import { prisma } from "../db/index";
import { publicProcedure, router } from "./trpc";

const appRouter = router({
  userList: publicProcedure.query(async ({ ctx }) => {
    await prisma.$connect();
    return prisma.user.findMany();
  }),
});
export type AppRouter = typeof appRouter;
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const server = createHTTPServer({
  router: appRouter,
});
server.listen(3000);
