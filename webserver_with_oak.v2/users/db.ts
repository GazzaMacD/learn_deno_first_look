interface User {
    id: string;
    email: string;
}

const users = new Map<string, User>();

users.set("28fe61d4-b431-411e-80de-b7e0317fbbde", {
    id: "28fe61d4-b431-411e-80de-b7e0317fbbde",
    email: "john@yadayada.com",
});

users.set("1615a910-0619-4600-921c-493394e8f78f", {
    id: "1615a910-0619-4600-921c-493394e8f78f",
    email: "kim@yadayada.com",
});

export { users };
