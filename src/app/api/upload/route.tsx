import connectDB from "@/lib/db";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const region = process.env.NEXT_AWS_S3_REGION as string;
const accessKeyId = process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY as string;
const bucket = process.env.NEXT_AWS_S3_BUCKET_NAME as string;

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

const uploadFileToS3 = async (file: any, fileName: any) => {
    const fileBuffer = file;
    const params = {
        Bucket: bucket,
        Key: `${fileName}`,
        Body: fileBuffer,
        ContentType: file.type,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return fileName;
};

export async function POST(req: any) {
    await connectDB();

    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return new Response(JSON.stringify({ message: "file not found" }), { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = await uploadFileToS3(buffer, file.name);
        const imageUrl = `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`;

        console.log("url", imageUrl)

        return new Response(JSON.stringify({ success: true, imageUrl }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Server Error' }), { status: 500 });
    }
}
