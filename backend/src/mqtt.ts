import { connect } from 'mqtt';
import { config } from 'dotenv';
config();
const { MQTT_HOST, MQTT_PORT } = process.env;

const client = connect(`${MQTT_HOST}:${MQTT_PORT}`);

client.on('connect', () => {
    console.log(`Connected to MQTT broker: ${MQTT_HOST}:${MQTT_PORT}`);
    client.subscribe('distritoverde/#');
});

client.on('message', (topic, message) => {
    console.log(`Received message on ${topic}: ${message.toString()}`);
});

client.on('error', (error) => {
    console.error(error);
});

export default client;