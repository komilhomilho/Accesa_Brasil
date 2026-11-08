import model from '../../shared/models/link.model.js';

export default async function syncService(previousUpdateDate) {
    const date = new Date(Number(previousUpdateDate));
    const response = await model.find()
        .where('lastUpdated')
        .gt(date)
        .lean()
        .exec();
    return response;
}
