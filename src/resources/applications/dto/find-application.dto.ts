import { IOrderPagination } from "@src/core/interfaces/order-pagination.interface";
import { ISearcher } from "@src/core/interfaces/searcher.interface";

export interface FindApplicationDto extends IOrderPagination, ISearcher {
	name?: string;
	min_price?: number;
	max_price?: number;
	discount?: number;
	categories?: string;
	same_categories?: boolean;
}
