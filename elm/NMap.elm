module NMap where
import Array (Array, repeat, getOrFail, initialize, toList)
import List (foldl, map, (++))
import Graphics.Collage (Form, collage, toForm, move)
import Graphics.Element (Element, image)
import NConst (..)
import Mouse as Mouse
import NModel as NModel
import Time (fps)

atCoords : (Int, Int) -> (Float, Float)
atCoords (x, y) = ((toFloat x-iOffsetX)*imgSizeF + imgSizeHF, (iOffsetY - (toFloat y))*imgSizeF - imgSizeHF)

atCoordsVisual : (Int, Int) -> (Float, Float)
atCoordsVisual (x, y) = ((toFloat x-iOffsetX)*imgSizeF + imgSizeHF, (iOffsetY - (toFloat y))*imgSizeF - imgSizeHF)

mapCollage (x, y) = collage (min x <| fst viewportSize) (min y <| snd viewportSize)

mouseOnTile: Signal (Maybe (Int, Int))
mouseOnTile =
  let 
    dimensionToTileNumber (x, y) = (div x imgSize, div y imgSize)
    maybeOnMap pos = if (fst pos) > viewportLen || (snd pos) > viewportH
      then Nothing
      else Just pos
  in (maybeOnMap . dimensionToTileNumber) <~ sampleOn (fps 15) Mouse.position  

drawTile : Int -> Int -> NModel.Tile -> Form
drawTile x y t = move (atCoords (x, y)) <| toForm <| image imgSize imgSize t.src

drawTileVisual : Int -> Int -> NModel.Tile -> Form
drawTileVisual x y t = move (atCoordsVisual (x, y)) <| toForm <| image imgSize imgSize t.src

drawMap : NModel.Map -> [Form]
drawMap tmap = let 
    rangeX = (toList (initialize viewportLen (\n -> n)))
    rangeY = (toList (initialize viewportH (\n -> n)))
        
    selectAndDrawTile : Int -> Int -> Form
    selectAndDrawTile x y = drawTile x y <| getOrFail x <| getOrFail y tmap

    drawRowOfTilesFromArray : Int -> [Form]
    drawRowOfTilesFromArray x = map (selectAndDrawTile x) rangeY
  in
   foldl (++) [] <| map drawRowOfTilesFromArray rangeX
