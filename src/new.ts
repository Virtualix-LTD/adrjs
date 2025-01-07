import fs from "fs";
import {CONFIG_FILE} from "./util";
import {DECISION_TEMPLATE} from "./templates";
import {spawnSync} from "child_process";

export function createRecord() {
	const adrLocation = fs.readFileSync(CONFIG_FILE, {encoding: "utf-8"}).trim();

	const index = countRecords(adrLocation) + 1;
	const title = extractDecisionTitle(process.argv);
	const filename = genFileName(index, title);

	fs.writeFileSync(`${adrLocation}/${filename}`, compileTemplate(index, title), {encoding: "utf-8"})

	spawnSync(`eval $EDITOR ${adrLocation}/${filename}`)
}

function compileTemplate(index: number, title: string, date = new Date()) {
	return DECISION_TEMPLATE
		.replace("{{NUMBER}}", formatIndex(index))
		.replace("{{TITLE}}", title)
		.replace("{{DATE}}", formatDate(date));
}

function countRecords(adrLocation: string): number {
	const dircontents = fs.readdirSync(adrLocation);
	return dircontents.length;
}

function formatIndex(index: number) {
	return `${index}`.padStart(4, '0');
}

function formatDate(date: Date) {
	const month = `${(date.getMonth() + 1)}`.padStart(2, '0');
	const day = `${date.getDate()}`.padStart(2, '0');
	return `${date.getFullYear()}-${month}-${day}`;
}

function genFileName(index: number, title: string) {
	const filename = title.replace(" ", "-").toLocaleLowerCase();
	return `${formatIndex(index)}-${filename}.md`
}

function extractDecisionTitle(cliargs: string[]) {
	return cliargs.slice(3).join(" ");
}
