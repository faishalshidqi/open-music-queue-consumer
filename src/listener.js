class Listener {
    constructor(playlistsService, mailSender) {
        this._playlistsService = playlistsService
        this._mailSender = mailSender

        this.listen = this.listen.bind(this)
    }

    async listen(message) {
        try {
            const { userId, targetEmail } = JSON.parse(message.content.toString())

            const playlists = await this._playlistsService.getPlaylists(userId)
            const songs = await this._playlistsService.getSongsFromPlaylist(userId)
            const detail = {
                data: {
                    playlist: {
                        id: playlists.id,
                        name: playlists.name,
                        songs: songs
                    }
                }
            }
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(detail))
            console.log(result)
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = Listener
