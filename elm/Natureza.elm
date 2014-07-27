module Natureza0d0d1 where
import Debug (log)
import Array (Array, repeat, getOrFail, initialize, toList)
import List (foldl, map, (++))
import Graphics.Collage (Form, collage, toForm, move)
import Graphics.Element (Element, image)

-- Model

mapLen : Int
mapLen = 5
iOffset : Int
iOffset = div mapLen 2
imgSize : Int
imgSize = 100
size : Int
size = mapLen*imgSize

type Tile = {
  src : String
}

emptyTile : Tile
emptyTile = { src = "http://mysterymachine.github.io/images/blanktile0d0d1.gif" }

tmap : Array (Array Tile)
tmap = repeat mapLen (repeat mapLen emptyTile)

-- View
atPos : (Int, Int) -> (Float, Float)
atPos (x, y) = (toFloat((x-iOffset)*imgSize), toFloat((iOffset- y)*imgSize))

drawMap : Array(Array Tile) -> [Form]
drawMap tmap = let 
    range = (toList (initialize mapLen (\n -> n)))
    drawTile : Int -> Int -> Tile -> Form
    drawTile x y t = move (atPos (x, y)) <| toForm <| image imgSize imgSize t.src
    
    selectAndDrawTile : Int -> Int -> Form
    selectAndDrawTile x y = drawTile x y <| getOrFail x <| getOrFail y tmap

    drawRowOfTilesFromArray : Int -> [Form]
    drawRowOfTilesFromArray x = map (selectAndDrawTile x) range
  in
   foldl (++) [] <| map drawRowOfTilesFromArray range

view : Element 
view = collage size size <| drawMap tmap

main = view