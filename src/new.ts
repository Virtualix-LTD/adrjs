import fs from "fs";
import {CONFIG_FILE} from "./util";

export function createRecord() {
	const adrLocation = fs.readFileSync(CONFIG_FILE, {encoding: "utf-8"}).trim();

	const index = countRecords(adrLocation) + 1;
	const title = extractDecisionTitle(process.argv);
	const filename = genFileName(index, title);

	fs.appendFileSync(`${adrLocation}/${filename}`, "foo", {encoding: "utf-8"})
}

function countRecords(adrLocation: string): number {
	const dircontents = fs.readdirSync(adrLocation);
	return dircontents.length;
}

function genFileName(index: number, title: string) {
	const paddedIndex = `${index}`.padStart(4, '0');
	const filename = title.replace(" ", "-").toLocaleLowerCase();
	return `${paddedIndex}-${filename}.md`
}

function extractDecisionTitle(cliargs: string[]) {
	return cliargs.slice(3).join(" ");
}
