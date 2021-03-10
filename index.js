const { promisify } = require("util");
const { Storage } = require("@google-cloud/storage");
const exec = promisify(require("child_process").exec);
const storage = new Storage();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log("Listening on port", port);
});

//! Needs To Add Swtich Case before Convert Function!!!
app.post("/", async (req, res) => {
	try {
        const file = decodeBase64Json(req.body.message.data);
        console.log("File~~~~~~~~~~~~~~~~~~");
        console.log("File~~~~~~~~~~~~~~~~~~");
        console.log(file);
        console.log(`BucketName: ${file.bucket}, File Name: ${file.name}`)
        let endBucketName = file.bucket
		endBucketName = endBucketName.spllit('-')
		endBucketName = endBucketName[endBucketName.length-1];
		console.log(endBucketName);
		await downloadFile(file.bucket, file.name);
		convertedFileName = await convertFile(endBucketName, file.name)
		await uploadFile(process.env.DONE_BUCKET, convertedFileName);
		await deleteFile(file.bucket, file.name);
	} catch (ex) {
		console.log(`Error: ${ex}`);
	}
	res.set("Content-Type", "text/plain");
	res.send("\n\nOK\n\n");
});

function decodeBase64Json(data) {
	return JSON.parse(Buffer.from(data, "base64").toString());
}

async function downloadFile(bucketName, fileName) {
	console.log("Function: Download File");
    console.log(`Bucket: ${bucketName}, File: ${fileName}`);

    const options = { destination: `/tmp/${fileName}` };
    console.log("")
    console.log("Destination", options)
    console.log("")
	await storage.bucket(bucketName).file(fileName).download(options);
	console.log("Download Successfully");
}

async function convertFile(fileType, fileName) {
	console.log("Function: Convert File");
	console.log("fileType", fileType)
	let cmd = ""
	//! sudo libreoffice --headless  --infilter="writer_pdf_import" --convert-to docx --outdir /home/gal_moshko/Files Gal-Covid-Positive-test-results.pdf
	switch (fileType) {
		case "file2docx":
			cmd = `libreoffice --headless  --infilter="writer_pdf_import" --convert-to docx --outdir /tmp /tmp/${fileName}`
			newFileName = fileName.replace(/\.\w+$/, ".docx");			
			break;
		case "file2pdf":
			cmd = `libreoffice --headless --convert-to pdf --outdir --outdir /tmp /tmp/${fileName}`;
			newFileName = fileName.replace(/\.\w+$/, ".pdf");
			break;
	}
	// const cmd = `libreoffice --headless  --infilter="writer_pdf_import" --convert-to docx --outdir /tmp /tmp/${fileName}`
	
	// "lowriter --invisible --convert-to docx:writer_pdf_export " + `"${fileName}"` + "--outdir /tmp " +
	// `"/tmp/${fileName}"`;
	// `libreoffice --infilter="writer_pdf_import" --convert-to docx ${fileName}`
	
	console.log(cmd);
	const { stdout, stderr } = await exec(cmd);
	if (stderr) {
		console.log("Stderr");
		console.log(stderr);
		throw stderr;
	}
	console.log("Stdout");
	console.log(stdout);
	return newFileName;
}

async function deleteFile(bucketName, fileName) {
	console.log("Function: Delete File", fileName);
	await storage.bucket(bucketName).file(fileName).delete();
}

async function uploadFile(bucketName, fileName) {
	console.log("Function: Upload File", fileName);
	await storage.bucket(bucketName).upload(`/tmp/${fileName}`);
}









// gcloud builds submit \
//   --tag gcr.io/$GOOGLE_CLOUD_PROJECT/file2docx-converter

// gcloud beta run deploy file2docx-converter \
//   --image gcr.io/$GOOGLE_CLOUD_PROJECT/file2docx-converter \
//   --platform managed \
//   --region us-central1 \
//   --memory=2Gi \
//   --no-allow-unauthenticated \
//   --set-env-vars DOCX_BUCKET=$GOOGLE_CLOUD_PROJECT-docx-done
