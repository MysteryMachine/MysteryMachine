--module Natureza0d0d2 where
import NMap as NMap
import NConst as NConst

view : Element 
view = collage NConst.size NConst.size <| NMap.drawMap NMap.tmap

main = view