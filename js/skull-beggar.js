var app = angular.module('skullBeggar', ['ngResource']);

app.service('skullApi', function($resource){
  var root = "http://localhost:3000";
  
  var loadUserCallbackPass = function(response){
    this.$scope.user = response;
  };
  
  var loadUserCallbackFail = function(response){
    this.Omniauth.authorize();
  }
  
  var api = {
    Omniauth: {
      authorize: function(){
        window.location.href = root + "/users/auth/twitch";
      }
    },
    User: $resource(root + "/user/:id.json", {id: '@id'}, {
      'get': { method: 'GET', withCredentials: true }
    }),
    ChannelAccount: $resource(root + "/channel_account/:id", {id: '@id'}, {
      'get': { method: 'GET' },
      'setInactive': { method: 'POST', url: root + "/channel_account/:id/set_inactive.json", withCredentials: true },
      'openBetting': { method: 'POST', url: root + "/channel_account/:id/open_betting.json", withCredentials: true },
      'closeBetting': { method: 'POST', url: root + "/channel_account/:id/close_betting.json", withCredentials: true },
      'completeBetting': { method: 'POST', url: root + "/channel_account/:id/complete_betting.json", withCredentials: true }
    }),
    Channel: $resource(root + "/channel/:id", {id: '@id'},{
      'get': { method: 'GET', withCredentials: true },
      'rest': { method: 'POST', url: root + "/channel/:id/rest.json", withCredentials: true },
      'donateBlood': { method: 'POST', url: root + "/channel/:id/donate_blood.json", withCredentials: true },
      'bet': { method: 'POST', url: root + "/channel/:id/bet.json", withCredentials: true }
    }),
    load: function($scope){
      this.$scope = $scope;
      this.User.get({}, loadUserCallbackPass.bind(this), loadUserCallbackFail.bind(this));
    }
  }
  
  return api;
});

app.controller('skullController', function($scope, skullApi){
  skullApi.load($scope);
});