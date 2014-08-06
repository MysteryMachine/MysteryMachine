module NConst where

-- Map and screen consts
mapLen : Int
mapLen = 256

viewportLen : Int
viewportLen = 32
viewportH : Int
viewportH = 32

iOffsetX : Float
iOffsetX = toFloat viewportLen / 2
iOffsetY : Float
iOffsetY = toFloat viewportH / 2

imgSize : Int
imgSize = 16
imgSizeF : Float
imgSizeF = toFloat imgSize
imgSizeHF : Float
imgSizeHF = imgSizeF / 2

mapSize : Int
mapSize = mapLen*imgSize

viewportSize : (Int, Int)
viewportSize = (viewportLen*imgSize, viewportH*imgSize)

-- Tiles
sandTile = "http://mysterymachine.github.io/images/sand0d0d2.gif"
grassTile = "http://mysterymachine.github.io/images/grass0d0d2.gif"
groundTile = "http://mysterymachine.github.io/images/ground0d0d2.gif"
stoneTile = "http://mysterymachine.github.io/images/stone0d0d2.gif"
treeTile = "http://mysterymachine.github.io/images/tree0d0d2.gif"
selection = "http://mysterymachine.github.io/images/selection0d0d2.gif"
