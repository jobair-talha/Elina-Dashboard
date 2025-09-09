export type Category = {
        parentId: string | Category | null;
        name: string;
        slug: string;
        image: string;
        isFeatured: boolean;
        isPublished: boolean;
        adsBanner: string;
        metaTitle: string;
        metaDescription: string;
        _id: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
        id: string;
        children?: Category[];

};


