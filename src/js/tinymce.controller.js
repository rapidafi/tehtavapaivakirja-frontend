'use strict';

rootApp.controller('TinyMceController', function($scope) {
  $scope.tinymceModel = 'Initial content ' + (new Date());

  $scope.getContent = function() {
    console.log('Editor content:', $scope.tinymceModel);
  };

  $scope.setContent = function() {
    $scope.tinymceModel = 'Time: ' + (new Date());
  };

  $scope.tinymceOptions = {
    //plugins: 'link image code',
    //toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
  };
});
