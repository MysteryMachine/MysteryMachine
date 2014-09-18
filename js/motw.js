var app = angular.module("monsterOfTheWeek", []);

app.constant("SpookyGrammar", {
  generatePhrase: function(){
    if(this.productionSet.init){
      this.productionSet.init();
    }
    
    return this.evaluate([
      {t: false, v: "subject"}
    ]); 
  },
  evaluate: function(productions){
    var evaluations = [];
    var count = 0;
    while(this.nonterminal(productions) && count < 100){
      count+=1;
      angular.forEach(productions, function(production, _){
        if(!production.t){
          var i = Math.floor(this.productionSet[production.v].length*Math.random());
          evaluations = evaluations.concat(this.productionSet[production.v][i]);
        }
        else{
          evaluations.push(production);
        }
      }, this);
      productions = evaluations;
      evaluations = [];
    }
    
    var sentence = "";
    if(count < 100){
      angular.forEach(productions, function(production, i){
        sentence = sentence + production.v
        if(i+1 < productions.length && production.v.length > 0){
          sentence = sentence + " ";
        }
        else if(production.v.length == 0){
          
        }
        else{
          sentence = sentence + ".";
        };
      })
    }
    else{
      sentence = "Scully and Mulder encoutered a bug. It was too spooky."
    }
    return sentence;
  },
  productionSet: {
    init: function(){
      this.investigatorActionMulder = this.investigatorAction.concat(this.investigatorActionMulder);
      this.investigatorActionScully = this.investigatorAction.concat(this.investigatorActionScully);
      this.thing = this.spookyNoun.concat(this.mainCharacters);
      
      this.init = false;
    },
    //[{t:true, v:""}],
    mainCharacter:[
      [{t:true, v:"Scully"}],
      [{t:true, v:"Mulder"}],
      [{t:true, v:"Skinner"}],
      [{t:true, v:"Smoking Man"}],
      [{t:true, v:"Deep-Throat"}],
      [{t:true, v:"Dwayne Barry"}],
      [{t:true, v:"Quequeg"}]
    ],
    
    subject: [
      [{t:true, v:"Mulder"}, 
        {t:false, v:"investigatorActionMulder"}],       
      [{t:true, v:"Scully"}, 
        {t:false, v:"investigatorActionScully"}],
      [{t:true, v:"Mulder and Scully"}, 
        {t:false, v:"investigatorActionBoth"}],
      [{t:true, v:"A"},
        {t:false, v:"spookyAdjective"}, 
        {t:false, v:"spookyNoun"},
        {t:false, v:"spookyAction"}],
      [{t:true, v: "A"},
        {t:false, v:"spookyAdjective"}, 
        {t:false, v:"spookyNoun"},
        {t:false, v:"spookyTwist"},
        {t:false, v:"spookyAction"}],
      [{t:true, v:"A"},
        {t:false, v:"locationAdjective"},
        {t:false, v:"location"},
        {t:false, v:"locationTwist"},
        {t:false, v:"locationAction"}]
    ],
    
    investigatorAction: [
      [{t:true, v:"investigates a"},
        {t:false, v:"locationAdjective"},
        {t:false, v:"location"},
        {t:false, v:"locationTwist"}]
    ],
    
    investigatorActionMulder: [
      [{t:true, v:"watches porn of a"},
       {t:false, v:"thing"}],
      [{t:true, v:"has absurd theories about a"},
       {t:false, v:"spookyNoun"},
       {t:true, v:"that somehow turn out to be right"}],
      [{t:true, v:"gains new water filled furniture from"},
        {t:false, v:"mainCharacter"},
        {t:true, v:"after saving them from"},
        {t:false, v:"spookyAdjective"},
        {t:false, v:"spookyNoun"}]
    ],
    
    investigatorActionScully: [
      [{t:true, v:"uses extreme bitchface to scare a"},
       {t:false, v:"spookyAdjective"},
       {t:false, v:"spookyNoun"}],
      [{t:true, v:"tragically loses another dog to a"}, 
        {t:false, v:"spookyAdjective"}, 
        {t:false, v:"spookyNoun"},
        {t:false, v:"spookyTwist"}],
      [{t:true, v:"is doubtful about absurd theories about a"},
       {t:false, v:"spookyNoun"},
       {t:true, v:"and nothing conclusive is really proven"}]
    ],
    
    investigatorActionBoth: [
      [{t:true, v:"investigate a"},
        {t:false, v:"locationAdjective"},
        {t:false, v:"location"},
        {t:false, v:"locationTwist"}],
      [{t:true, v:"keep calling each other over a"},
        {t:false, v:"spookyAdjective"}, 
        {t:false, v:"spookyNoun"},
        {t:false, v:"spookyTwist"}],
      [{t:true, v:"must postpone sexual tension, yet again, over a"},
        {t:false, v:"spookyAdjective"}, 
        {t:false, v:"spookyNoun"},
        {t:false, v:"spookyTwist"}],
      [{t: true, v:"almost age to death due to a"},
        {t:false, v:"spookyAdjective"}, 
        {t:false, v:"spookyNoun"}]
    ],
    
    spookyAdjective: [
      [{t:true, v:"spooky"}],
      [{t:true, v:"psychic"}],
      [{t:true, v:"mecha"}],
      [{t:true, v:"shadow"}],
      [{t:true, v:"vampiric"}],
      [{t:true, v:"invisible"}],
      [{t:true, v:"mind-fucking"}],
      [{t:true, v:"WASP conservative"}],
      [{t:true, v:"literally unimaginable"}]
    ],
    
    spookyNoun: [
      [{t:true, v:"alien"}],
      [{t:true, v:"werewolf"}],
      [{t:true, v:"ghost"}],
      [{t:true, v:"alien-human hybrid"}],
      [{t:true, v:"bee swarm"}],
      [{t:true, v:"cat"}],
      [{t:true, v:"child"}],
      [{t:true, v:"spy"}],
      [{t:true, v:"double-agent"}],
      [{t:true, v:"a doppleganger of"}, {t:false, v:"mainCharacter"}]
    ],
    
    spookyTwist: [
      [{t:true, v:"who used to be Skinner's ex-wife all along"}],
      [{t:true, v:"who may or may not have caused 9-11"}],
      [{t:true, v:"who was proven to be actually a"}, {t:false, v:"spookyNoun"}],
      [{t:true, v:"who is covered in cigarette butts"}],
      [{t:true, v:"who is making Scully cheat on Mulder"}],
      [{t:true, v:"who is making Mulder cheat on Scully"}],
      [{t:true, v:"-- Skinner's specific phobia --"}],
      [{t:true, v:"who turns out to have been fathered by Mulder"}],
      [{t:true, v:"who has an evil tattoo of"}, {t:false, v:"thing"}],
      [{t:true, v:"who is aware of all that shit Scully and Mulder have going on"}],
      [{t:true, v:""}]
    ],
    
    spookyAction: [
      [{t:true, v:"spooks"}, {t:false, v:"mainCharacter"}],
      [{t:true, v:"blows the mind of"}, {t:false, v:"mainCharacter"}],
      [{t:true, v:"falls in love with"}, {t:false, v:"mainCharacter"}],
      [{t:true, v:"captures"}, {t:false, v:"mainCharacter"}],
      [{t:true, v:"terrorizes the town in tandem with a"}, {t:false, v:"spookyNoun"}],
      [{t:true, v:"challenges Scully and Mulder's burning hot love"}],
      [{t:true, v:"haunts"},
        {t:false, v:"mainCharacter"},
        {t:true, v:"in"},
        {t:false, v:"location"}],
      [{t:true, v:"freezes"},
        {t:false, v:"mainCharacter"},
        {t:true, v:"using"},
        {t:false, v:"alienTech"}],
      [{t:true, v:"ages"},
        {t:false, v:"mainCharacter"},
        {t:true, v:"using"},
        {t:false, v:"alienTech"}],
      [{t:true, v:"warps"},
        {t:false, v:"mainCharacter"},
        {t:true, v:"back in time using"},
        {t:false, v:"alienTech"}]
    
    ], 
    
    locationAdjective: [
      [{t:true, v:"spooky"}],
      [{t:true, v:"foggy"}],
      [{t:true, v:"possibly actually just a normal"}],
      [{t:true, v:"obviously not your normal"}],
      [{t:true, v:"sulphur smelling"}],
      [{t:true, v:"terrifying"}],
      [{t:true, v:"dull"}]
    ], 
    
    location:[
      [{t:true, v:"giant beehive"}]
      [{t:true, v:"den of sin"}],
      [{t:true, v:"government building"}],
      [{t:true, v:"FBI office party"}],
      [{t:true, v:"agent's house"}],
      [{t:true, v:"satanic ritual abuse cult"}],
      [{t:true, v:"place strangely devoid of any sort of"}, {t:false, v:"thing"}],
    ], 
    
    locationAction: [
      [{t:true, v:"becomes the testing ground for"},
        {t:false, v:"conspiracy"}],
      [{t:true, v:"is an obvious cover for"},
        {t:false, v:"conspiracy"}],
      [{t:true, v:"has been engineered specifically to hide"},
        {t:false, v:"conspiracy"}]
    ],
    
    locationTwist:[
      [{t:true, v:"except everyone is a"}, {t:false, v:"spookyNoun"}],
      [{t:true, v:"which is later shown to only exist in the mind of"},
        {t:false, v:"mainCharacter"}],
      [{t:true, v:""}],
      [{t:true, v:""}],
      [{t:true, v:""}]
    ],
    
    conspiracy: [
      [{t:true, v:"the hybridizing"},
        {t:false, v:"thing"},
        {t:true, v:"with a"},
        {t:false, v:"thing"}],
      [{t:true, v:"the undermining the proliferation of"},
        {t:false, v:"thing"}],
      [{t:true, v:"the removal of heat from the real conspiracy"}],
      [{t:true, v:"Mulder and Scully's love life"}]
    ],
    
    alienTech: [
      [{t:true, v:"a raygun"}],
      [{t:true, v:"a remote"}],
      [{t:true, v:"a puzzlebox"}],
      [{t:true, v:"a weird charm"}],
      [{t:true, v:"a looking glass"}],
      [{t:true, v:"a computer"}]
    ]
  },
  nonterminal:function(productions){
    var terminal = true;
    angular.forEach(productions, function(production, _){
      if(!production.t){
        terminal = false;
      }
    });
    return !terminal;
  }
});

app.controller("MonsterOfTheWeekController", function($scope, SpookyGrammar){
  $scope.thisWeeksMonster = SpookyGrammar.generatePhrase();
  
  $scope.newMonster = function(){
    $scope.thisWeeksMonster = SpookyGrammar.generatePhrase();
  }
});