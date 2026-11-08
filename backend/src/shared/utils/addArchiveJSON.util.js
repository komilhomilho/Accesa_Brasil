export default async function addArchiveJSON(__dirname, path, fs, __filePath, archiveName, data) {
    const destinationFolder = path.join(__dirname, __filePath);
    const filePath = path.join(destinationFolder, archiveName);

    try {
        await fs.mkdir(destinationFolder, { recursive: true });

        let list = [];
        try {
            const fileContent = await fs.readFile(filePath, 'utf8');
            list = JSON.parse(fileContent);
        } catch (err) {
            console.log.yellow('[tools] File not found, creating a new one...');
        }

        if (Array.isArray(data)) {
            list.push(...data);
        } else {
            list.push(data);
        }

        await fs.writeFile(filePath, JSON.stringify(list, null, 2));
        console.log.yellow('[tools] Item successfully added!');

    } catch (err) {
        console.error('[tools] Error processing JSON file:', err);
    }
}
