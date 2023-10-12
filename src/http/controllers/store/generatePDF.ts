import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { s3 } from "@/lib/s3";

export async function generatePDF(orderNo: string) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-features=IsolateOrigins",
      "--disable-site-isolation-trials",
      "--autoplay-policy=user-gesture-required",
      "--disable-background-networking",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-breakpad",
      "--disable-client-side-phishing-detection",
      "--disable-component-update",
      "--disable-default-apps",
      "--disable-dev-shm-usage",
      "--disable-domain-reliability",
      "--disable-extensions",
      "--disable-features=AudioServiceOutOfProcess",
      "--disable-hang-monitor",
      "--disable-ipc-flooding-protection",
      "--disable-notifications",
      "--disable-offer-store-unmasked-wallet-cards",
      "--disable-popup-blocking",
      "--disable-print-preview",
      "--disable-prompt-on-repost",
      "--disable-renderer-backgrounding",
      "--disable-setuid-sandbox",
      "--disable-speech-api",
      "--disable-sync",
      "--hide-scrollbars",
      "--ignore-gpu-blacklist",
      "--metrics-recording-only",
      "--mute-audio",
      "--no-default-browser-check",
      "--no-first-run",
      "--no-pings",
      "--no-sandbox",
      "--no-zygote",
      "--password-store=basic",
      "--use-gl=swiftshader",
      "--use-mock-keychain",
    ],
  });
  const page = await browser.newPage();
  await page.goto(`http://localhost:3333/invoice/${orderNo}`, {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    printBackground: true,
    format: "Letter",
  });

  await browser.close();

  // Save the PDF to a file
  const pdfFileName = `invoice-${orderNo}.pdf`; // Define a filename
  console.log(`Saving PDF to ${pdfFileName}`);
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "invoices",
    `${pdfFileName}`
  );
  const pdfFilePath = `${filePath}`; // Define the file path

  try {
    fs.writeFileSync(pdfFilePath, pdf); // Write the PDF content to the file

    // Initialize AWS SDK with your credentials

    const fileStream = fs.createReadStream(pdfFilePath);

    const params = {
      Bucket: "phone-garage-invoices",
      Key: pdfFileName,
      Body: fileStream,
      ContentType: "application/pdf",
    };

    // Upload the PDF to S3
    await s3.upload(params).promise();
    fs.unlinkSync(pdfFilePath);
    console.log(`PDF uploaded to S3 with key: ${pdfFileName}`);

    // Generate and return the S3 URL
    const s3Url = `https://phone-garage-invoices.s3.amazonaws.com/${pdfFileName}`;
    return s3Url;
  } catch (error) {
    console.error("Error saving PDF:", error);
  }
}
