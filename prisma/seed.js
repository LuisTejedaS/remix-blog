const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();



async function seed() {
  await Promise.all(
    getPosts().map((post) => {
      return db.post.create({ data: post });
    })
  );
}

function getPosts() {
  return [
    {
      title: "t1",
      body: "body1",
    },
    {
      title: "t2",
      body: "body2",
    },
  ];
}

seed()