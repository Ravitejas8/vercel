import express from "express"
import { S3 } from "aws-sdk";
const app = express();

const s3 = new S3({
    accessKeyId: "7ea9c3f8c7f0f26f0d21c5ce99d1ad6a",
    secretAccessKey: "b4df203781dd711223ce931a2d7ca269cdbf81bb530de4548474584951b798be",
    endpoint: "https://e21220f4758c0870ba9c388712d42ef2.r2.cloudflarestorage.com"
})

app.get("/*", async (req, res) => {
    // id.100xdevs.com
    const host = req.hostname;
    const id = host.split(".")[0]
    const filePath = req.path;
    const response = await s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${filePath}`

    }).promise()
    const type = filePath.endsWith(".html") ? "text/html" : filePath.endsWith(".css") ? "test/css" : "application/javascript"
    res.set("Content-Type", type)
    res.send(response.Body)

})
app.listen(3001)