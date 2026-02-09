const express = require('express');
const app = express();
const fs = require('fs');


const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        res.render('index', { files: files });
    });
});

app.post('/create', (req, res) => {
    
    fs.writeFile(`./files/${req.body.details.split(" ").join('')}.txt`, req.body.content, (err) => {
        if (err) {
            return res.status(500).send('Error creating file');
        }   
        res.redirect('/');
    });
});
app.get('/files/:filename', (req, res) => {
    const filename = req.params.filename;
    fs.readFile(`./files/${filename}`, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.render('show', { filename: filename, content: data});
    });
});
app.get('/edit/:filename', (req, res) => {
    const filename = req.params.filename;
    fs.readFile(`./files/${filename}`, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.render('edit', { filename: filename, content: data});
    });
});
app.post('/edit', (req, res) => {
    const { details, newDetails } = req.body;
    fs.rename(`./files/${details}`, `./files/${newDetails.split(" ").join('')}.txt`, (err) => {
        if (err) {
            return res.status(500).send('Error renaming file');
        }
        res.redirect('/');
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});