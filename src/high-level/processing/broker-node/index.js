require('dotenv').config()

const zmq = require('zeromq')
const mongoose = require('mongoose')
const Sensor = require('../../models/mongoose/Sensor')(mongoose)
const Reading = require('../../models/mongoose/Reading')(mongoose)

mongoose.connect(`mongodb+srv://ds-admin:${process.env.PW}@sanitation-ds.tvbje.mongodb.net/sanitation-ds?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const sock = new zmq.Subscriber()
sock.subscribe('')

sock.connect('tcp://localhost:5560')

receive()

async function receive() {
    console.log('Receiving')

    for await (const msg of sock) {
        console.log(JSON.parse(msg.toString()))
    }
}

async function Init() {
    sensors = await Sensor.find()

    for (const sensor of sensors) {
        const { id } = sensor

        const reading = await Reading.create({
            missing: false,
            healthy: true,
            bad_section: false,
            flow: 50,
            height: 5,
            pressure: 2.5,
        })

        sensor.readings.push(reading)

        await sensor.save()

        console.log(sensor)
    }
}