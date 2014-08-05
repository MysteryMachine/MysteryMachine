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
atCoords (x, y) = (toFloat((x-iOffset)*imgSize), toFloat((iOffset - y)*imgSize))

mapCollage (x, y) = collage (min x mapSize) (min y mapSize) 

mouseAtTile: Signal (Maybe (Int, Int))
mouseAtTile =
  let 
    mouseOnTile (x, y) = (div x imgSize, div y imgSize)
    mapPos pos = if (fst pos) > mapLen || (snd pos) > mapLen
      then Nothing
      else Just pos
  in (mapPos . mouseOnTile) <~ sampleOn (fps 15) Mouse.position  

drawTile : Int -> Int -> NModel.Tile -> Form
drawTile x y t = move (atCoords (x, y)) <| toForm <| image imgSize imgSize t.src

drawMap : NModel.Map -> [Form]
drawMap tmap = let 
    range = (toList (initialize mapLen (\n -> n)))
        
    selectAndDrawTile : Int -> Int -> Form
    selectAndDrawTile x y = drawTile x y <| getOrFail x <| getOrFail y tmap

    drawRowOfTilesFromArray : Int -> [Form]
    drawRowOfTilesFromArray x = map (selectAndDrawTile x) range
  in
   foldl (++) [] <| map drawRowOfTilesFromArray range
