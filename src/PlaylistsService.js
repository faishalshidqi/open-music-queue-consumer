const { Pool } = require('pg')

class PlaylistsService {
    constructor() {
        this._pool = new Pool()
    }

    async getPlaylists(userId) {
        const query = {
            text: 'select * from playlists where owner = $1',
            values: [userId]
        }

        const result = await this._pool.query(query)
        return result.rows
    }

    async getSongsFromPlaylist(id) {
        const query = {
            text: 'select songs.id, songs.title, songs.performer from songs left join playlist_songs on songs.id = playlist_songs.song_id where playlist_songs.playlist_id = $1',
            values: [id]
        }

        const result = await this._pool.query(query)
        return result.rows
    }
}

module.exports = PlaylistsService
