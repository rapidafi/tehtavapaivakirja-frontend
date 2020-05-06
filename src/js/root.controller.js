'use strict';

rootApp.controller('rootController',
['$scope','$http','$filter','$interval','$timeout','DataService',
function($scope,$http,$filter,$interval,$timeout,Data)
{
  // auth
  $scope.authentication = function() {
    if (typeof auth !== 'undefined') {
      return; //ok
    } else {
//      location.href = "/"; // go away
      return; // stop here!
    }
  }
  $scope.authentication(); //test immediately
  $scope.auth = auth;//copy once

  //
  // BACKEND / DATA
  //

  $scope.getStudyPathFull = function() {
    $scope.debug && console.debug('getStudyPathFull');
    $scope.loading = true;
    $scope.authentication();//test
    // for events history
    Data.getStudyPathFull()
    .then(function(data) {
      $scope.debug>2 && console.debug('getStudyPathFull',data);
      $scope.studypaths = data;
      angular.forEach($scope.studypaths,function(d,di){
        // initialize data
        if (!$scope.moduleOpen.hasOwnProperty("id"+d.id)) {
          $scope.moduleOpen["id"+d.id] = false;
        }
        if (!$scope.moduleChange.hasOwnProperty("id"+d.id)) {
          $scope.moduleChange["id"+d.id] = false;
        }

        $scope.debug>1 && console.debug('getStudyPathFull',d,di);
        if (d.id==1) {
          $scope.studypath = d;//linked to studypaths!
        }
      });
      $scope.loading = false;
    });
  }

  //
  //
  //


  //
  // SETTINGS
  //

  $scope.debug = 0; //debug/develop
  
  $scope.Math = Math;

  $scope.studypaths = [];
  $scope.studypath = {};
  $scope.moduleOpen = {}; // id#: true/false
  $scope.moduleChange = {}; // id#: true/false
  
  // hard reset from config (private)
  $scope.resetConfigValues = function() {
    $scope.debug && console.debug("resetConfigValues");
    $scope.lang = lang||'fi';
    $scope.languages = jsonCopy(CONFIG.languages);
    $scope.i18n = jsonCopy(CONFIG.i18n);
    $scope.updateInterval = CONFIG.updateInterval||5;
  }

  let intervalOn;
  $scope.setUpdateInterval = function(sec) {
    $scope.updateInterval = sec;
    $scope.setCookie('updateInterval',sec); //store it
    if (angular.isDefined(intervalOn)) {
      $interval.cancel(intervalOn);
      intervalOn = undefined;
    }
    intervalOn = $interval(function() {
      $scope.debug>1 && console.debug('updateInterval',new Date().toISOString());
      $scope.getStudyPathFull();
    }, $scope.updateInterval*1000);
  }

  // get from store (cookies)
  $scope.getCookieConfig = function() {
    $scope.debug && console.debug("getCookieConfig");
    // use global function
    if (typeof getCookie !== 'undefined') {
      if (getCookie('updateInterval')) {
        $scope.updateInterval = parseInt(getCookie('updateInterval'));
      }
      if (getCookie('itemsPerPage')) {
        $scope.itemsPerPage = parseInt(getCookie('itemsPerPage'));
      }
      angular.forEach($scope.columns,function(si,s){
        QueryString.debug>1 && console.debug("init","getCookie",s);
        angular.forEach($scope.columns[s],function(ci,c){
          let cookiekey = s+"."+c;
          QueryString.debug>1 && console.debug("init","getCookie",s,c,getCookie(cookiekey));
          if (getCookie(cookiekey)) {
            $scope.columns[s][c].on = (getCookie(cookiekey)==="true"); //will be converted to contactArr later on
            QueryString.debug>1 && console.debug("init","getCookie","done",$scope.columns[s][c]);
          }
        });
      });
    }
  }
  $scope.setCookie = function(key,value) {
    // use global function
    if (typeof setCookie !== 'undefined') {
      setCookie(key,value); //store it
    }
  }

  // for resetting config values via UI and to store cookies
  $scope.resetConfig = function() {
    $scope.debug && console.debug("resetConfig");
    $scope.resetConfigValues(); //hard reset from config
    // store to cookies as this was users choice
    $scope.setUpdateInterval($scope.updateInterval);
  }

  //
  // INIT
  // (+immediate auth test above)

  if (typeof QueryString !== 'undefined') {
    if (QueryString.lang) {
      if (QueryString.lang in CONFIG.languages) {
        $scope.lang = QueryString.lang;
      }
    }
    if (QueryString.debug) {
      $scope.debug = parseInt(QueryString.debug)||1;
    }
    if (QueryString.show) {
      $scope.show=QueryString.show;
    } else {
      $scope.show='select';
    }
  }//QueryString

  if ($scope.auth) {
    $scope.debug && console.debug("init auth");
    $scope.resetConfigValues();
    $scope.getCookieConfig();//get user choices
    $scope.getStudyPathFull();//initial (interval is delayed)

    // start loading data repeatedly
    //no updates! $scope.setUpdateInterval($scope.updateInterval);
  }
}]);//-rootController
