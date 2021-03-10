let p = {
	name: "serverless-file-converter",
	version: "1.0.0",
	description:
		"Serverless File Converter, Deployed using Cloud Run and Cloud Build. Event Triggered From Bucket",
	main: "index.js",
	scripts: {
		start: "node index.js",
		test: 'echo "Error: no test specified" && exit 1',
	},
	repository: {
		type: "git",
		url: "git+https://github.com/MrMoshkovitz/Serverless-File-Converter.git",
	},
	keywords: [],
	author:
		"Gal Moshkovitz <gal.moshko@gmail.com> (https://github.com/MrMoshkovitz)",
	license: "ISC",
	bugs: {
		url: "https://github.com/MrMoshkovitz/Serverless-File-Converter/issues",
	},
	homepage: "https://github.com/MrMoshkovitz/Serverless-File-Converter#readme",
	dependencies: {
		"@google-cloud/storage": "^5.8.1",
		"body-parser": "^1.19.0",
		child_process: "^1.0.2",
		express: "^4.17.1",
	},
};
let name2 = p.name
name2 = name2.split('-')

console.log(name2);