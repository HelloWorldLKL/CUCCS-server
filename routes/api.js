var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig.js');
var userSQL = require('../db/Usersql.js');
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
// 获取课程类型
router.get('/type', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    connection.query(userSQL.getCourseType, function(err, result) {
      if (result) {     
        responseJSON(res, result);
      }
      connection.release();
    });
  });
});
// 获取图片轮播信息
router.get('/carousel', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    connection.query(userSQL.getCarouselInfo, function(err, result) {
      if (result) {     
        responseJSON(res, result);
      }
      connection.release();
    });
  });
});
// 获取推荐课程
router.get('/recommendCourse', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    connection.query(userSQL.getRecommendCourse, function(err, result) {
      if (result) {     
        responseJSON(res, result);
      }
      connection.release();
    });
  });
});
// 得到所有未被删除的课程
router.get('/undelCourse', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    connection.query(userSQL.getUndelCourse, function(err, result) {
      if (result) {     
        responseJSON(res, result);
      }
      connection.release();
    });
  });
});
// 通过名字搜索课程
router.post('/getCourseByTitle', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.body;
    console.log(param);
    if (param.title == undefined) {
      console.log('getCourseByTitle ERR');
      return;
    }
    var temp = (param.cPage - 1) * param.pSize;
    connection.query(userSQL.getCourseByTitle, [param.title, parseInt(temp), parseInt(param.pSize)], function(err, result) {
      if (result) {     
        responseJSON(res, result);
      }
      connection.release();
    });
  });
});
// 通过类型ID搜索课程
router.get('/getCourseByCourseClassID', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    var temp = (param.cPage - 1) * param.pSize;
    connection.query(userSQL.getCourseByTypeID, [param.ccID, parseInt(temp), parseInt(param.pSize)], function(err, result) {
      if (result) {     
        responseJSON(res, result);
      }
      connection.release();
    });
  });
});
// 通过课程ID搜索课程
router.get('/getCourseByCourseID', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    connection.query(userSQL.getCourseByCourseID, [param.cID], function(err, result) {
      if (result) {     
        responseJSON(res, result[0]);
      }
      connection.release();
    });
  });
});
// 通过课程ID搜索案例
router.get('/getSourceByCourseID', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    var temp = (param.cPage - 1) * param.pSize;
    connection.query(userSQL.getSourceByCourseID, [param.cID, parseInt(temp), parseInt(param.pSize)], function(err, result) {
      if (result) {     
        responseJSON(res, result);
      }
      connection.release();
    });
  });
});
// 通过案例ID搜索案例
router.get('/getSectionBySectionID', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    connection.query(userSQL.getSectionBySectionID, [param.sID], function(err, result) {
      if (result) {     
        responseJSON(res, result[0]);
      }
      connection.release();
    });
  });
});
// 通过类型ID搜索课程数量
router.get('/getCourseTotalCount', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    connection.query('SELECT count(*) courseCount FROM t_course where ccID = ?', [param.ccID], function(err, result) {
      if (result) {     
        responseJSON(res, result[0]);
      }
    });
  });
});
// 通过课程标题搜索课程数量
router.get('/getCourseTotalCountByTitle', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    connection.query('SELECT count(*) courseCount FROM t_course where cName LIKE concat(\'%\', ?, \'%\')', [param.title], function(err, result) {
      if (result) {     
        responseJSON(res, result[0]);
      }
    });
  });
});
// 通过类型ID搜索案例数量
router.get('/getSectionTotalCount', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    connection.query('SELECT count(*) sectionCount FROM t_source where cID = ?', [param.cID], function(err, result) {
      if (result) {     
        responseJSON(res, result[0]);
      }
    });
  });
});
module.exports = router;