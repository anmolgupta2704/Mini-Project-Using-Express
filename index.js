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
// app.get('/about/:username', (req, res) => {
//     const username = req.params.username;

//     res.render('index', {
//         page: 'about',
//         username: username
//     });
// });


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});