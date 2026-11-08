import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mobileRoutes from './modules/mobile/mobile.routes.js'
import "./shared/utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const publicPath = path.join(__dirname, '../../frontend/public');
const srcPath = path.join(__dirname, '../../frontend/src');

app.use(express.json());

app.use(express.static(publicPath));
app.use('/api/mobile', mobileRoutes);

app.use('/src', express.static(srcPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

export default app;