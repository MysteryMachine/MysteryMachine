module Natureza.Const where
import Window as Window
imgSize : Int
imgSize = 16
imgSizeF : Float
imgSizeF = toFloat imgSize
imgSizeHF : Float
imgSizeHF = imgSizeF / 2

menuWidth : Int
menuWidth = 400

btnSpacing : Int
btnSpacing = 10

menuTopSpacerHeight : Int
menuTopSpacerHeight = 10

btnHeight : Int
btnHeight = 60

btnBorderWeight : Int
btnBorderWeight = 6

extraPadding x = imgSize-(mod (x-menuWidth) imgSize)

btnWidth : Int -> Int
btnWidth winX = menuWidth - 2*btnSpacing - (extraPadding winX) 

btnInnerW : Int -> Int
btnInnerW x = (btnWidth x) - btnBorderWeight
btnInnerH : Int 
btnInnerH = btnHeight - btnBorderWeight

lightBrown : Color
lightBrown = rgb 125 106 102

darkBrown : Color
darkBrown = rgb 91 57 48

darkGreen : Color
darkGreen = rgb 186 198 176

lightGreen : Color
lightGreen = rgb 228 226 201

yellow : Color
yellow = rgb 248 237 205

bgColor = darkGreen
borderColor = lightBrown
btnColor = lightGreen
btnBorder = yellow
textColor = lightBrown
