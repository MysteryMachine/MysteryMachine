---
layout: post
title:  "Version 0.0.3"
date:   2014-08-12 20:40:00
categories: natureza elm
---

![Build 0.0.3](/images/0.0.3.png)

The game is finally in a full screen incarnation! Check out today's version [here](/builds/Natureza.0.0.3.html).

I'm going to keep the commentary on this version a little more sparse. As you can tell, lots and lots of stuff is starting to get done, and being productive is starting to feel less and less like a chore. This version features a clickable button that generates the map we made in the last version. This is going to be a good build up into 0.0.4, which will feature randomly generated features on the map. I'm still not sure how far down the map generation rabbit hole I'll be going, but some of it is going to get made next. I'm thinking I'll stick to a simple map with basic features so I can flesh out basic gameplay before doing a bunch of difficult mapgen stuff.

I'll pull out a tidbit of code now. The most important thing I learned is what I wrote here:

	data MapUpdate = Restart Map | NoUpdate | Load Int
	
	createMapBtn : Input MapUpdate
	createMapBtn = input NoUpdate 
	
	mapUpdateSignal : Signal MapUpdate
	mapUpdateSignal = merges [createMapBtn.signal]
	
	mapSignal : Signal Map
	mapSignal = foldp updateMap (repeat 1 Array.empty) mapUpdateSignal
	
	updateMap : MapUpdate -> Map -> Map
	updateMap update map = 
	  case update of 
	    Restart newMap -> newMap
	    _ -> map 
			
	newMapBtn : Signal Element
	newMapBtn = natBtn createMapBtn.handle (Restart initialMap) "Generate a New Map!"

So what's going on in this mess? I have a datatype that I've defined strictly for updating the map. I've created an input, that, when clicked, sends a Restart command to my mapSignal. You'll notice, though, that I'm not passing it the signal directly. I'm wrapping the createMapBtn signal in a <code>merges</code>. Why?

I wanted my updateMap function to handle a reset command, but I also wanted it to handle other commands. This meant I needed to connect several signals into one signal. So, how do I do it? <code>merges</code>. <code>merges</code> is important because it only takes the most recent signal in that array. This means that, as long as the reset is never triggered again, it'll never be fed into my update function again. This gives me the benefit of only resetting once.

What would happen if, instead, I used <code>combine</code>? Well, then I'd keep sending this reset back to my function, resetting the entire map on every update. I'd get the same deal if I combined the signals using some sort of <code>liftN</code> method. If you wanted to use these two methods, you'd have to somehow reset the createMapBtn signal to NoUpdate after using it once. Good luck with that. Using <code>merges</code> to only send the freshest signal works much nicer.

Most of the rest of the new code is just for laying stuff out. There's a lot of code to deal with window resizes and it works out so the game screen resizes super nicely. I looked at it on my smartphone and it scaled down quite nicely.