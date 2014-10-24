var app = angular.module('skullBeggar', ['ngResource']);

app.service('skullApi', function($resource, $location){
  var root = "http://localhost:3000";
  
  var loadUserPass = function(response){
    this.$scope.user = response;
    if(!this.$scope.channelId){
      this.Channel.create({}, createChannelPass.bind(this), loadChannelFail.bind(this));
    }
  };
  
  var loadUserFail = function(response){
    this.Omniauth.authorize();
  };
  
  var loadChannelPass = function(response){
    this.$scope.channel = response;
  };
  
  var loadChannelFail = function(response){
    this.$scope.criticalError = true;
  };
  
  var createChannelPass = function(response){
    this.$scope.channel = response;
    $location.search("channel_id", response.id);
  };
  
  var api = {
    Omniauth: {
      authorize: function(){
        window.location.href = root + "/users/auth/twitch";
      }
    },
    User: $resource(root + "/user/:id.json", {id: '@id'}, {
      'get': { method: 'GET', withCredentials: true }
    }),
    ChannelAccount: $resource(root + "/channel_account/:id.json", {id: '@id'}, {
      'get': { method: 'GET' },
      'setInactive': { method: 'POST', url: root + "/channel_accounts/:id/set_inactive.json", withCredentials: true },
      'openBetting': { method: 'POST', url: root + "/channel_accounts/:id/open_betting.json", withCredentials: true },
      'closeBetting': { method: 'POST', url: root + "/channel_accounts/:id/close_betting.json", withCredentials: true },
      'completeBetting': { method: 'POST', url: root + "/channel_accounts/:id/complete_betting.json", withCredentials: true }
    }),
    Channel: $resource(root + "/channels/:id.json", {id: '@id'},{
      'create': { method: 'POST', url: root + "/channels.json", withCredentials: true },
      'get': { method: 'GET', withCredentials: true },
      'rest': { method: 'POST', url: root + "/channels/:id/rest.json", withCredentials: true },
      'donateBlood': { method: 'POST', url: root + "/channels/:id/donate_blood.json", withCredentials: true },
      'bet': { method: 'POST', url: root + "/channels/:id/bet.json", withCredentials: true }
    }),
    load: function($scope){
      var cid = $location.search()["channel_id"];
      if(angular.isString(cid)){
        $scope.channelId = cid;
      }
      this.$scope = $scope;
      this.User.get({}, loadUserPass.bind(this), loadUserFail.bind(this));
      if($scope.channelId){
        this.Channel.get({id: $scope.channelId}, 
          loadChannelPass.bind(this), 
          loadChannelFail.bind(this))
      }
    }
  }
  
  return api;
});

app.controller('skullController', function($scope, $location, skullApi){
  skullApi.load($scope);
});



