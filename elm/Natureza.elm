module Natureza0d0d2 where
import NMap (..)
import NConst (..)
import NModel (..)
import Mouse as Mouse
import Keyboard as Keyboard
import Time (fps, Time)
import Window as Window
import Signal (..)
import FpsCounter (fpsCounter)

-- Signals

  -- State bearing Signals
map : Signal Map
map = constant initialMap
--map = foldp updateMap initialMap 

-- Updates
  -- Map
updateMap : (Int, Int) -> Map -> Map
updateMap mouse map = map

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

