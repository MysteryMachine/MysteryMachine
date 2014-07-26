import Window

--- MODEL ---
type TileBase = {
  src       : String,
  x         : Int,
  y         : Int,
  onGround  : [Entity],
  items     : [Item],
  occupying : Entity,
  space     : Int
}

type EntityBase = {
  src       : String,
  x         : Int,
  y         : Int
}

data Entity

type Map = [[Tile]]