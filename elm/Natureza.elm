--module Natureza where
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
import Color (rgb, Color)
import Natureza.Map.Helpers (..)
import Natureza.Const (..) 
import Natureza.Button (..)

layout : Element -> [Element] -> Element
layout menu gameScreen = 
  flow right [layers gameScreen, menu]

myCounter : Signal Element
myCounter = fpsCounter 30 10

border : Signal Element
border = (color borderColor) 
  . (\(x, y) -> spacer (x - menuWidth + (extraPadding x)) y) <~ Window.dimensions

gameScreen : Signal [Element]
gameScreen = combine [border, nMapView, selectedTile, myCounter]

menu : Signal Element
menu = buildMenu <~ Window.dimensions ~ combine [newMapBtn]

buildMenu : (Int, Int) -> [Element] -> Element
buildMenu (x, y) btns =
  let
    menuX : Int
    menuX = btnWidth x
    bgX : Int
    bgX = menuWidth - extraPadding x 
    topSpacer : Element
    topSpacer = spacer menuX menuTopSpacerHeight
    btnSpacer : Element
    btnSpacer = spacer menuX btnSpacing
    spaceBtn : Element -> [Element] -> [Element]
    spaceBtn btn elems = elems ++ [btn, btnSpacer]
  in
    color bgColor
      <| container bgX y midTop
      <| flow down 
      <| foldl spaceBtn [topSpacer] btns
    

  -- Main
main : Signal Element
main = layout <~ menu ~ gameScreen
