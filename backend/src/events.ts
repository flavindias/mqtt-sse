import { type Request, type Response } from 'express';

export const eventsHandler = (req: Request, res: Response): void => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };

    res.writeHead(200, headers);
    const data = `data: ${JSON.stringify({ message: 'Hello World!' })}\n\n`;
    res.write(data);
    const clientId = Date.now();
    // const newClient = {
    //     id: clientId,
    //     res
    // };
    // clients.push(newClient);
    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        // clients = clients.filter(client => client.id !== clientId);
    });
};