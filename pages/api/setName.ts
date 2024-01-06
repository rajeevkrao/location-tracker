import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiResponse } from '@/types/apiRoutes'

import cookie from "cookie";
import { acceptedMethods } from '@/utils'
 
export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    try {
        acceptedMethods('GET', req);
        const { name } = req.query;
        res.setHeader('Set-Cookie', cookie.serialize('name', name as string))
        res.json({status: 'sucess', obj: req.cookies.name})
    } catch (err:any) {
        res.status(err?.code || 400).json({ status: 'error', message: err?.message || 'Something Went Wrong!'});
    }
}