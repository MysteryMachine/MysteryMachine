module Natureza.Button where
import Graphics.Element as Elem
import Graphics.Element (..)
import Text (..)
import Natureza.Const (..)
import Signal (..)
import Window as Window

natBtn : String -> Signal Element
natBtn txt = 
  let 
    winX = (\(n, m) -> n) <~ Window.dimensions
    ret : Int -> Element
    ret x = Elem.color btnBorder 
      <| container (btnWidth x) btnHeight middle
      <| Elem.color btnColor
      <| container (btnInnerW x) btnInnerH middle 
      <| centered
      <| color textColor <| bold
      <| toText txt
  in ret <~ winX

