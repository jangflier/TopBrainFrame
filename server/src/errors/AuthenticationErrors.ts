export class UserNotFoundError extends Error {
	constructor(message: string = "User not found") {
		super(message);
		this.name = "UserNotFoundError";
	}
}

export class SessionExpiredError extends Error {
	constructor(message: string = "Session has expired") {
		super(message);
		this.name = "SessionExpiredError";
	}
}

export class InvalidTokenError extends Error {
	constructor(message: string = "Invalid token provided") {
		super(message);
		this.name = "InvalidTokenError";
	}
}
