module NModel where
import NConst (..) 
import Array (repeat, Array)

type Tile = { src : String }
type Map = Array (Array Tile)

emptyTile : Tile
emptyTile = { src = sandTile }

initialMap : Map
initialMap = repeat mapLen (repeat mapLen emptyTile)
