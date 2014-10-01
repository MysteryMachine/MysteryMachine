---
layout: post
title:  "Monster of the Week"
date:   2014-10-01 01:30:00
categories: javascript monster-of-the-week
---

Today, I'm announcing the release of my new happy fun app, [Monster of the Week](/apps/monster-of-the-week.html).

Monster of the Week is a Javascript application, running off of AngularJS and Twitter Bootstrap, that lets a user generate a random X-Files episode using a context-free grammar I've defined. The application has a loop to evaluate this grammar

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

That depends on the nonterminal filter I built. The result is are randomly generated sentences that sound like mad-libs. I use simple array-like structures, plus some other simple tricks to build compound arrays, to hold the data that I use for these mad libs. Here's an example.

	investigatorAction: [
    [{t:true, v:"investigates a"},
      {t:false, v:"locationAdjective"},
      {t:false, v:"location"},
      {t:false, v:"locationTwist"}],
      
    [{t:true, v:"investigates a"},
      {t:false, v:"locationAdjective"},
      {t:false, v:"locationConspiracy"}],
      
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
	]

Keep in mind this code was built for super fast writing, but, the t variable stands for whether this particular symbol is terminal, and v is the specific symbol. The above loop randomly selects one of these fabrications for the investigatorAction rule, thus completing the mad libs. The power of this method comes from the fact that a word can call for words that themselves expand to more words.

But ignore all the fancy context-free grammar talk. This is a fancy mad-libs generator. You can, and SHOULD steal my code to generate your own context free grammars in other contexts, whatever, man, it's cool. If you're in Brooklyn, TODAY, or anytime next month, you should also go see this live at "Deceive Inveigle Obfuscate". It was set up by my crazy cool girlfriend, [KJ Martinet](http://www.kjmartinet.com), and you should also go visit her website.

Send me an email or something for the deets, if you're interested. Additionally, I'd love to recieve any art you might have made of the suggestions the generator gave you! Feel free to draw anything out, I'll be sure to toss it on this post.