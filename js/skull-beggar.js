var app = angular.module('skullBeggar', ['ngResource']);

app.service('skullApi', function($resource, $location){
  var root = "http://localhost:3000";
  
  var setOwner = function(){
    if(this.$scope.loaded){
      this.$scope.owner = 
        this.$scope.user.channel_id === this.$scope.channel.id;
    }  
  };
  
  var setChannelDataIntoScope = function(){
    this.$scope.loaded = loaded.call(this);
    this.$scope.streamUrl = 
      "http://www.twitch.tv/" + this.$scope.channel.name;
    this.$scope.streamerName = this.$scope.channel.display_name;
    setOwner.call(this);
  };
  
  // Load the resource into the scope. If the page has
  // no channel_id search, try to redirect to the user's
  // channel. If the user has no channel, make it before
  // redirecting
  var loadUserPass = function(response){
    this.$scope.user = response;
    this.$scope.loaded = loaded.call(this);
    setOwner.call(this);
    
    if(!this.$scope.channelName){
      if(this.$scope.user.channel_id){
        loadUsersChannel.call(this);
      }
      else{
        createAndLoadUsersChannel.call(this);
      }
    }
  };
  
  var loadUserFail = function(response){
    this.Omniauth.authorize();
  };
  
  var loadChannelPass = function(response){
    this.$scope.channel = response;
    setChannelDataIntoScope.call(this);
  };
  
  var loadChannelFail = function(response){
    this.$scope.criticalError = true;
  };
  
  var createChannelPass = function(response){
    this.$scope.channel = response;
    setChannelDataIntoScope.call(this);
    $location.search("channel", response.name);
  };
  
  // If the channel_id is in the search, load it into the scope
  var loadChannelName = function(){
    var name = $location.search()["channel"];
    if(angular.isString(name)){
      this.$scope.channelName = name;
    } 
  };
  
  // If the load passes, just load resource into the scope,
  // otherwise it is a critical failure
  var loadChannel = function(){
    this.Channel.get({name: this.$scope.channelName}, 
      loadChannelPass.bind(this), 
      loadChannelFail.bind(this));
  };
  
  var loadUsersChannel = function(){
    $location.search("channel", this.$scope.user.name);
  };
  
  // If the creation works, redirect to that channel page, otherwise
  // it is a critical failure
  var createAndLoadUsersChannel = function(){
    this.Channel.create({}, createChannelPass.bind(this), loadChannelFail.bind(this));
  };
  
  // User callbacks will attempt to query the Twitch API if the user is
  // not found, and will create/redirect to the User's channel if there
  // is no channel_id in scope
  var loadUser = function(){
    this.User.get({}, loadUserPass.bind(this), loadUserFail.bind(this));
  };
  
  var loaded = function(){
    return this.$scope.user && this.$scope.channel;
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
      'get': { method: 'GET', url: root + "/channels/:name.json", withCredentials: true },
      'rest': { method: 'POST', url: root + "/channels/:id/rest.json", withCredentials: true },
      'donateBlood': { method: 'POST', url: root + "/channels/:id/donate_blood.json", withCredentials: true },
      'bet': { method: 'POST', url: root + "/channels/:id/bet.json", withCredentials: true }
    }),
    // Does all the initial backend queries
    initialize: function($scope){
      this.$scope = $scope;
      
      loadChannelName.call(this);
      if($scope.channelName){ loadChannel.call(this); }
      loadUser.call(this);
    }
  }
  
  return api;
});

app.service('skullHelpers', function(skullApi){
  var $scope;
  
  var channelExistsAndStatus = function(status){
    return $scope.loaded && 
      $scope.channel.channel_account.status === status;
  };
  
  var inactive = function(){
    return channelExistsAndStatus("inactive");
  };
  
  var betting = function(){
    return channelExistsAndStatus("betting_open");
  };
  
  var waiting = function(){
    return channelExistsAndStatus("betting_closed");
  };
  
  var placeholderText = function(){
    return betting()
      ?  "Search by name..." 
      : "Betting disabled...";
  };
  
  var cash = function(){
    return $scope.loaded && 
      $scope.channel.channel_account.balance;
  };
  
  var rootUrl = function(){
    return "localhost:4000";
  };
  
  var streamUrl = function(){
    if($scope.user){
      return "www.twitch.tv/" + $scope.user.name;
    }  
  };
  
  var initializer = {
    initialize: function(scope){
      $scope = scope;
      
      $scope.inactive = inactive;
      $scope.betting = betting
      $scope.waiting = waiting;
      
      $scope.placeholderText = placeholderText;
      $scope.cash = cash;
      
      $scope.rootUrl = "localhost:4000";
      $scope.streamUrl = "";
    }
  };
  
  return initializer;
});

app.directive('logoPanel', function(){
  return{
    restrict: 'E',
    templateUrl: 'skull-beggar/logo-panel.html'
  };
});

app.directive('activityPanel', function(){
  return{
    restrict: 'E',
    templateUrl: 'skull-beggar/activity-panel.html'
  };
});

app.directive('bettingPanel', function(){
  return{
    restrict: 'E',
    templateUrl: 'skull-beggar/betting-panel.html'
  };
});

app.directive('inactivePanel', function(){
  return{
    restrict: 'E',
    templateUrl: 'skull-beggar/inactive-panel.html'
  };
});

app.directive('waitingPanel', function(){
  return{
    restrict: 'E',
    templateUrl: 'skull-beggar/waiting-panel.html'
  };
});

app.controller('skullController', 
  function($scope, skullApi, skullHelpers){
    skullApi.initialize($scope);
    skullHelpers.initialize($scope);
});