import prisma from "database";

export default async function Page() {
  const allPosts = await prisma.post.findMany();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
        CODE FOR STARTUP.
      </h1>

      <div>
        {allPosts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    </div>
  );
}
