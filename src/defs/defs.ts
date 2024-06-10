export interface GSListItem {
    title: string;
    description: string;
    participants: GSUser[];
    progress: number;
}

export interface GSList {
    title: string;
    items: GSListItem[];
}

export interface GSUser {
    name: string;
    email: string;
    avatar: string;
}


