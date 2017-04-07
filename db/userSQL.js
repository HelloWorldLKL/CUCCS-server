var UserSQL = {
  getCourseType: 'SELECT * FROM t_courseclass WHERE ccDel = 0',
  getCarouselInfo: 'SELECT * FROM t_carousel WHERE caDel = 0',
  getRecommendCourse: 'SELECT t_course.cID ID, cName title, cCover cover, cInfo info, v_coursesourcecount.sectionCount FROM t_course, v_coursesourcecount WHERE t_course.cID = v_coursesourcecount.cID AND cShowFlag = 1',
  getUndelCourse: 'SELECT t_course.cID ID, cName title, cCover cover, cInfo info, v_coursesourcecount.sectionCount FROM t_course, v_coursesourcecount WHERE t_course.cID = v_coursesourcecount.cID',
  getCourseByTitle: 'SELECT t_course.cID ID, cName title, cCover cover, cInfo info, v_coursesourcecount.sectionCount FROM t_course, v_coursesourcecount WHERE t_course.cID = v_coursesourcecount.cID AND cName LIKE concat("%", ?, "%") LIMIT ?, ?',
  getCourseByTypeID: 'SELECT t_course.cID ID, cName title, cCover cover, cInfo info, v_coursesourcecount.sectionCount FROM t_course, v_coursesourcecount WHERE t_course.cID = v_coursesourcecount.cID AND t_course.ccID = ? LIMIT ?, ?',
  getCourseByCourseID: 'SELECT t_course.cID ID, cName title, cCover cover, cInfo info, v_coursesourcecount.sectionCount FROM t_course, v_coursesourcecount WHERE t_course.cID = v_coursesourcecount.cID AND t_course.cID = ?',
  getSourceByCourseID: 'SELECT sID sectionID, uID userID, sName title, sInfo info, sCover cover, sDocPath docPath, sPptPath pptPath, sDocPdfPath docPdfPath, sPptPdfPath pptPdfPath FROM t_source where sDel = 0 AND cID = ? LIMIT ?, ?',
  getSectionBySectionID: 'SELECT sID sectionID, uID userID, sName title, sInfo info, sCover cover, sDocPath docPath, sPptPath pptPath, sDocPdfPath docPdfPath, sPptPdfPath pptPdfPath FROM t_source where sDel = 0 AND sID = ?'

};
module.exports = UserSQL;
