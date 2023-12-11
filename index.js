import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://api.adviceslip.com/advice");
    console.log(result.data.slip.advice);
    res.render('index', {
        advice: result.data.slip.advice,
    });
} catch (error) {
    if (error.response) {
      // If there's a response in the error, log it
      console.error(error.response.data);
      res.status(500).send('Internal Server Error');
    } else {
      // If there's no response, log a more generic error
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
