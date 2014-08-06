module NMap where
import Array (Array, repeat, getOrFail, initialize, toList)
import List (foldl, map, (++))
import Graphics.Collage (Form, collage, toForm, move)
import Graphics.Element (Element, image)
import NConst (..)
import Mouse as Mouse
import Time (fps)
import Array (repeat, Array)
import Graphics.Element (..)

-- Models
  -- Typedefs
type Tile = { src : String }
type Map = Array (Array Tile)

  -- Constructors
    -- Tiles
emptyTile : Tile
emptyTile = { src = sandTile }

selectionTile : Tile
selectionTile = { src = selection }

    -- Maps
initialMap : Map
initialMap = repeat mapLen (repeat mapLen emptyTile)

-- Signals
nmap : Signal Map
nmap = constant initialMap

mouseOnTile: Signal (Maybe (Int, Int))
mouseOnTile =
  let
    dimensionToTileNumber : (Int, Int) -> (Int, Int) 
    dimensionToTileNumber (x, y) = (div x imgSize, div y imgSize)
    maybeOnMap : (Int, Int) -> Maybe (Int, Int) 
    maybeOnMap pos = if (fst pos) > viewportLen || (snd pos) > viewportH
      then Nothing
      else Just pos
  in (maybeOnMap . dimensionToTileNumber) <~ sampleOn (fps 15) Mouse.position 

-- Logic
  -- Updaters
updateMap : (Int, Int) -> Map -> Map
updateMap mouse map = map 

-- Views
  -- Rendering
drawSelectedTile : Maybe(Int, Int) -> Element
drawSelectedTile pos = 
  case pos of
    Nothing -> empty
    Just (x, y) -> mapOverlay viewportSize [(drawTileVisual x y selectionTile)]

drawTile : Int -> Int -> Tile -> Form
drawTile x y t = move (atCoords (x, y)) <| toForm <| image imgSize imgSize t.src

drawTileVisual : Int -> Int -> Tile -> Form
drawTileVisual x y t = move (atCoordsVisual (x, y)) <| toForm <| image imgSize imgSize t.src

drawMap : (Int, Int) -> Map ->  Element 
drawMap dimensions tmap = let 
    rangeX : [Int]
    rangeX = (toList (initialize viewportLen (\n -> n)))
    rangeY : [Int]
    rangeY = (toList (initialize viewportH (\n -> n)))
        
    selectAndDrawTile : Int -> Int -> Form
    selectAndDrawTile x y = drawTile x y <| getOrFail x <| getOrFail y tmap

    drawRowOfTilesFromArray : Int -> [Form]
    drawRowOfTilesFromArray x = map (selectAndDrawTile x) rangeY
  in
   mapOverlay viewportSize <| (foldl (++) [] <| map drawRowOfTilesFromArray rangeX)

  -- Helpers
mapOverlay : (Int, Int) -> ([Form] -> Element)
mapOverlay (x, y) = collage (min x <| fst viewportSize) (min y <| snd viewportSize)

atCoords : (Int, Int) -> (Float, Float)
atCoords (x, y) = ((toFloat x-iOffsetX)*imgSizeF + imgSizeHF, (iOffsetY - (toFloat y))*imgSizeF - imgSizeHF)

atCoordsVisual : (Int, Int) -> (Float, Float)
atCoordsVisual (x, y) = ((toFloat x-iOffsetX)*imgSizeF + imgSizeHF, (iOffsetY - (toFloat y))*imgSizeF - imgSizeHF)


