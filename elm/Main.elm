import Window

myFps = 60
scrollSecs = 0.8

-- MODEL

space = { y = 0 }

-- UPDATE
step y sp = let delta = (round ((toFloat y) / (scrollSecs * myFps))) in if sp.y >= y then sp else { sp | y <- sp.y + delta }   

-- DISPLAY

title = centered <| toText "Mystery's Elmtastic Webzone"

content = leftAligned <| toText "
  The idea is to use Elm to create a great website!
  I'm really excited to get started with it, it's such
  an exciting platform, and I hope to eventually combine
  it with some backend usefulness! 
"

render sp = let leftbar = color black (spacer 80 sp.y)  in
  flow right [leftbar, flow down [title, content]]

-- APP
main = lift render (foldp step space (sampleOn (fps myFps) Window.height))