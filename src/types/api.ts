export type ApiResponse<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
    data: T;
};

export type ErrorResponse = {
    success: boolean;
    message: string;
    errorMessages: {
        path: string;
        message: string;
    }[];
};