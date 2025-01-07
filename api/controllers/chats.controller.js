import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  try {
    const userId = req.userId;

    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [userId],
        },
      },
    });

    chats.forEach(async (chat) => {
      const reciverId = chat.userIDs.find((id) => id !== userId);

      const reciver = await prisma.user.findUnique({
        where: {
          id: reciverId,
        },
        select: {
          id: true,
          avatar: true,
          username: true,
        },
      });
      chat.reciver = reciver;
    });

    res.json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};

export const getChat = async (req, res) => {
  const userId = req.userId;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [userId],
        },
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          push: userId,
        },
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch getChat" });
  }
};

export const addChat = async (req, res) => {
  const userId = req.userId;

  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [userId, req.body.reciverId],
      },
    });

    res.status(201).json(newChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add chats" });
  }
};

export const readChat = async (req, res) => {
  const userId = req.userId;

  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [userId],
        },
      },
      data: {
        seenBy: {
          set: [userId],
        },
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Read chats" });
  }
};
