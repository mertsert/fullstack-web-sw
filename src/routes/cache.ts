import * as mcache from 'memory-cache';

class Cache {
	public cache(_duration: number): any {
		return (req : any, res: any, next: any) => {
			let key = '__express__' + req.originalUrl || req.url;

			let cachedBody = mcache.get(key);
			if (cachedBody) {
				res.send(cachedBody);
			} 
            else {
				res.sendResponse = res.send;
				res.send = (body : any) => {
					mcache.put(key, body, _duration * 1000);
					res.sendResponse(body);
				};
				next();
			}
		};
	}
}
export default new Cache;