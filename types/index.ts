export interface Task {
  id?: number;
  title: string;
  description: string;
  completed?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface GetTasksQuery {
  completed?: any;
}

export type TasksQuery = GetTasksQuery & PaginationQuery;

export interface ApiResponse<T = any> {
  status: "success" | "error";
  message?: string;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
