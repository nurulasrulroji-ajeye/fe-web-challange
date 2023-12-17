export interface IResponseProaduct<T = any> {
    limit: number;
    skip: number;
    total: number;
    products: T;
}