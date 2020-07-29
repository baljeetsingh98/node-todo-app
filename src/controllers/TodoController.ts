import { Response, Request } from "express";

import pool from "../config/database"
import validateTodo from "../utils/validations";

export default {
  getTodos(request: Request, response: Response) {
    pool.query("SELECT * FROM todos", (error: Error, results: any) => {
      if (error) {
        response.status(500).json({ error: "Internal Server Error" }); // internal error
      }
      response.status(200).json(results.rows);
    });
  },
  getTodo(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    if (isNaN(id)) {
      response.status(422).json({ // unprocessable entity
        error: `Id should be a number`,
      });
      return;
    }
    pool.query("SELECT * FROM todos WHERE id=$1", [id], (error: Error, results: any) => {
      if (error) {
        response.status(500).json({ error: "Internal Server Error" }); // internal error
      }
      response.status(200).json(results.rows);
    });
  },
  addTodo(request: Request, response: Response) {
    const resp = request.body;
    if (typeof resp === "object" && Object.keys(resp).length === 0) {
      response
        .status(400)
        .json({ error: "Please provide required data" }); // bad request
      return;
    }
    const validateResult: any = validateTodo(resp);
    if (validateResult.error === true) {
      response.status(422).json({ // unprocessable entity
        error: `${validateResult.missingField} field is required`,
      });
      return;
    }
    pool.query(
      "INSERT INTO todos(description,status,title) VALUES ($1,$2,$3);",
      [resp.description, resp.status, resp.title],
      (error: Error, results: any) => {
        if (error) {
          response.status(500).json({ error: "Internal Server Error" });
        }
        response.status(201).json({
          message: "Todo added",
        });
      }
    );
  },
  deleteTodo(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    if (isNaN(id)) {
      response.status(422).json({ // unprocessable entity
        error: `Id should be a number`,
      });
      return;
    }
    pool.query("DELETE FROM todos WHERE	id=$1", [id], (error: Error, results: any) => {
      if (error) {
        response.status(500).json({ error: "Internal Server Error" }); // internal error
      }
      response.status(200).json({ message: "Todo deleted" });
    });
  },
  updateTodo(request: Request, response: Response) {
    const resp = request.body;
    const id = parseInt(request.params.id);
    if (isNaN(id)) {
      response.status(422).json({ // unprocessable entity
        error: `Id should be a number`,
      });
      return;
    }
    if (typeof resp === "object" && Object.keys(resp).length === 0) {
      response.status(400).json({
        error: "Please provide required data"
      }); // bad request
      return;
    }
    const validateResult: any = validateTodo(resp);
    if (validateResult.error === true) {
      response.status(422).json({ // unprocessable entity
        error: `${validateResult.missingField} field is required`,
      });
      return;
    }
    pool.query(
      "UPDATE todos SET description = $1, status = $2, title = $3 WHERE id = $4",
      [resp.description, resp.status, resp.title, id],
      (error: Error, results: any) => {
        if (error) {
          response.status(500).json({ error: "Internal Server Error" });
        }
        response.status(200).json({
          message: "Todo updated",
        });
      }
    );
  },
};
