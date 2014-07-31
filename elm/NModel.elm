module NModel where
import NConst as NConst
import Array (repeat, Array)

type Tile = {
  src : String
}

type Map = Array (Array Tile)

type GameState = {  
  win : { x : Int, y : Int },
  map : Map
}

emptyTile : Tile
emptyTile = { src = "http://mysterymachine.github.io/images/sand0d0d2.gif" }

initialState : GameState
initialState = {
 win = { x = 800, y = 800 }, map = (repeat NConst.mapLen (repeat NConst.mapLen emptyTile)) }



