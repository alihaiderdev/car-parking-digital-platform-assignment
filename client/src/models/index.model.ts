import type { TablePaginationConfig } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';

export interface IData {
  success: boolean;
  error: boolean;
  message: string;
}

export interface ITimestamp {
  createdAt: string;
  updatedAt: string;
}

export interface ITableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}
