const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import cors

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.post('/getVerses', async (req, res) => {
    const { verse } = req.body;

    try {
        const bible_books_index = {
            Genesis: 1,
            Exodus: 2,
            Leviticus: 3,
            Numbers: 4,
            Deuteronomy: 5,
            Joshua: 6,
            Judges: 7,
            Ruth: 8,
            '1 Samuel': 9,
            '2 Samuel': 10,
            '1 Kings': 11,
            '2 Kings': 12,
            '1 Chronicles': 13,
            '2 Chronicles': 14,
            Ezra: 15,
            Nehemiah: 16,
            Esther: 17,
            Job: 18,
            Psalms: 19,
            Proverbs: 20,
            Ecclesiastes: 21,
            'Song of Solomon': 22,
            Isaiah: 23,
            Jeremiah: 24,
            Lamentations: 25,
            Ezekiel: 26,
            Daniel: 27,
            Hosea: 28,
            Joel: 29,
            Amos: 30,
            Obadiah: 31,
            Jonah: 32,
            Micah: 33,
            Nahum: 34,
            Habakkuk: 35,
            Zephaniah: 36,
            Haggai: 37,
            Zechariah: 38,
            Malachi: 39,
            Matthew: 40,
            Mark: 41,
            Luke: 42,
            John: 43,
            Acts: 44,
            Romans: 45,
            '1 Corinthians': 46,
            '2 Corinthians': 47,
            Galatians: 48,
            Ephesians: 49,
            Philippians: 50,
            Colossians: 51,
            '1 Thessalonians': 52,
            '2 Thessalonians': 53,
            '1 Timothy': 54,
            '2 Timothy': 55,
            Titus: 56,
            Philemon: 57,
            Hebrews: 58,
            James: 59,
            '1 Peter': 60,
            '2 Peter': 61,
            '1 John': 62,
            '2 John': 63,
            '3 John': 64,
            Jude: 65,
            Revelation: 66,
        };

        const response = await axios.get(
            `https://bible-go-api.rkeplin.com/v1/books/${bible_books_index[verse.book]}/chapters/${verse.chapter}?translation=NIV`
        );

        const data = response.data;

        let wordArray = [];

        if (verse.end_verse) {
            const verses = [];

            for (let i = verse.start_verse - 1; i < verse.end_verse; i++) {
                verses.push(data[i].verse.replace(/[^a-zA-Z\s]/g, ''));
            }

            verses.forEach((str) => {
                let words = str.split(/\s+/); // Split by one or more spaces
                wordArray = wordArray.concat(words);
            });
        } else {
            const cleanVerse = data[verse.start_verse - 1].verse.replace(/[^a-zA-Z\s]/g, '');
            wordArray = cleanVerse.split(/\s+/);
        }

        res.json({ words: wordArray });
    } catch (error) {
        res.status(500).json({ error: 'Oh no! An error occurred while fetching the verses.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
