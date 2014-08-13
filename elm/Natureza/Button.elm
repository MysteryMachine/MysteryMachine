module Natureza.Button where
import Graphics.Element as Elem
import Graphics.Element (..)
import Text (..)
import Natureza.Const (..)
import Signal (..)
import Window as Window
import Graphics.Input (..)

natBtn : Handle a -> a -> String -> Signal Element
natBtn hndl init txt = 
  let
    winX : Signal Int 
    winX = (\(n, m) -> n) <~ Window.dimensions
    ret : Int -> Color -> Element
    ret x clr = Elem.color btnBorder 
      <| container (btnWidth x) btnHeight middle
      <| Elem.color clr
      <| container (btnInnerW x) btnInnerH middle 
      <| centered
      <| color textColor <| bold
      <| toText txt
    makeBtn : Int -> Element
    makeBtn x = customButton hndl init 
      (ret x btnColor) (ret x btnHoverColor) (ret x btnDownColor)
  in makeBtn <~ winX

