import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiResponse } from '@/types/apiRoutes'

import redisClient, { pubSubClient } from '@/config/redis'
import { acceptedMethods, throwError } from '@/utils'
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    try {
        acceptedMethods('POST', req);
        const name = req.cookies.name;
        if(!name || name === '') throwError(401,'Name is not provided');
        pubSubClient.publish(`location-${name}`, JSON.stringify(req.body))
        await redisClient.set('test', 'test');
        res.json({status: 'sucess'})
    } catch (err:any) {
        res.status(err?.code || 400).json({ status: 'error', message: err?.message || 'Something Went Wrong!'});
    }
}