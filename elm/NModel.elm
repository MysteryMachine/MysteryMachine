module NModel where
import NConst (..) 
import Array (repeat, Array)

type Tile = { src : String }
type Map = Array (Array Tile)

-- Tiles
emptyTile : Tile
emptyTile = { src = sandTile }

selectionTile : Tile
selectionTile = { src = selection}

-- Maps
initialMap : Map
initialMap = repeat mapLen (repeat mapLen emptyTile)
