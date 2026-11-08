import 'dotenv/config';
import app from './app.js';
import connectDB from './config/connectionDB.js';

const webPort = process.env.PORT_WEB || 3000;

connectDB();

app.listen(webPort, () => {
    console.log.blue(`[WEB] Server running at http://localhost:${webPort}`);
});
