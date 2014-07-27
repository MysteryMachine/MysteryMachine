Elm.Natureza0d0d1 = Elm.Natureza0d0d1 || {};
Elm.Natureza0d0d1.make = function (_elm) {
   "use strict";
   _elm.Natureza0d0d1 = _elm.Natureza0d0d1 || {};
   if (_elm.Natureza0d0d1.values)
   return _elm.Natureza0d0d1.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Natureza0d0d1";
   var Array = Elm.Array.make(_elm);
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Debug = Elm.Debug.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var emptyTile = {_: {}
                   ,src: "http://mysterymachine.github.io/images/blanktile0d0d1.gif"};
   var Tile = function (a) {
      return {_: {},src: a};
   };
   var imgSize = 100;
   var mapLen = 5;
   var iOffset = A2(Basics.div,
   mapLen,
   2);
   var atPos = function (_v0) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2":
            return {ctor: "_Tuple2"
                   ,_0: Basics.toFloat((_v0._0 - iOffset) * imgSize)
                   ,_1: Basics.toFloat((iOffset - _v0._1) * imgSize)};}
         _E.Case($moduleName,
         "on line 31, column 17 to 76");
      }();
   };
   var size = mapLen * imgSize;
   var tmap = A2(Array.repeat,
   mapLen,
   A2(Array.repeat,
   mapLen,
   emptyTile));
   var drawMap = function (tmap) {
      return function () {
         var drawTile = F3(function (x,
         y,
         t) {
            return Graphics.Collage.move(atPos({ctor: "_Tuple2"
                                               ,_0: x
                                               ,_1: y}))(Graphics.Collage.toForm(A3(Graphics.Element.image,
            imgSize,
            imgSize,
            t.src)));
         });
         var selectAndDrawTile = F2(function (x,
         y) {
            return A2(drawTile,
            x,
            y)(Array.getOrFail(x)(A2(Array.getOrFail,
            y,
            tmap)));
         });
         var range = Array.toList(A2(Array.initialize,
         mapLen,
         function (n) {
            return n;
         }));
         var drawRowOfTilesFromArray = function (x) {
            return A2(List.map,
            selectAndDrawTile(x),
            range);
         };
         return A2(List.foldl,
         F2(function (x,y) {
            return _L.append(x,y);
         }),
         _L.fromArray([]))(A2(List.map,
         drawRowOfTilesFromArray,
         range));
      }();
   };
   var view = A2(Graphics.Collage.collage,
   size,
   size)(drawMap(tmap));
   var main = view;
   _elm.Natureza0d0d1.values = {_op: _op
                               ,mapLen: mapLen
                               ,iOffset: iOffset
                               ,imgSize: imgSize
                               ,size: size
                               ,emptyTile: emptyTile
                               ,tmap: tmap
                               ,atPos: atPos
                               ,drawMap: drawMap
                               ,view: view
                               ,main: main
                               ,Tile: Tile};
   return _elm.Natureza0d0d1.values;
};