require('dotenv').config()

const mongoose = require('mongoose')
const Sensor = require('../../models/mongoose/Sensor')(mongoose)
const Reading = require('../../models/mongoose/Reading')(mongoose)

mongoose.connect(`mongodb+srv://ds-admin:${process.env.PW}@sanitation-ds.tvbje.mongodb.net/sanitation-ds?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

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

Init()