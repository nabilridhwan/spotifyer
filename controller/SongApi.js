const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const UserUtils = require("../utils/User");

router.get("/:id", (req, res) => {
    if (!req.params.id) return res.sendStatus(400);

    // Get new token from refresh token
    User.getUserByAppUserID(req.params.id)
        .then(user => {
            if (!user || user.length == 0) {
                return res.sendStatus(404);
            } else {
                UserUtils.getAccessToken(user[0].refresh_token).then(data => {
                    const {
                        access_token
                    } = data;

                    axios({
                        method: "GET",
                        url: `https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=short_term`,
                        headers: {
                            "Authorization": `Bearer ${access_token}`
                        }
                    }).then(response => {
                        return res.json(response.data)
                    }).catch(error => {
                        return res.status(500).json(error.response.data)
                    })
                }).catch(error => {
                    return res.status(500).json(error)
                })
            }
        })
})

router.get("/:id/currently_playing", (req, res) => {
    if (!req.params.id) return res.sendStatus(400);

    // Get new token from refresh token
    User.getUserByAppUserID(req.params.id)
        .then(user => {
            if (!user || user.length == 0) {
                return res.sendStatus(404);
            } else {
                UserUtils.getAccessToken(user[0].refresh_token).then(data => {

                    const {
                        access_token
                    } = data;

                    axios({
                        method: "GET",
                        url: `https://api.spotify.com/v1/me/player/currently-playing`,
                        headers: {
                            "Authorization": `Bearer ${access_token}`
                        }
                    }).then(response => {
                        return res.json(response.data)
                    }).catch(error => {
                        return res.status(500).json(error.response.data)
                    })
                }).catch(error => {
                    return res.status(500).json(error)
                })
            }
        })

})

router.get("/:id/recently_played", (req, res) => {
    if (!req.params.id) return res.sendStatus(400);

    // Get new token from refresh token
    User.getUserByAppUserID(req.params.id)
        .then(user => {
            if (!user || user.length == 0) {
                return res.sendStatus(404);
            } else {
                UserUtils.getAccessToken(user[0].refresh_token).then(data => {

                    const {
                        access_token
                    } = data;

                    axios({
                        method: "GET",
                        url: `https://api.spotify.com/v1/me/player/recently-played`,
                        headers: {
                            "Authorization": `Bearer ${access_token}`
                        }
                    }).then(response => {
                        return res.json(response.data)
                    }).catch(error => {
                        return res.status(500).json(error.response.data)
                    })
                }).catch(error => {
                    return res.status(500).json(error)
                })
            }
        })

})

module.exports = router;