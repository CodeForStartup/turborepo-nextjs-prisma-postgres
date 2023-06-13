import { Button, Header } from "ui";
import { PrismaClient } from "database";

export default async function Page() {
  const prismaClient = new PrismaClient();

  const post = await prismaClient.post.findFirst();

  return (
    <div className="flex justify-center items-center h-96">
      <h1 className="text-8xl font-bold">CODE FOR STARTUP</h1>
    </div>
  );
}
