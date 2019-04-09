const WebTorrent = require('webtorrent');

const client = new WebTorrent();
let server = null;
let index = 0;
let hash = Date.now();

module.exports = async (req, res) => {
    const torrent = client.get(req.body.magnet);

    if (torrent) {
        return res.send({url: `http://localhost:9000/${index}?hash=${hash}`});
    }

    if (server) {
        server.close();
    }

    client.add(req.body.magnet, torrent => {
        for (let i = 0; i < torrent.files.length; i++) {
            if (torrent.files[i].name.endsWith('.mp4')) {
                index = i;
                break;
            }
        }

        server = torrent.createServer();
        server.listen(9000);
        hash = Date.now();
        return res.send({url: `http://localhost:9000/${index}?hash=${hash}`});
    });
};
