export interface FilterQuery {
    name?: string;
    category?: string;
    subCategory?: string;
    updatedAt?: {
        $gte?: string;
        $lte?: string;
    };
    regularPrice?: {
        $gte?: number;
        $lte?: number;
    };
}
