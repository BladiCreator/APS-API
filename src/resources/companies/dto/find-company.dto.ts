import { IOrderPagination } from "@src/core/interfaces/order-pagination.interface";
import { ISearcher } from "@src/core/interfaces/searcher.interface";
import { Application } from '../../applications/entities/application.entity';

export interface FindCompanyDto extends IOrderPagination,ISearcher {
  name?: string;
  applications?: Application[];
}