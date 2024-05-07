export type ExcludeType<T, EA extends keyof T, IA extends T[EA]> = Omit<T, EA> & {
	[K in EA]: Exclude<T[EA], IA>;
};

export type IncludeType<T, EA extends keyof T, IA extends T[EA]> = Omit<T, EA> & {
	[K in EA]: IA;
};
