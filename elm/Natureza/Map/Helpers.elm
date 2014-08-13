module Natureza.Map.Helpers where
import Graphics.Collage (..)
import Graphics.Element (..)
import Array (..)
import Window as Window
import Natureza.Const (..)
-- Models
  -- Typedefs
type Tile = { src : String }
type Map = Array (Array Tile)
data MapUpdate = Restart Map | NoUpdate | Load Int

-- Map and screen consts
mapLen = 256

calcSizeX : Int -> Int
calcSizeX x = div (x - menuWidth) imgSize

viewportDims : Signal (Int, Int)
viewportDims = 
  let
    calcSize (x, y) = (calcSizeX x, calcSizeY y)
    calcSizeY y = div y imgSize
  in
    calcSize <~ Window.dimensions 

mapSize : Int
mapSize = mapLen*imgSize

-- Tiles
sandTileImg = "http://mysterymachine.github.io/images/sand0d0d2.gif"
grassTileImg = "http://mysterymachine.github.io/images/grass0d0d2.gif"
groundTileImg = "http://mysterymachine.github.io/images/ground0d0d2.gif"
stoneTileImg = "http://mysterymachine.github.io/images/stone0d0d2.gif"
treeTileImg = "http://mysterymachine.github.io/images/tree0d0d2.gif"
selectionImg = "http://mysterymachine.github.io/images/selection0d0d2.gif"

-- Constructors
  -- Tiles
emptyTile : Tile
emptyTile = { src = stoneTileImg }

sandTile : Tile
sandTile = { src = sandTileImg }

selectionTile : Tile
selectionTile = { src = selectionImg }

  -- Maps
initialMap : Map
initialMap = repeat mapLen (repeat mapLen sandTile)

-- Functions
  -- Constant helpers
viewportSize : (Int, Int) -> (Int, Int)
viewportSize (l, h) = (l*imgSize, h*imgSize)

offsetCalc : (Int, Int) -> (Float, Float)
offsetCalc (x, y) = (toFloat x/2, toFloat y/2)

  -- Render helpers
mapOverlay : (Int, Int) -> ([Form] -> Element)
mapOverlay (l, h) = collage l h

atCoords : (Int, Int) -> (Float, Float) -> (Float, Float)
atCoords (x, y) (offX, offY) = 
  ((toFloat x - offX)*imgSizeF + imgSizeHF, 
    (offY - (toFloat y))*imgSizeF - imgSizeHF)

atCoordsVisual : (Int, Int) -> (Float, Float) -> (Float, Float)
atCoordsVisual (x, y) (offX, offY) = 
  ((toFloat x - offX)*imgSizeF + imgSizeHF, 
    (offY - (toFloat y))*imgSizeF - imgSizeHF)
