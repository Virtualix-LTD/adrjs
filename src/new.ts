import fs from "fs";
import {countRecords, formatDate, formatIndex, joinArrayIntoString, readFolderLocation} from "./util";
import {DECISION_TEMPLATE} from "./templates";
import {spawnSync} from "child_process";

export function createRecord() {
	const adrLocation = readFolderLocation();

	const index = countRecords(adrLocation) + 1;
	const title = joinArrayIntoString(process.argv);
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

function genFileName(index: number, title: string) {
	const filename = title.replace(" ", "-").toLocaleLowerCase();
	return `${formatIndex(index)}-${filename}.md`
}

