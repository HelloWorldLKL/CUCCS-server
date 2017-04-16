var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig.js');
var userSQL = require('../db/userSQL.js');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};
// 获取图片轮播信息
router.get('/carousel', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    connection.query(userSQL.getCarousel, function(err, result) {
      if (result) {     
        responseJSON(res, result);
      }
      connection.release();
    });
  });
});
// 获取课程类型信息
router.get('/courseType', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    var sql;
    if(param.all == 0) {
      sql = userSQL.getCourseType;
    } else {
      sql = userSQL.getAllCourseType;
    }
    connection.query(sql, function(err, result) {
      if (result) {     
        responseJSON(res, result);
      }
      connection.release();
    });
  });
});
// 获取课程信息
router.get('/course', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    var sql, arr, objFlag;
    if(param.recommend) {
      // 获取推荐课程信息
      sql = userSQL.getRecommendCourse;
    } else if(param.all) {
      // 获取所有课程
      sql = userSQL.getCourse;
    } else if(param.cPage && param.pSize && param.ccID) {
      // 通过类型ID搜索课程信息
      var temp = (param.cPage - 1) * param.pSize;
      sql = userSQL.getCourseByTypeID;
      arr = [param.ccID, parseInt(temp), parseInt(param.pSize)];
    } else if(param.cID) {
      // 通过课程ID搜索课程信息
      var temp = (param.cPage - 1) * param.pSize;
      sql = userSQL.getCourseByCourseID;
      arr = [param.cID];
      objFlag = true
    } else {
      res.json({
        code: '-200',
        msg: '操作失败'
      });
    }
    console.log(`sql:\n${sql}\narr:\n${arr}\n`);
    connection.query(sql, arr, function(err, result) {
      if (result) {
        if(objFlag) {
          responseJSON(res, result[0]);
        } else {
          responseJSON(res, result);
        }
      }
      connection.release();
    });
  });
});
// 通过名字搜索课程
router.post('/course', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.body;
    var temp = (param.cPage - 1) * param.pSize;
    connection.query(userSQL.getCourseByTitle, [param.title, parseInt(temp), parseInt(param.pSize)], function(err, result) {
      if (result) {     
        responseJSON(res, result);
      }
      connection.release();
    });
  });
});


// 获取课程信息
router.get('/section', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    var sql, arr, objFlag;
    if(param.cPage && param.pSize && param.cID) {
      // 通过课程ID搜索案例
      sql = userSQL.getSourceByCourseID;
      var temp = (param.cPage - 1) * param.pSize;
      arr = [param.cID, parseInt(temp), parseInt(param.pSize)];
    } else if(param.sID) {
      // 通过案例ID搜索案例
      sql = userSQL.getSectionBySectionID;
      arr = [param.sID];
      objFlag = true
    } else {
      res.json({
        code: '-200',
        msg: '操作失败'
      });
    }
    connection.query(sql, arr, function(err, result) {
      if (result) {
        if(objFlag) {
          responseJSON(res, result[0]);
        } else {
          responseJSON(res, result);
        }
      }
      connection.release();
    });
  });
});

router.get('/count', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    var sql, arr;
    if(param.by === 'ccID' && param.get === 'course' && param.ccID) {
      // 通过类型ID搜索课程数量
      sql = 'SELECT count(*) courseCount FROM t_course where ccID = ?';
      arr = [param.ccID];
    } else if(param.by === 'title' && param.get === 'course' && param.title) {
      // 通过课程标题搜索课程数量
      sql = 'SELECT count(*) courseCount FROM t_course where cName LIKE concat(\'%\', ?, \'%\')';
      arr = [param.title];
    } else if(param.by === 'cID' && param.get === 'section' && param.cID) {
      // 通过课程ID搜索案例数量
      sql = 'SELECT count(*) sectionCount FROM t_section where cID = ?';
      arr = [param.cID];
    } else {
      res.json({
        code: '-200',
        msg: '操作失败'
      });
    }
    connection.query(sql, arr, function(err, result) {
      if (result) {
        responseJSON(res, result[0]);
      }
      connection.release();
    });
  });
});
module.exports = router;