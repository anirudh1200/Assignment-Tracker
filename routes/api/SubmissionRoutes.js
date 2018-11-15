const express       = require('express'),
      router        = express.Router(),
      Submission    = require('../../models/submissions');

// @route   GET /api/submissions/
// @desc    to get all submissions in list
router.get('/', (req, res) => {
    Submission.find()
        .sort({title: 1})
        .then(submissions => res.json(submissions));
});

// @route   POST /api/submissions/
// @desc    to add new submissions in list
router.post('/', (req, res) => {
    const newSubmission = new Submission({
        title: req.body.title,
        subject: req.body.subject,
        date: req.body.date,
        time: req.body.time,
        content: req.body.content,
        author: req.body.author,
    });
    newSubmission.save()
        .then(submission => res.json(submission));
});

// @route   DELETE /api/submissions/:id
// @desc    to delete submissions from list using id
router.delete('/:id', (req,res) => {
    Submission.findById(req.params.id)
        .then(foundSubmission => foundSubmission.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})

module.exports = router;
