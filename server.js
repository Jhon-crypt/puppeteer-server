const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/launch-puppeteer', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    // Perform any additional actions here...

    await browser.close();
    res.send('Puppeteer script executed successfully.');
  } catch (error) {
    res.status(500).send('Error executing Puppeteer script: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
