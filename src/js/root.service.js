rootApp.service('DataService', ['$http', function($http) {
  let studypathfullURI = CONFIG.studypathfullURI;
  let studypathURI = CONFIG.studypathURI;
  let moduleURI = CONFIG.moduleURI;
  let assignmentURI = CONFIG.assignmentURI;
  let submissionURI = CONFIG.submissionURI;

  this.getStudyPathFull = function(id) {
    if (!id) id = "";
    return $http.get(studypathfullURI+id)
    .then(function(response) {
      return response.data;
    });
  }

  this.getStudyPath = function(id) {
    if (!id) id = "";
    return $http.get(studypathURI+id)
    .then(function(response) {
      return response.data;
    });
  }

  this.getModule = function(id) {
    if (!id) id = "";
    return $http.get(moduleURI+id)
    .then(function(response) {
      return response.data;
    });
  }

  this.putModule = function(id,data) {
    if (!id) return;
    return $http({
      method: 'PUT',
      url: moduleURI + id,
      data: data,
      headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
    .then(function(response) {
      return response.data;
    })
    .catch(function(response) {
      console.log('put ERROR ' + response.status + ' ' + response.data);
    });
  }

  this.postModule = function(id,data) {
    if (!id) return;
    return $http({
      method: 'POST',
      url: moduleURI + id,
      data: data,
      headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
    .then(function(response) {
      return response.data;
    })
    .catch(function(response) {
      console.log('post ERROR ' + response.status + ' ' + response.data);
    });
  }

  // TODO
  // delete
  // all others
}]);
