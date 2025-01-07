import prisma from "../lib/prisma.js";

import jwt from "jsonwebtoken";

export const getPosts = async (req, res, next) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "fetch posts failed" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            avatar: true,
            username: true,
          },
        },
        postDetail: true,
      },
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                userId: payload.id,
                postId: id,
              },
            },
          });

          res.status(200).json({ ...post, isSaved: saved ? true : false });
        }
      });
    } else {
      res.status(200).json({ ...post });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "fetch post failed" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const userId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        userId,
        ...body.postData,

        postDetail: {
          create: { ...req.body.postDetail },
        },
      },
    });

    res.status(201).json({ ...newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "fetch posts failed" });
  }
};

export const updatePost = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "fetch posts failed" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (post.userId !== userId)
      return res.status(403).json({ message: "Not Authorized" });

    await prisma.post.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "fetch posts failed" });
  }
};
