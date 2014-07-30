module NMap where
import Debug (log)
import Array (Array, repeat, getOrFail, initialize, toList)
import List (foldl, map, (++))
import Graphics.Collage (Form, collage, toForm, move)
import Graphics.Element (Element, image)
import NConst as NConst
import NModel as NModel

-- Model

tmap : Array (Array NModel.Tile)
tmap = repeat NConst.mapLen (repeat NConst.mapLen NModel.emptyTile)

-- View
atPos : (Int, Int) -> (Float, Float)
atPos (x, y) = (toFloat((x-NConst.iOffset)*NConst.imgSize), toFloat((NConst.iOffset- y)*NConst.imgSize))

drawMap : Array(Array NModel.Tile) -> [Form]
drawMap tmap = let 
    range = (toList (initialize NConst.mapLen (\n -> n)))
    drawTile : Int -> Int -> NModel.Tile -> Form
    drawTile x y t = move (atPos (x, y)) <| toForm <| image NConst.imgSize NConst.imgSize t.src
    
    selectAndDrawTile : Int -> Int -> Form
    selectAndDrawTile x y = drawTile x y <| getOrFail x <| getOrFail y tmap

    drawRowOfTilesFromArray : Int -> [Form]
    drawRowOfTilesFromArray x = map (selectAndDrawTile x) range
  in
   foldl (++) [] <| map drawRowOfTilesFromArray range