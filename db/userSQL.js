var UserSQL = {
  getCourseType: 'SELECT ccID,ccName,ccOrderFlag FROM t_courseClass WHERE ccDel = 0 AND ccShowFlag = 0',
  getAllCourseType: 'SELECT ccID,ccName,ccShowFlag,ccOrderFlag,ccDate FROM t_courseClass WHERE ccDel = 0',
  getCarousel: 'SELECT * FROM t_carousel',
  getRecommendCourse: 'SELECT t_course.cID, cName, cCover, cInfo, v_courseSectionCount.sectionCount FROM t_course, v_courseSectionCount WHERE t_course.cID = v_courseSectionCount.cID AND cShowFlag = 1',
  getCourse: 'SELECT t_course.cID, cName, cCover, cInfo, v_courseSectionCount.sectionCount FROM t_course, v_courseSectionCount WHERE t_course.cID = v_courseSectionCount.cID',
  getCourseByTitle: 'SELECT t_course.cID, cName, cCover, cInfo, v_courseSectionCount.sectionCount FROM t_course, v_courseSectionCount WHERE t_course.cID = v_courseSectionCount.cID AND cName LIKE concat("%", ?, "%") LIMIT ?, ?',
  getCourseByTypeID: 'SELECT t_course.cID, cName, cCover, cInfo, v_courseSectionCount.sectionCount FROM t_course, v_courseSectionCount WHERE t_course.cID = v_courseSectionCount.cID AND t_course.ccID = ? LIMIT ?, ?',
  getCourseByCourseID: 'SELECT t_course.cID, cName, cCover, cInfo, v_courseSectionCount.sectionCount FROM t_course, v_courseSectionCount WHERE t_course.cID = v_courseSectionCount.cID AND t_course.cID = ?',
  getSourceByCourseID: 'SELECT sID, uID, sName, sInfo, sCover, sDocPath, sPptPath, sDocPdfPath, sPptPdfPath FROM t_section where sDel = 0 AND cID = ? LIMIT ?, ?',
  getSectionBySectionID: 'SELECT sID, uID, sName, sInfo, sCover, sDocPath, sPptPath, sDocPdfPath, sPptPdfPath FROM t_section where sDel = 0 AND sID = ?'

};
module.exports = UserSQL;
