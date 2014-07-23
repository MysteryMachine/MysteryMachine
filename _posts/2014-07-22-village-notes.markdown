---
layout: post
title:  "Village Notes"
date:   2014-07-22 22:30:00
categories: introduction natureza elm
---

My two week jam will be focused on the village building elements of the game, and I've spent some of my day considering what types of features and gameplay I'd specifically enjoy supporting. I've settled on a primary form of gameplay, a government contract style of play.

The player will be allowed to partition land to either give to, sell to, or rent to in-game villagers to develop. These villagers will then develop housing, workshops, and farming based on need and skill, creating items to fulfill contracts created based on each other's needs, or contracts created by the player meant to bolster the economy. This sets up villagers as the first major thing to implement in the game, my initial goal.

Release 0.1 will have the following features:

	- A grassy landscape with Perlin noise generated trees and berry bushes
	- A villager
	- The ability to assign a plot of that landscape to a villager
	- The ability for the villager to own items
 
 The villager will behave as follows
 
	Abstractly...
	- Every tick, lower hunger by a certain value
	- At a set hunger, have villager check its posessions for items of the food type
	- If the villager owns no food type items, it will run down a decision tree of
	  food purchasing methods, of which, for now, there will only be one, the lowest
	  priority decision of foraging.
	- When foraging, the villager should prioritze its land over public land for
	  foraging. If there is no food on the villagers land, it will use public land.
	- When hunger is zero, the villager dies, leaving behind a corpse
	
	To accomplish these things...
	- A villager should be able to path to a tile
	- A villager should be able to stand on a bush and harvest it
	- A villager should have an inventory comprised of several containers,
	  of which, for this release, are pockets
	- Containers have a max space for items
	- Items take up space
	- The villager is able to eat
	
	On a more technical note...
	- There should be a map
	- I should be able to press arrow keys to navigate around this map
	- This map should update as a function of time (foldp)
	- There should be buttons that let me do stuff (just a button for assigning
	  plots of lands to villagers to start, maybe a pause button)

This could take both of my weeks, by itself! There are lots of things to do, and I'm excited to forge the path into making something cool in Elm.