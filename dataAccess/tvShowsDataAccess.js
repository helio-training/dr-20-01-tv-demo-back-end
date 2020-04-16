const { MongoClient } = require('mongodb')

const getConnectedClient = async () => {
    const connectionString = process.env.MONGO_CONNECTION_STRING

    console.log('connectionString', connectionString)

    const client = new MongoClient(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    return await client.connect()
}

const getTVShowsCollection = async (client) => {
    return await client.db('dr-20-01-tv-demo-db').collection('tv-shows')
}

const getTVShows = async () => {
    const client = await getConnectedClient()

    try {
        const collection = await getTVShowsCollection(client)
        return await collection.find().toArray()
    } finally {
        await client.close()
    }
}

const createTVShow = async (tvShow) => {
    const client = await getConnectedClient()

    try {
        const collection = await getTVShowsCollection(client)
        await collection.insertOne(tvShow)
    } finally {
        client.close()
    }
}

module.exports = {
    getTVShows,
    createTVShow
}
