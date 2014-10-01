---
layout: post
title:  "A Sort Of Post-Mortem"
date:   2014-09-27 15:00:00
categories: natureza elm
---

So, I've had a long break from the Natureza project for a lot of reasons. Now, I'm here to call it dead. Sort of. I'm switching languages. Elm was exciting to me when it first came out, but I'm a lot less optimistic about it as a whole, after experiencing it first hand.

The first major issue I have with Elm is one of the major issues I have with Haskell. They're just rather unreadable. I have a knack for programming languages, and I'm often good enough to figure out what someone else's code in a new language does without having any previous background in that language. Let's be honest: I think anyone could easily do that for any well designed programming language. I don't think Haskell and Elm have been designed with readability in mind. This comes in from countless decisions this language family makes, from how function currying works to how operator precedence is all mucked up.

This diverges strongly from the sorts of functional languages that I love, where code readability is just as important. Code readability is an essential part of a programming language. People who love languages like C++ (and maybe even Haskell) will turn their nose at you, claiming some of the fancy language features trump readability. It's hard for me to fathom how these people manage to develop code in a professional environment. 

This is how rational function currying should look like

	fun(argA, argB)(argC, argD)

What's going on there is extremely unambiguous. fun takes two arguments, and returns a function that takes two arguments. With some type declarations, everything is great. And yes, I know you can get things like this by asking for tuples in Elm and Haskell in your function declaration, but the Elm standard library, by default, just curries all its arguments. This sets an expectation for future libraries, and you wind up getting a bunch of functions that are called like

	fun argA argB argC argD

And I get it. It's just easier to type this declaration, but it has extreme downsides. Firstly, this form of syntactic sugar separates the syntax from the mathematical underpinnings of functional programming. This sort of thing is fine for unary or binary operators, in psuedocode like

	argA equals argB
	isTrue var

or whatever, but horrors like

	equals argA argB

are terrible. Maybe equals returns some function that calls the other expression? Who knows? Off you go to dig into source code to figure out your bug. I think there are two kinds of programmers developing languages these days, the kind that see programming as this future universal thing that everyone will be using by just typing in valid English sentences, and the kind that enjoy theory and are excited to implement it into real life programming languages. Elm and Haskell are in sort of a nonsensical middle, where, I'd argue the average person is not smart enough to really use Haskell, but the syntax is built to imitate natural languages, where we argue things with spaces between words, not mathematical notation. Then, you also wind up getting syntactic sugar like <~, which is great, and was part of the bits of the language that I was a fan of, but run away from the simplicity of natural language that one WOULD be going for by ignoring parantheses. You don't get to program in psuedo-English, but you also miss out on mathematical rigor.

I guess, really, what I'm trying to say is that I wish Elm was closer to the Racket family. Racket can be a little time consuming to write, but it is much less ambiguous when reading.

	((fun argA argB) argC argD)

should be the Racket equivalent of our discussed function, if I remember my Racket right. It's plainly obvious that our first expression returns a function. The currying structure is beautifully highlighted. The code is much more self documenting. I don't need to waste my time with it. The abstracted parts are abstracted, and the parts that aren't are just handed to me by a very obvious paranthetical structure. It is much easier to write a parser for this code, and it is much easier to parse it in my mind.

In terms of other things that killed the project, plainly, there's the fact that Elm is clunky to use with large arrays, and I might need the speed benefit of extremely localized mutation. Elm's just not giving me what I need. At least not how I implemented my code currently. I'd have to rewrite my codebase entirely for it to possibly run fast enough and, well, I'm sick of working in Elm. I don't feel productive. Coming back to refactor code is a pain. Haskell and Elm suffer from the kind of lack of readability that makes refactoring seriously annoying.

But I said it was only a sort of post-mortem. I will be continuing this project, and in a functional language. I'm not sure if FRP will be the way I go, but I will attempt to keep the project as functional as I can. John Carmack's one of the guys who have been championing functional programming with some minor, extremely localized state changes here and there, and, well, that guy's definitely smarter than I am, so I'll be trying things his way. I want a mature game development environment. Of course, functional game programming's kind of a big baby, so, I'm going to turn to baby's first functional programming language, Scala, and its daddy, Java, with maybe jMonkey as my engine.

Scala is really fun to work with, and I can switch to a more comfortable paradigm if FP gets too painful. I'll probably be writing a lot of wrappers at first, but hopefully it'll turn out peachy. I've done some research, and it HAS been done before, so, while I doubt I'll find any help, I at least have precedence. 

If you're curious as to why I haven't posted anything in a while, well, firstly, I spent lots of time agonizing over this decision before making it, and secondly, I've been working on other stuff. I've been studying Automata Theory under Professor Jeff Ullman on Coursera. The course has been excellent, and we're about to learn about what is computable and what isn't. I highly recommend the course to anyone who's looking for some more academic programming experience. I've also been working on two time-sensitive projects, neither of which are ready to be released yet. The first one is going to be out this week, and I'll do a short write up on it when it's released to the public. The other project will be released some time in early November. 

As for when I'll pick up Natureza again, I'm not quite sure. I'm highly considering the class on Game Theory coming up on Coursera, and if I took it, it'd be sucking up time up until, like, Februrary. I'd still work on the game, though. It's just I prioritize work that comes with a deadline. I'll likely pick up development again when I finish my second project, which, depending on whether or not I start Game Theory, I'll finish earlier or later than early November.

Whatever!

