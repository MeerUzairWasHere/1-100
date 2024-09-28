import { createClient } from "redis";
const client = createClient();

async function processSubmission(submission: string) {
    const { problemId, code, language } = JSON.parse(submission);

    console.log(`Processing submission for problemId ${problemId}...`);
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);
    // Here you would add your actual processing logic
    const startTime = new Date(); // Record the start time
    // Simulate processing delay

   // Generate a random number of seconds between 0 and 15 (inclusive)
    const seconds = Math.floor(Math.random() * 16);

    // Simulate processing delay in milliseconds
    await new Promise(resolve => setTimeout(resolve, seconds * 1000));

    const endTime = new Date(); // Record the end time

    // @ts-ignore
    const timeTaken = endTime - startTime; // Calculate the time difference in milliseconds

    console.log(`Finished processing submission for problemId ${problemId}. Time taken: ${timeTaken} ms`);
    console.log(`=================================================`);
}

async function startWorker() {

    try {
        await client.connect();
        console.log("Worker connected to Redis.");

        // Main loop
        while (true) {
            try {
                const submission = await client.brPop("problems", 0);
                // @ts-ignore
                await processSubmission(submission.element);
            } catch (error) {
                console.error("Error processing submission:", error);
                // Implement your error handling logic here. For example, you might want to push
                // the submission back onto the queue or log the error to a file.
            }
        }
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}


startWorker();