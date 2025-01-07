import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: 1,
        avatar: 1,
        createdAt: 1,
        email: 1,
        username: 1,
      },
    });

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to fetch users" });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await prisma.user.findUnique({
      where: { id },
    });

    res.status(200).json({ ...user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to fetch user" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.userId;

  const tokenUserId = req.userId;

  const { password, avatar, ...other } = req.body;

  if (id !== tokenUserId)
    return res.status(403).json({ message: "Not Authrizaed" });

  let updatedPassword = null;

  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...other,
        ...(avatar && { avatar }),
        ...(password && { password: updatedPassword }),
      },
    });

    res.status(200).json({ ...user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to fetch user" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const tokenUserId = req.userId;

  if (id !== tokenUserId)
    return res.status(403).json({ message: "Not Authrizaed" });

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to Delete user" });
  }
};

export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const userId = req.userId;
  try {
    const savePost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (savePost) {
      await prisma.savedPost.delete({
        where: {
          id: savePost.id,
        },
      });

      res.status(200).json({ message: "Post removed from save lisr" });
    } else {
      await prisma.savedPost.create({ data: { postId, userId } });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to Delete user" });
  }
};

export const profileePost = async (req, res) => {
  const userId = req.userId;

  try {
    const userPosts = await prisma.post.findMany({
      where: {
        userId,
      },
    });

    const saved = await prisma.savedPost.findMany({
      where: { userId },
      include: {
        post: true,
      },
    });

    const savedPosts = saved.map((item) => item.post);

    res.status(200).json({ userPosts, savedPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get userPosts and savePosts!" });
  }
};
