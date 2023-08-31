import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
// import axios and express to index.js

const app = express();
const port = 3000;
// create a variable to access express and a variable for port number

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
//using body parser to get anime title



app.get("/", (req, res) => {
    res.render("index.ejs");
});



app.post("/submit", async (req, res) => {
    const animeName1 = req.body.animeName;
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${animeName1}`);
        const respose2 = await axios.get(`https://api.jikan.moe/v4/manga?q=${animeName1}`)
        const result = response.data;
        const result2 = respose2.data;
        const firstAnime = result.data[0];
        const firstManga = result2.data[0];
        res.render("submit.ejs", { trailer: firstAnime.trailer.embed_url, title: firstAnime.title, plot: firstAnime.synopsis, images: firstAnime.images.jpg.large_image_url, episodes: firstAnime.episodes, score: firstAnime.score, duration: firstAnime.duration, titleManga: firstManga.title, chapters: firstManga.chapters, volumes: firstManga.volumes, status: firstManga.status });
    } catch (error) {
        console.log(error);
    }
});



app.listen(port, () => {
    console.log(`listening to port ${port}`);
});
//listen to port


