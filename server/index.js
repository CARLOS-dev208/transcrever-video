import express from 'express';
import cors from 'cors';
import multer from 'multer';
import {createMP3} from "./create-mp3.js";

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, 'audio.mp4');
    }
});
const upload = multer({storage: storage});

const app = express();
app.use(cors());

app.get('/audio', async (req, res) => {
    const videoId = req.query.v
    try {
        // await downloadVideo(videoId);
        await createMP3();
        return res.send('ok')
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
})


app.post('/upload', upload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Nenhum vídeo foi enviado.');
        }
        await createMP3()

        res.status(200).send('Vídeo enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar o vídeo:', error);
        res.status(500).send('Erro ao enviar o vídeo. Tente novamente.');
    }
});
app.listen(3333, () => console.log('server up'))
