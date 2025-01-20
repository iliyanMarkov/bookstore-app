const fs = require("fs");
const path = require("path");

const initialDataPath = path.join(__dirname, "initialServerData.json");
const dbPath = path.join(__dirname, "db.json");

try {
	const initialData = fs.readFileSync(initialDataPath, "utf-8");

	fs.writeFileSync(dbPath, initialData, "utf-8");
} catch (error) {
	console.error("Error syncing initial data:", error.message);
	process.exit(1);
}
