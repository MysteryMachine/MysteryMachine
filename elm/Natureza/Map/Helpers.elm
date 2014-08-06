module Natureza.Map.Helpers where
import Graphics.Collage (..)
import Graphics.Element (..)
import Array (..)
-- Models
  -- Typedefs
type Tile = { src : String }
type Map = Array (Array Tile)

-- Map and screen consts
mapLen : Int
mapLen = 256

viewportDims : Signal (Int, Int)
viewportDims = constant (32, 32)

imgSize : Int
imgSize = 16
imgSizeF : Float
imgSizeF = toFloat imgSize
imgSizeHF : Float
imgSizeHF = imgSizeF / 2

mapSize : Int
mapSize = mapLen*imgSize

-- Tiles
sandTile = "http://mysterymachine.github.io/images/sand0d0d2.gif"
grassTile = "http://mysterymachine.github.io/images/grass0d0d2.gif"
groundTile = "http://mysterymachine.github.io/images/ground0d0d2.gif"
stoneTile = "http://mysterymachine.github.io/images/stone0d0d2.gif"
treeTile = "http://mysterymachine.github.io/images/tree0d0d2.gif"
selection = "http://mysterymachine.github.io/images/selection0d0d2.gif"

-- Constructors
  -- Tiles
emptyTile : Tile
emptyTile = { src = sandTile }

selectionTile : Tile
selectionTile = { src = selection }

  -- Maps
initialMap : Map
initialMap = repeat mapLen (repeat mapLen emptyTile)

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
