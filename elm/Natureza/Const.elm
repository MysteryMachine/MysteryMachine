module Natureza.Const where
import Window as Window
-- Image Consts
imgSize = 16
imgSizeF : Float
imgSizeF = toFloat imgSize
imgSizeHF : Float
imgSizeHF = imgSizeF / 2

-- Menu Consts
menuWidth = 400
btnSpacing = 10
menuTopSpacerHeight = 10
extraPadding : Int -> Int
extraPadding x = imgSize-(mod (x-menuWidth) imgSize)

-- Btn Consts
btnHeight = 60
btnBorderWeight = 6
btnWidth : Int -> Int
btnWidth winX = menuWidth - 2*btnSpacing - (extraPadding winX) 
btnInnerW : Int -> Int
btnInnerW x = (btnWidth x) - btnBorderWeight
btnInnerH : Int 
btnInnerH = btnHeight - btnBorderWeight

-- Colors
lightBrown = rgb 125 106 102
darkBrown = rgb 91 57 48
darkGreen = rgb 186 198 176
lightGreen = rgb 228 226 201
yellow = rgb 248 237 205

bgColor = darkGreen
borderColor = lightBrown
btnColor = lightGreen
btnHoverColor = 
  let clr = toRgb btnColor
  in rgb (clr.red - (div clr.red 25))
    (clr.green - (div clr.green 25))
    (clr.blue - (div clr.blue 25))
btnDownColor = 
  let clr = toRgb btnColor
  in rgb (clr.red - (div clr.red 10))
    (clr.green - (div clr.green 10))
    (clr.blue - (div clr.blue 10))
btnBorder = yellow
textColor = lightBrown
