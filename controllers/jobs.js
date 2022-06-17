// Dependencies
const express = require('express');
const Job = require('../models/job.js');
const jobsRouter = express.Router();

//Routes

// INDEX
jobsRouter.get('/jobapplications', async (req, res) => {
    try {
        const googleId = req.user.uid;
        const jobs = await Job.find({ googleId });
    res.json(jobs);
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'})
    } 
});


// CREATE
jobsRouter.post('/jobapplications', async (req, res) => {
    try {
        req.body.googleId = req.user.uid;
        const job = await Job.create(req.body);
        res.json(job);
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'});
    }
});

// UPDATE
jobsRouter.put('/jobapplications/:id', async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJob)
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'});
    }
});

// DELETE
jobsRouter.delete('/jobapplications/:id', async (req, res) => {
    try {
        res.json(await Job.findByIdAndDelete(req.params.id));
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'});
    }
});


//Export jobs router
module.exports = jobsRouter;