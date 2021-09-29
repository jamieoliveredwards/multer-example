import express from 'express';
import multer from 'multer';
import morgan from 'morgan';
import path from 'path';
import sha256 from 'js-sha256';
import fs from 'fs';

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, path.join(__dirname, '../', 'uploads'));
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').reverse()[0];
        const fileName = `${sha256.sha256(file.originalname)}.${ext}`;
        return cb(null, fileName);
    }
});
const uploader = multer({ storage: storage });

const getFilePath = (pathFromRoot: string[]) => path.join(__dirname, '../', ...pathFromRoot);

app.use(morgan('dev'));

app.get('', (req, res) => res.sendFile(getFilePath(['static', 'index.html'])));
app.get('/index.js', (req, res) => res.sendFile(getFilePath(['static', 'index.js'])));
app.get('/images', (req, res) => {
    const dirOutput = fs.readdirSync(getFilePath(['uploads']));
    return res.json(dirOutput);
});
app.get('/images/:id', (req, res) => res.sendFile(getFilePath(['uploads',req.params.id])));
app.post('/upload', uploader.single('file'), (req, res) => res.redirect('/'));

app.listen(8080, () => console.log('App listening on port 8080'));
