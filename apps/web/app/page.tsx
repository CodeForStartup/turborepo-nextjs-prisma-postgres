import { Button } from "ui";
import { PrismaClient } from "database";
import Header from "../components/Header";

export default async function Page() {
  const prismaClient = new PrismaClient();
  //   const post = await prismaClient.post.findFirst();

  return (
    <div className="">
      <Header />

      <div className="max-w-7xl mx-auto"></div>
    </div>
  );
}
