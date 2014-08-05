---
layout: post
title:  "Mistakes Were Made"
date:   2014-08-05 12:40:00
categories: natureza elm
---

So, it turns out the issues I experienced with speed were attributed to me misusing <code>Signals</code>. I had created mine in such a way that the entire map was being recreated every frame. Oops. After trying to do a bunch of hacky <code>Javascript</code>, I realized my error, and I started getting the hang of FRP. I was left with this.

<div id="natureza0d0d2" style="height: 400px;"></div>
<script src="/js/Natureza-build-0.0.2.js"></script>
<script>
	Elm.embed(Elm.Natureza0d0d2, document.getElementById('natureza0d0d2'));
</script>

Let's talk code and architecture. I've separated my application into 4 layers; Model, Signal, Logic, and View.

The Model Layer
---

	type Tile = { src : String }
	type Map = Array (Array Tile)

	emptyTile : Tile
	emptyTile = { src = sandTile }

	initialMap : Map
	initialMap = repeat mapLen (repeat mapLen emptyTile)
	
My approach to models is a two step process: firstly I define a data type for my model, for the purposes of abstraction and code cleanliness; and secondly, I define any number of constructors for this new data type. Any model you create will be turned into a past-dependent <code>Signal</code> using <code>foldp</code> to achieve a form of statefulness.

The Signal Layer
---
<code>Signals</code> are the glue between your logic and your model. A <code>Signal</code> is a way to deal with state in a functional paradigm. For example, in <code>Elm</code>, you can access the state of your <code>Mouse</code> through a <code>Signal</code>. Every time your <code>Mouse</code> moves, a sort of event is created and anything <code>Mouse</code> dependent updates. One of the ways to create such a dependency is to fold <code>Signals</code> together, which takes the new information from those <code>Signals</code> and applies a function to them. More interesting, though, is the <code>foldp</code> function. 

	foldp : (a -> b -> b) -> b -> Signal a -> Signal b
	Create a past-dependent signal. Each value given on the input 
	signal will be accumulated, producing a new output value.

	For instance, foldp (+) 0 (fps 40) is the time the 
	program has been running, updated 40 times a second.
	
<code>foldp</code> takes a function, a <code>Signal</code>, and something of an arbitrary type b. This b is something you want to update and keep track of. It could be as simple as an <code>Int</code> used for counting how many mouse clicks there have been, but, practically, it'll be the constructor for the model you built in the previous step. 

The function and the <code>Signal</code> arguments are intimately related. The function will get called with the current value of your model and the current vlaue of <code>Signal a</code> every time that <code>Signal a</code> changes. What you are saying with <code>foldp</code>, then, is; take this initial b and watch for changes to this a, then, when a changes, using my current b and this new a, update my b with this function to create a new b.

My current <code>Signals</code> are

	map : Signal Map
	map = constant initialMap
	
A Map is a 2D array of Tiles. I'm considering switching things up to maybe a 2D array of<code>Signal Tile</code>.

The Logic Layer
---
Your logical layer is the update function, <code>a -> b -> b</code> in your <code>foldp</code>. It takes a "stateful" model plus the most recent value of the <code>Signal</code> being passed in. I'm currently not using any logic.

The View Layer
---
This layer is the easiest to understand. You take the <code>Signals</code> for your models, and decide how to draw them. In my case, I use a function that takes a map, iterates through it, and draws a square with the map's appropriate image (based on the src value of the Tile it's drawing). Nothing too hard to grasp.

	-- Views
	layout : [Element] -> Element
	layout elems = flow inward elems

	  --  Viewport
	view : (Int, Int) -> (Int, Int) -> Map ->  Element 
	view dimensions position map = collage (min (fst dimensions) mapSize) (min (snd dimensions) mapSize) 
	  <| drawMap map  

	  -- FPS counter
	myCounter = fpsCounter 30 30

	  -- Main
	main : Signal Element
	main = layout <~ combine [myCounter, 
	  view <~ Window.dimensions
	        ~ Mouse.position
	        ~ map]
					
Conclusion
---
I'll be moving on to creating a more varied terrain next. I'll also probably migrate my map into a 2D array of <code>Signals</code>. It's silly to think the map needs to be remade every time *one* Tile changes. I still need to work that out in my head, though. It might not work though, because I might have to recombine all the separate <code>Signals</code> anyway.