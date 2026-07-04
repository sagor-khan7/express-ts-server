import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
  const { user_id, title, description, completed } = req.body;
  try {
    const result = await todoServices.createTodo(
      user_id,
      title,
      description,
      completed,
    );
    res.status(201).json({
      success: true,
      message: "Todo created.",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodo();
    res.status(200).json({
      success: true,
      message: "Todos retrieve successfully.",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getSingleTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await todoServices.getSingleTodo(id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo found successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { user_id, title, description, completed } = req.body;
  const id = req.params.id;
  try {
    const result = await todoServices.updateTodo(
      user_id,
      title,
      description,
      completed,
      id as string,
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo updated successfully.",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await todoServices.deleteTodo(id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo deleted successfully",
        // data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const todoControllers = {
  createTodo,
  getTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
