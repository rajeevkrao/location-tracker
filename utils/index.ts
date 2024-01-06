import type { HttpMethod } from '@/types/apiRoutes';
import type { NextApiRequest } from 'next';

const throwError = (code: number, name: string = 'Unknown Error') => {
	let error: any = new Error(name);
	error.code = code;
	throw error;
};

const throwUnauthorized = () => throwError(401, 'Unauthorized');

const acceptedMethods = (methods: HttpMethod | HttpMethod[], request: NextApiRequest) => {
    if (typeof methods === 'string') methods = [methods];
    if (!methods.includes(request.method as HttpMethod)) throwError(404, 'Route not found');
}

export { throwError, throwUnauthorized, acceptedMethods };
