import syncService from './sync.service.js';
import { ArgumentError } from './wrapper.js';

export default async function syncServiceController(req, res, next) {
    const lastSync = req.query.last_sync ?? req.body.last_sync;
    if (lastSync == null) {
        throw new ArgumentError('The parameter "last_sync" is mandatory!');
    }
    const data = await syncService(lastSync);
    return res.status(200).json({
        links: data
    });
}
