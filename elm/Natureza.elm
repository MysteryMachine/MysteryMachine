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
selectedTile : Maybe(Int, Int) -> Element
selectedTile pos = 
  case pos of
    Nothing -> empty
    Just (x, y) -> mapCollage viewportSize [(drawTileVisual x y selectionTile)]

layout : [Element] -> Element
layout elems = flow inward elems

  --  Viewport
mapView : (Int, Int) -> Map ->  Element 
mapView dimensions map = mapCollage viewportSize (drawMap map)

  -- FPS counter
myCounter = fpsCounter 30 10

  -- Main
main : Signal Element
main = layout <~ combine 
  [myCounter,
  selectedTile <~ mouseOnTile,
  mapView <~ Window.dimensions ~ map] 

