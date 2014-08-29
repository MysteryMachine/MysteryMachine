module Natureza.Map.Gen where
import Array(..)
import Trampoline(..)

floodFill : Array(Array b) -> (b -> Bool) -> (b -> b) -> 
  (Int, Int) -> Array(Array b)
floodFill arr_i compare transform (xi, yi) = 
  let floodFillInner arr xs_ys = 
    case xs_ys of
      (x, y)::tl ->
        let
          row = getOrElse empty x arr
          m_item = get y row
        in case m_item of 
          Nothing -> Continue (\() -> floodFillInner arr tl)
          Just item -> 
            if compare item
            then Continue (\() -> floodFillInner arr tl)
            else
              let
                item_p = transform item
                newRow = set y item_p row
                newArr = set x newRow arr
                xs_ys_p = tl ++ 
                  [(x+1, y), (x-1, y), (x, y+1), (x, y-1)]
              in Continue (\() -> floodFillInner newArr xs_ys_p)
      [] -> Done arr
  in trampoline(floodFillInner arr_i [(xi, yi)])
  
