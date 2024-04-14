import cors from "cors";
import express, {type Request, type Response} from "express";
import { config } from "dotenv";
import { createServer } from "http";
import "./mqtt";
import { type Client } from "./types/client";

config();

const { PORT } = process.env;

const clients: Client[] = []

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

const server = createServer(app);


const eventsHandler = (req: Request, res: Response): void => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };

    res.writeHead(200, headers);
    const clientId = Date.now();
    const newClient: Client = {
        id: clientId,
        res
    };
    clients.push(newClient);
    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        // clients = clients.filter(client => client.id !== clientId);
    });
};

export const sendMessage = (message: string): void => {
    clients.forEach(client => {
        if (client.res != null) {
            client.res.write(`data: ${JSON.stringify({ message })}\n\n`);
        }
    });
}


app.get("/clients", (req, res) => {
    res.json(clients);
});

app.get("/events", eventsHandler);

app.get("/status", (req, res) => {
    return res.json({ clients: clients.length });
});

server.listen(parseInt(`${PORT}`), () => {
  console.log(`Server is running on port ${PORT}`);
});