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
import List (..)
import Graphics.Element (..)
import Graphics.Collage (..)

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
selectedTile : Maybe(Int, Int) -> Form
selectedTile pos = 
  case pos of
    Nothing -> toForm empty
    Just (x, y) -> drawTile x y selectionTile

layout : [Element] -> Element
layout elems = flow inward elems

  --  Viewport
view : (Int, Int) -> Maybe(Int, Int) -> Map ->  Element 
view dimensions pos map = let onMap = mapCollage dimensions
  in flow outward 
    [onMap (drawMap map),
    onMap [(selectedTile pos)]] 

  -- FPS counter
myCounter = fpsCounter 30 60

  -- Main
main : Signal Element
main = layout <~ combine [myCounter, 
  view <~ Window.dimensions
        ~ mouseAtTile
        ~ map] 

