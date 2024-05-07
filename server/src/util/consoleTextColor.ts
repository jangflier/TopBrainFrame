type consoleTextColor =
	| "red"
	| "lightred"
	| "yellow"
	| "lightyellow"
	| "green"
	| "ligthgreen"
	| "blue"
	| "navy"
	| "purple";

const textColor = (color: consoleTextColor, text: string | number | undefined | null) => {
	switch (color) {
		case "red":
			return `\x1b[31m${text}\x1b[0m`;
		case "lightred":
			return `\x1b[91m${text}\x1b[0m`;
		case "yellow":
			return `\x1b[33m${text}\x1b[0m`;
		case "lightyellow":
			return `\x1b[93m${text}\x1b[0m`;
		case "green":
			return `\x1b[32m${text}\x1b[0m`;
		case "ligthgreen":
			return `\x1b[92m${text}\x1b[0m`;
		case "blue":
			return `\x1b[34m${text}\x1b[0m`;
		case "navy":
			return `\x1b[94m${text}\x1b[0m`;
		case "purple":
			return `\x1b[35m${text}\x1b[0m`;
	}
};

export default textColor;
