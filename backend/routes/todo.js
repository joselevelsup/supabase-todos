import express from "express";
import prisma from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: {
      userId: req.user.id,
    },
  });

  res.json({
    success: true,
    todos,
  });
});

router.post("/", async (req, res) => {
  const { name, description } = req.body;

  try {
    const newTodo = await prisma.todo.create({
      data: {
        name,
        description,
        completed: false,
        userId: req.user.sub,
      },
    });

    if (newTodo) {
      res.status(201).json({
        success: true,
        todo: newTodo.id,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to create new todo",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

router.put("/:todoId/completed", async (req, res) => {
  const todoId = Number(req.params.todoId);

  try {
    const todo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        completed: true,
      },
    });

    res.status(200).json({
      success: true,
      todo: todo.id,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

router.delete("/:todoId", async (req, res) => {
  const todoId = Number(req.params.todoId);

  try {
    await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    res.status(200).json({
      success: true,
      todo: todo.id,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

export default router;
