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
      [{t:true, v:"Duane Barry"}],
      [{t:true, v:"Mr. X"}],
      [{t:true, v:"Krycek"}],
      [{t:true, v:"Quequeg"}],
      [{t:true, v:"a Lone Gunmen"}]
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
      [{t:true, v:"investigates"},
        {t:false, v:"locationAdjective"},
        {t:false, v:"location"},
        {t:false, v:"locationTwist"}],
        
      [{t:true, v:"is too spooked by a"},
        {t:false, v:"spookyAdjective"}, 
        {t:false, v:"spookyNoun"},
        {t:false, v:"spookyTwist"},
        {t:false, v:"spookyAction"}],
        
      [{t:true, v:"engages in a direct fist fight with a"},
        {t:false, v:"spookyAdjective"}, 
        {t:false, v:"spookyNoun"},
        {t:false, v:"spookyTwist"},
        {t:false, v:"spookyAction"}]
      
      [{t:true, v:"must negotiate, against all odds with a"},
        {t:false, v:"spookyAdjective"}, 
        {t:false, v:"spookyNoun"},
        {t:false, v:"spookyTwist"},
        {t:false, v:"spookyAction"}],
        
      [{t:true, v:"is abducted by a"},
        {t:false, v:"spookyAdjective"}, 
        {t:false, v:"spookyNoun"},
        {t:false, v:"spookyTwist"},
        {t:false, v:"spookyAction"}],
      
      [{t:true, v:"gets trapped in a"},
        {t:false, v:"locationAdjective"},
        {t:false, v:"location"},
        {t:false, v:"locationTwist"}]
    ],
    
    investigatorActionMulder: [
      [{t:true, v:"watches porn of a"},
       {t:false, v:"spookyNoun"}],
      [{t:true, v:"has absurd theories about a"},
       {t:false, v:"spookyNoun"},
       {t:true, v:"that somehow turn out to be right"}],
      [{t:true, v:"gains new water filled furniture from"},
        {t:false, v:"mainCharacter"},
        {t:true, v:"after saving that person from a"},
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
       {t:true, v:"and nothing conclusive is really proven"}],
      [{t: true, v:"don't do shit all day"}],
      [{t: true, v:"walks into Mulders office to catch him watching porn of a"}, {t:false, v:"spookyNoun"}]
    ],
    
    investigatorActionBoth: [
      [{t:true, v:"investigate a"},
        {t:false, v:"locationAdjective"},
        {t:false, v:"location"},
        {t:false, v:"locationTwist"}],
      [{t:true, v:"keep calling each other about a"},
        {t:false, v:"spookyAdjective"}, 
        {t:false, v:"spookyNoun"},
        {t:false, v:"spookyTwist"}],
      [{t:true, v:"must postpone sexual tension, yet again, over a"},
        {t:false, v:"spookyAdjective"}, 
        {t:false, v:"spookyNoun"},
        {t:false, v:"spookyTwist"}],
      [{t: true, v:"almost age to death due to a"},
        {t:false, v:"spookyAdjective"}, 
        {t:false, v:"spookyNoun"}],
      [{t: true, v:"must recount their individual versions of their encounter with a"},
        {t:false, v:"spookyAdjective"}, 
        {t:false, v:"spookyNoun"},
        {t:true, v:"to Skinner"}],
      [{t:true, v:"are consultants on a movie featuring a"},
        {t:false, v:"spookyAdjective"}, 
        {t:false, v:"spookyNoun"}],
      [{t:true, v:"are shown to be simultaneously taking a bubble bath with"}, 
        {t:false, v:"mainCharacter"}]
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
      [{t:true, v:"literally unimaginable"}],
      [{t:true, v:"majin"}],
      [{t:true, v:"black oil infetected"}],
      [{t:true, v:"nega-director"}],
      [{t:true, v:"extra-dimensional"}],
      [{t:true, v:"alien"}],
      [{t:true, v:"frozen"}],
      [{t:true, v:"infectious"}],
      [{t:true, v:"malignant"}],
      [{t:true, v:"sinister"}],
      [{t:true, v:"radioactive"}],
      [{t:true, v:"deadly"}],
      [{t:true, v:"mundane"}],
      [{t:true, v:"insidious"}],
      [{t:true, v:"comical"}],
      [{t:true, v:"vengeful"}],
      [{t:true, v:"mysterious"}],
      [{t:true, v:"ancient"}],
      [{t:true, v:"secret"}],
      [{t:true, v:"clandestine"}],
      [{t:true, v:"shadowy"}],
      [{t:true, v:"baseball loving"}]
    ],
    
    spookyNoun: [
      [{t:true, v:"spooky alien"}],
      [{t:true, v:"werewolf"}],
      [{t:true, v:"ghost"}],
      [{t:true, v:"conspiratorial alien-human hybrid"}],
      [{t:true, v:"bee swarm"}],
      [{t:true, v:"cat"}],
      [{t:true, v:"spy"}],
      [{t:true, v:"double-agent"}],
      [{t:true, v:"gender swapping amish"}],
      [{t:true, v:"fluke man"}],
      [{t:true, v:"sentient terratoma"}],
      [{t:true, v:"sentient computer program"}],
      [{t:true, v:"mushroom"}],
      [{t:true, v:"secret organ betting gang"}],
      [{t:true, v:"fire vampire"}],
      [{t:true, v:"shadow"}],
      [{t:true, v:"nightmare beast"}],
      [{t:true, v:"golem"}],
      [{t:true, v:"time traveler"}],
      [{t:true, v:"doppleganger of"}, {t:false, v:"mainCharacter"}],
      [{t:true, v:"nightmare monster"}],
      [{t:true, v:"gross incestuous Pennsylvanian"}]
    ],
    
    spookyTwist: [
      [{t:true, v:"that used to be Skinner's ex-wife all along,"}],
      [{t:true, v:"who may or may not have caused 9-11,"}],
      [{t:true, v:"who was proven to be actually a,"}, {t:false, v:"spookyNoun"}],
      [{t:true, v:"who is covered in cigarette butts,"}],
      [{t:true, v:"who is making Scully cheat on Mulder,"}],
      [{t:true, v:"who is making Mulder cheat on Scully,"}],
      [{t:true, v:"-- Skinner's specific phobia --"}],
      [{t:true, v:"who turns out to have been fathered by Mulder",}],
      [{t:true, v:"who has an evil tattoo of"}, {t:false, v:"thing"}],
      [{t:true, v:"who is aware of all that shit Scully and Mulder have going on,"}],
      [{t:true, v:"who gets murdered later on by a"}, {t:false, v:"spookyNoun"}],
      [{t:true, v:"who is later shown to have been cloned in a lab in"}, {t:false, v:"spookyLocation"}],
      [{t:true, v:"who is actually a reincarnation of Scully's sister,"}],
      [{t:true, v:"who was secretly going through Mulders tapes and was reasonably disgusted,"}],
      [{t:true, v:"who popped some new water filled furniture,"}],
      [{t:true, v:"who was a lot more"}, {t:false, v:"spookyAdjective"}, {t:true, v:"than you first would think,"}],
      [{t:true, v:"who"},{t:false, v:"mainCharacter"},{t:true, v:"will never speak of again,"}],
      [{t:true, v:"who was actually totally normal all along,"}],
      [{t:true, v:"--who is played by Bryan Cranston--"}]
    ],
    
    spookyAction: [
      [{t:true, v:"spooks"}, {t:false, v:"mainCharacter"}],
      [{t:true, v:"pukes on"}, {t:false, v:"mainCharacter"}],
      [{t:true, v:"eats and then pukes out"}, {t:false, v:"mainCharacter"}],
      [{t:true, v:"is drowned by"}, {t:false, v:"mainCharacter"}],
      [{t:true, v:"is shot at by"}, {t:false, v:"mainCharacter"}],
      [{t:true, v:"abducts"}, {t:false, v:"mainCharacter"}],
      [{t:true, v:"hires"}, {t:false, v:"mainCharacter"}, {t:true, v:"to murder"}, {t:false, v:"mainCharacter"}],
      [{t:true, v:"puts a hit on"}, {t:false, v:"mainCharacter"}],
      [{t:true, v:"convinces"}, {t:false, v:"mainCharacter"}, {t:true, v:"to go on a boat that is obviously a trap"}],
      [{t:true, v:"teaches the meaning of fear to"}, {t:false, v:"mainCharacter"}],
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
      [{t:true, v:"dull"}],
      [{t:true, v:"frozen"}],
      [{t:true, v:"infectious"}],
      [{t:true, v:"malignant"}],
      [{t:true, v:"sinister"}],
      [{t:true, v:"radioactive"}],
      [{t:true, v:"deadly"}],
      [{t:true, v:"mundane"}],
      [{t:true, v:"insidious"}],
      [{t:true, v:"comical"}],
      [{t:true, v:"vengeful"}],
      [{t:true, v:"mysterious"}],
      [{t:true, v:"ancient"}],
      [{t:true, v:"secret"}]
    ], 
    
    location:[
      [{t:true, v:"giant beehive"}]
      [{t:true, v:"den of sin"}],
      [{t:true, v:"government building"}],
      [{t:true, v:"FBI office party"}],
      [{t:true, v:"secret agent's house"}],
      [{t:true, v:"satanic ritual abuse cult's homebase"}],
      [{t:true, v:"place strangely devoid of any sort of"}, {t:false, v:"thing"}],
      [{t:true, v:"secret location of"}, {t:false, v:"spookyNoun"}],
      [{t:true, v:"place where"}, {t:false, v:"mainCharacter"}, {t:true, v:"is being held hostage"}],
      [{t:true, v:"spaceship"}],
      [{t:true, v:"place that looks like a spaceship, but is actually the secret location for"}, {t:false, v:"conspiracy"}],
      [{t:true, v:"Bermuda triangle dream sequence"}],
      [{t:true, v:"weird Canadian location"}],
      [{t:true, v:"clone farm"}],
      [{t:true, v:"Florida (actually Vancouver)"}],
      [{t:true, v:"set of Breaking Bad"}],
      [{t:true, v:"military base"}],
      [{t:true, v:"high tech conference full of nerds"}]
      
    ], 
    
    locationAction: [
      [{t:true, v:"becomes the testing ground for"},
        {t:false, v:"conspiracy"}],
      [{t:true, v:"is an obvious cover for"},
        {t:false, v:"conspiracy"}],
      [{t:true, v:"has been engineered specifically to hide"},
        {t:false, v:"conspiracy"}],
      [{t:true, v:"is a thinly veiled Twin Peaks reference, which explains why you kinda don't get this episode"}],
      [{t:true, v:"is the place Scully discovers that her name was Bambi"}],
      [{t:true, v:"is the home base for a"}, {t:false, v:"spookyNoun"}],
      [{t:true, v:"is full of dead bodies that require slow, boring autopsies that prevent Scully from having pizza"}],
      [{t:true, v:"is full of seeds, which Mulder throws out because he knows"}, {t:false, v:"spookyNoun"}, {t:true, v:"must pick them up when dropped"}],
      [{t:true, v:"is where Mulder goes to buy sunflower seeds"}],
      [{t:true, v:"is smelly because of a"}, {t:false, v:"spookyNoun"}]
    ],
    
    locationTwist:[
      [{t:true, v:"where everyone is a"}, {t:false, v:"spookyNoun"}],
      [{t:true, v:"which is later shown to only exist in the mind of"},
        {t:false, v:"mainCharacter"}],
      [{t:true, v:"which turns out to be just an alien spaceship"}],
      [{t:true, v:"which turns out to be the testing site for a government conspiracy"}],
      [{t:true, v:"which is later razed to the ground by the government"}],
      [{t:true, v:"which is a bad cover for what is really going on,"}],
      [{t:true, v:"--except its just a random place in Vancouver--"}],
      [{t:true, v:"which turns out to be Mulder's motherland"}],
      [{t:true, v:"--the place Skinner lost his virginity in--"}],
      [{t:true, v:"where all the televisions there broadcast mind control signals"}]
    ],
    
    conspiracy: [
      [{t:true, v:"the hybridizing"},
        {t:false, v:"thing"},
        {t:true, v:"with a"},
        {t:false, v:"thing"}],
      [{t:true, v:"the undermining the proliferation of"},
        {t:false, v:"thing"}],
      [{t:true, v:"the removal of heat from the real conspiracy"}],
      [{t:true, v:"Mulder and Scully's love life"}],
      [{t:true, v:"the hiding the existence of"}, {t:false, v:"spookyNoun"}],
      [{t:true, v:"the fact that her name was Bambi"}],
      [{t:true, v:"the fact that this show is basically Duchovny and Anderson providing us with fanservice"}],
      [{t:true, v:"the fact Mulder's porn tapes are actually just tapes of the show"}],
      [{t:true, v:"the fact that Scully's bitchface was actually engineered by the government"}],
      [{t:true, v:"the fact that"}, {t:false, v:"mainCharacter"}, {t:true, v:"is actually a clone"}]
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