const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest} = require('../middleware/auth')

const Story = require("../models/Story")

//@desc Login/Landing Page
//@route GET /
router.get('/', ensureGuest, (req, res) => {
    res.render("login",{
        layout:'login'
    })
})

//@desc Dashboard Page
//@route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render("dashboard", {
            name: req.user.firstName,
            stories
        })
    } catch (error) {
        console.error(err)
        res.render("error/500")
    }
    
})

module.exports = router