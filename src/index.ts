import * as express from 'express';
import {Request, Response} from 'express';

const app = express();

const port = parseInt(process.env.PORT || "8080");

const baseUrl = process.env.BASE_URL || 'https://bosh.io/d/';

const log = (message: string, data?: any) => console.log(JSON.stringify({timestamp: new Date().getTime(), message, ...data}));

const transformUrl = (url: string): string|undefined => {
    const parts = url.split('/');
    if (parts.length < 3) return undefined;

    const versionMatch = parts[1].match('^v=(.*)$');
    if (!versionMatch) return undefined;

    const version = versionMatch[1];
    const target = parts.slice(2).join('/');
    return `${baseUrl}${target}?v=${version}`;
};

const handler = (req: Request, res: Response) => {
    const target = transformUrl(req.url);
    if (target === undefined) res.sendStatus(400);

    log('redirecting', {target});
    return res.redirect(target);
};

app.get('*', handler);

app.listen(port, () => log('listening', {port}));