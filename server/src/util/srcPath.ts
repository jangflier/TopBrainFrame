import path from "path";

let rootDir = "";

if (require.main && typeof require.main.filename === "string") {
	rootDir = path.dirname(require.main.filename);
}

export default rootDir;
