---
layout: post
title:  "The Jam Starts Tomorrow!"
date:   2014-08-03 23:30:00
categories: natureza elm
---

Okay, so, there have been developments on the build. I'm not building a release version of what I have to put up on here because it's just too slow to work with. Elm recreates the entire map structure every update, so it becomes way too slow to use in situations where the map is scaled up even to 100x100. This is obviously unacceptable for this game, so I've been searching for a workaround. What I found were <code>Ports</code>. <code>Ports</code> are how <code>Elm</code> allows easy interop with <code>Javascript</code>. This is going to allow me to introduce all the state on the JS side. I'm not super excited to use <code>Javascript</code> in this game, but I don't think there's any avoiding it. So tomorrow, it's all Javascript code and figuring out <code>Ports</code>.

I'm going to need some way for <code>Elm</code> to tell the <code>Javascript</code> its position, and a way for the <code>Javascript</code> to tell the <code>Elm</code> where clicks are happening. I think that's all the interop I'll be requiring. Release 0.0.2 will come out when I have interop between both of the languages producing events when tiles get clicked on. For good measure, I'll also ensure the the game only displays enough tiles for you to see. No moving up and down the map yet, though. 
