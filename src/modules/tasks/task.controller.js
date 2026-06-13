import { db } from "../../db/index.js";
import { tasks } from "../../db/schema.js";

import {
  and,
  eq,
  desc,
  asc,
  ilike,
} from "drizzle-orm";

export const createTask = async (
  req,
  res,
  next
) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
    } = req.body;

    const [task] = await db
      .insert(tasks)
      .values({
        title,
        description,
        status,
        priority,
        dueDate,
        userId: req.user.id,
      })
      .returning();
      


    return res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (
  req,
  res,
  next
) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const offset =
      (page - 1) * limit;

    const filters = [];

    if (req.user.role !== "ADMIN") {
      filters.push(
        eq(
          tasks.userId,
          req.user.id
        )
      );
    }

    if (req.query.status) {
      filters.push(
        eq(
          tasks.status,
          req.query.status.toUpperCase()
        )
      );
    }

    if (req.query.search) {
      filters.push(
        ilike(
          tasks.title,
          `%${req.query.search}%`
        )
      );
    }

    const result = await db
      .select()
      .from(tasks)
      .where(
        filters.length
          ? and(...filters)
          : undefined
      )
      .limit(limit)
      .offset(offset);

    return res.status(200).json({
      success: true,
      page,
      limit,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    const filters = [
      eq(tasks.id, id),
    ];

    if (
      req.user.role !== "ADMIN"
    ) {
      filters.push(
        eq(
          tasks.userId,
          req.user.id
        )
      );
    }

    const task = await db
      .select()
      .from(tasks)
      .where(and(...filters));

    if (!task.length) {
      return res.status(404).json({
        success: false,
        message:
          "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: task[0],
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    const filters = [
      eq(tasks.id, id),
    ];

    if (
      req.user.role !== "ADMIN"
    ) {
      filters.push(
        eq(
          tasks.userId,
          req.user.id
        )
      );
    }

    const existingTask =
      await db
        .select()
        .from(tasks)
        .where(and(...filters));

    if (
      !existingTask.length
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Task not found",
      });
    }

    const [updatedTask] =
      await db
        .update(tasks)
        .set({
          ...req.body,
          updatedAt: new Date(),
        })
        .where(
          eq(tasks.id, id)
        )
        .returning();

    return res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    const filters = [
      eq(tasks.id, id),
    ];

    if (
      req.user.role !== "ADMIN"
    ) {
      filters.push(
        eq(
          tasks.userId,
          req.user.id
        )
      );
    }

    const existingTask =
      await db
        .select()
        .from(tasks)
        .where(and(...filters));

    if (
      !existingTask.length
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Task not found",
      });
    }

    await db
      .delete(tasks)
      .where(
        eq(tasks.id, id)
      );

    return res.status(200).json({
      success: true,
      message:
        "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};