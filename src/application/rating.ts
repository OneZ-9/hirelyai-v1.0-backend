import OpenAI from "openai";
import JobApplication from "../infrastructure/schemas/jobApplicatonSchema";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model = `${process.env.FT_MODEL}`;

// Once create a jobApplication with request.body data we can retrieve jobApplication details with id
//@ts-ignore
export async function generateRating(jobApplicationId) {
  const jobApplication = await JobApplication.findById(
    jobApplicationId
  ).populate("job");

  const content = `Role: ${
    //@ts-ignore
    jobApplication?.job?.title
  }, User Description: ${jobApplication?.answers.join(".")}`;

  const completion = await client.chat.completions.create({
    model: model,
    messages: [{ role: "user", content: content }],
  });

  const strResponse = completion.choices[0].message.content;
  //   console.log(strResponse);

  //@ts-ignore
  const response = JSON.parse(strResponse);

  if (!response.rate) return;

  await JobApplication.findOneAndUpdate(
    { _id: jobApplicationId },
    { rating: response.rate }
  );
}
