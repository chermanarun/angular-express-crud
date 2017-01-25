var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/employees', function (err, connect) {
  if (err) console.log("connection err", err)
  else console.log("Connection Successfulll......")
});

var Schema = mongoose.Schema;
var employeeSchema = new Schema({
  type: Schema.Types.ObjectId,
  name: {
    type: String
  },
  job_title: {
    type: String
  },
  department: {
    type: String
  },
  annual_salary: {
    type: String
  },
  created_at: {
    type: Date
  },
  modified_at: {
    type: Date
  }
});

var employerModel = mongoose.model('employers', employeeSchema);

router.get('/employees', function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  employerModel.find({}, function (err, result) {
    res.json(result);
  });
});

router.get('/employees/:start/:limit', function (req, res, next) {
  var start = req.params.start;
  var limit = req.params.limit;

  console.log("Start : ", start, "Type of Start : ", typeof start)
  // res.header("Access-Control-Allow-Origin", "*");
  employerModel.count({}, function (err, totalCount) {
    employerModel.find({}, function (err, result) {
      var endResult = {
        totalCount: totalCount,
        data: result
      }
      res.json(endResult);
    }).skip(parseInt(start)).limit(parseInt(limit));
  });

});

router.get('/employees/:employeeId', function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  employeeId = req.params.employeeId;
  employerModel.findOne({
    '_id': employeeId
  }, function (err, result) {
    res.json(result);
  });
});

router.post('/employees', function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  var singleEmployee = new employerModel();

  var jsonData = JSON.parse(req.body.data);

  singleEmployee.name = jsonData.employeename;
  singleEmployee.job_title = jsonData.job_title;
  singleEmployee.department = jsonData.department;
  singleEmployee.annual_salary = jsonData.annual_salary;
  singleEmployee.created_at = new Date();
  singleEmployee.save(function (err, result) {
    res.json(result);
  });
});

router.put('/employees/:empid', function (req, res, next) {
  // res.header('Access-Control-Allow-Origin: *');
  // res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  // res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
  // if ('OPTIONS' == req.method) {
  //   res.send(200);
  // }

  var jsonData = JSON.parse(req.body.data);

  employeeId = req.params.empid;
  employerModel.findOne({
    '_id': req.params.empid
  }, function (err, singleEmployee) {
    singleEmployee.name = jsonData.employeename;
    singleEmployee.job_title = jsonData.job_title;
    singleEmployee.department = jsonData.department;
    singleEmployee.annual_salary = jsonData.annual_salary;
    singleEmployee.modified_at = new Date();
    singleEmployee.save(function (err, result) {
      res.json(result);
    });
  });
});

router.put('/employees', function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  var jsonData = JSON.parse(req.body.data);
  employeeId = jsonData.employeeid
  employerModel.findOne({
    '_id': jsonData.employeeid
  }, function (err, singleEmployee) {
    singleEmployee.name = jsonData.employeename;
    singleEmployee.job_title = jsonData.job_title;
    singleEmployee.department = jsonData.department;
    singleEmployee.annual_salary = jsonData.annual_salary;
    singleEmployee.modified_at = new Date();
    singleEmployee.save(function (err, result) {
      res.json(result);
    });
  });
});

router.delete('/employees/:employeeId', function (req, res, next) {
  // res.header('Access-Control-Allow-Origin: *');
  // res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  // res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    employeeId = req.params.employeeId;
    employerModel.remove({
      '_id': employeeId
    }, function (err, result) {
      res.json(result);
    });
  }

});

module.exports = router;