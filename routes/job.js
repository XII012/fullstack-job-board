const express = require('express');
const auth_middleware = require('./auth_middleware');
const router = express.Router();
const JobAccessor = require('./models/Job.Model');

router.get('/findAll', function(request, response) {
  return JobAccessor.getAllJob()
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))
})

router.get('/findById/:jobId', function(request, response) {
  const jobId = request.params.jobId;
  return JobAccessor.findJobById(jobId)
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))
})

router.get('/findByIds', function(request, response) {
  const jobIds = request.query.jobIds;
  console.log("qqq")
  return JobAccessor.findJobByIds(jobIds)
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))
})

router.get('/findByTitle/:jobTitle', function(request, response) {
  const jobTitle = request.params.jobTitle;
              
  return JobAccessor.findJobByTitle(jobTitle)
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))
})

router.get('/myJobs', auth_middleware, function(request, response) {
  return JobAccessor.findJobByPoster(request.username)
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))
  
})

router.post('/create', auth_middleware, (request, response) => {
  const job = request.body;
  if(!job.jobTitle || !job.companyName || !job.location || !job.description || !job.employerEmail) {
    return response.status(422).send("Missing data");
  }
  // console.log(job)

  job.poster = request.username;
  
  return JobAccessor.insertJob(request.body)
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))

})

router.put('/update/:jobId', auth_middleware, function(request, response) {
  const job = request.body;
  const jobId = request.params.jobId;

  // console.log(job);
  // console.log(jobId);

  if(!job.jobTitle || !job.companyName || !job.location || !job.description || !job.employerEmail) {
    return response.status(422).send("Missing data");
  }

  return JobAccessor.updateJobById(jobId, job)
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error));

})

router.delete('/delete/:jobId', auth_middleware, function(request, response) {
  const jobId = request.params.jobId;
  // console.log(jobId)

  return JobAccessor.deleteById(jobId)
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error));

})

module.exports = router; // <== Look at our new friend, module.exports!