type CamelToSnakeCase<S extends string> =
    S extends `${infer First}${infer Rest}`
    ? First extends Capitalize<First>
    ? `_${Lowercase<First>}${CamelToSnakeCase<Rest>}`
    : `${First}${CamelToSnakeCase<Rest>}`
    : S;

type SnakeToCamelCase<S extends string> =
    S extends `${infer First}_${infer Next}${infer Rest}`
    ? `${First}${Uppercase<Next>}${SnakeToCamelCase<Rest>}`
    : S;

export type CamelToSnake<T> = {
    [K in keyof T as CamelToSnakeCase<K & string>]: T[K];
};

export type SnakeToCamel<T> = {
    [K in keyof T as SnakeToCamelCase<K & string>]: T[K];
};
