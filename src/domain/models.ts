export interface GSListItem {
    id?: string;
    title: string;
    description: string;
    participants: GSUser[];
    progress: number;
}

export interface GSGroupItems {
    id?: string;
    items: GSListItem[];
    title: string;
    canHide: boolean;
    visible?: boolean;
}

export interface GSUser {
    name: string;
    email: string;
    avatar: string;
}
