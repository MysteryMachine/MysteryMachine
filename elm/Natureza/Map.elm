module Natureza.Map where
import Array as Array
import Array (..)
import List (foldl, map, (++))
import Graphics.Collage (Form, collage, toForm, move)
import Natureza.Map.Helpers (..)
import Mouse as Mouse
import Time (fps)
import Graphics.Element (..)
import Natureza.Const (..)
import Graphics.Input (..)
import Signal (..)
import Natureza.Button (..)
import Debug (..)

-- Signals
createMapBtn : Input MapUpdate
createMapBtn = input NoUpdate 

mapUpdateSignal : Signal MapUpdate
mapUpdateSignal = merges [createMapBtn.signal]

mapSignal : Signal Map
mapSignal = foldp updateMap (repeat 1 Array.empty) mapUpdateSignal

mouseOnTile: Signal (Maybe (Int, Int))
mouseOnTile =
  let
    dimensionToTileNumber : (Int, Int) -> (Int, Int) 
    dimensionToTileNumber (x, y) = (div x imgSize, div y imgSize)
    maybeOnMap : (Int, Int) -> (Int, Int) -> Maybe (Int, Int) 
    maybeOnMap (x, y) (l, h) = if x > l || y > h
      then Nothing
      else Just (x, y)
  in maybeOnMap 
    <~ (dimensionToTileNumber <~ Mouse.position)
    ~ viewportDims

-- Logic
  -- Updaters
updateMap : MapUpdate -> Map -> Map
updateMap update map = 
  case update of 
    Restart newMap -> newMap
    _ -> map 

-- Views
newMapBtn : Signal Element
newMapBtn = natBtn createMapBtn.handle (Restart initialMap) "Generate a New Map!"

  -- Rendering
drawSelectedTile : Maybe(Int, Int) -> (Int, Int) -> Element
drawSelectedTile pos (x, y) = 
  let
    dimensions = viewportSize (x, y) 
    offsets = offsetCalc (x, y)
  in case pos of
    Nothing -> empty
    Just coords -> 
      mapOverlay dimensions
        [(drawTileVisual coords offsets selectionTile)]

drawTile : (Int, Int) -> (Float, Float) -> Tile -> Form
drawTile (x, y) offsets t = 
  move (atCoords (x, y) offsets) 
    <| toForm <| image imgSize imgSize t.src

drawTileVisual : (Int, Int) -> (Float, Float) -> Tile -> Form
drawTileVisual (x, y) offsets t = 
  move (atCoordsVisual (x, y) offsets) 
    <| toForm <| image imgSize imgSize t.src

drawMap : (Int, Int) -> Map ->  Element 
drawMap (x, y) tmap = let 
    rangeX : [Int]
    rangeX = (toList (initialize x (\n -> n)))
    rangeY : [Int]
    rangeY = (toList (initialize y (\n -> n)))
    dimensions = viewportSize (x, y) 
    offsets = offsetCalc (x, y)
        
    selectAndDrawTile : Int -> Int -> Form
    selectAndDrawTile i j = drawTile (i, j) offsets 
      <| getOrElse emptyTile i <| getOrElse Array.empty j tmap

    drawRowOfTilesFromArray : Int -> [Form]
    drawRowOfTilesFromArray i = map (selectAndDrawTile i) rangeY
  in
   mapOverlay dimensions 
      <| (foldl (++) [] <| map drawRowOfTilesFromArray rangeX)
  
  -- Signal Element
nMapView : Signal Element
nMapView = drawMap <~ viewportDims ~ mapSignal

selectedTile : Signal Element
selectedTile = drawSelectedTile 
  <~ mouseOnTile ~ viewportDims




