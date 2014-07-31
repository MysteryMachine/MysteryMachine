--module Natureza0d0d2 where
import NMap as NMap
import NConst as NConst
import NModel as NModel
import Keyboard (keysDown, KeyCode)
import Time (fps, Time)
import Window (dimensions)
import Signal (Signal, lift, lift2, sampleOn, foldp)

view : NModel.GameState ->  Element 
view state = collage state.win.x state.win.y <| NMap.drawMap state.map

signals : Signal ((Int, Int), [KeyCode])
signals = sampleOn (fps 30) (lift2 (,) dimensions keysDown)

update : ((Int, Int), [KeyCode]) -> NModel.GameState -> NModel.GameState
update signals state = state 

state : Signal NModel.GameState
state = foldp update NModel.initialState signals

main : Signal Element
main = lift view state 
