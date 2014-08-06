module Natureza where
import Natureza.Map (..)
import Mouse as Mouse
import Keyboard as Keyboard
import Time (fps, Time)
import Window as Window
import Signal (..)
import FpsCounter (fpsCounter)
import List (..)
import Graphics.Element (..)
import Graphics.Collage (..)

layout : [Element] -> Element
layout elems = flow inward elems

myCounter : Signal Element
myCounter = fpsCounter 30 10

  -- Main
main : Signal Element
main = layout <~ combine 
  [myCounter,
  selectedTile,
  nMapView] 

