import checkUpdate from './chkUpdate.service.js';
import { ArgumentError } from './wrapper.js';

export default async function checkUpdateController(req, res, next) {
    const lastSync = req.query.last_sync ?? req.body.last_sync;
    if (lastSync == null) {
        throw new ArgumentError('The parameter "last_sync" is mandatory!');
    }
    const isUpdate = await checkUpdate(lastSync);
    return res.status(200).json({
        is_update: isUpdate
    });
}
