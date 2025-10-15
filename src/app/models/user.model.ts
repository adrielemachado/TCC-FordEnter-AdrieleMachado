export interface User {
    name?: string;
    lastName?: string;
    birthDate?: Date;
    email: string;
    password: string;
    bio?: string;
    skills?: string[];
    knowledgeLevel?: string;
}
