export interface IOrderPagination {
	order?: "ASC" | "DESC"; // ascending or descending order
	limit?: number; // maximum number of items to return
	offset?: number; // number of items to skip
}
