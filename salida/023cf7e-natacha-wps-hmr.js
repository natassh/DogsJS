webpackHotUpdate("natacha",{

/***/ "./src/modules/dogs/breeds/service/api.js":
/*!************************************************!*\
  !*** ./src/modules/dogs/breeds/service/api.js ***!
  \************************************************/
/*! exports provided: loadBreedsOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadBreedsOptions\", function() { return loadBreedsOptions; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _ui_optionsBreeds_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/optionsBreeds.js */ \"./src/modules/dogs/breeds/ui/optionsBreeds.js\");\n\n\n\n\nfunction loadBreedsOptions() {\n  return _loadBreedsOptions.apply(this, arguments);\n}\n\nfunction _loadBreedsOptions() {\n  _loadBreedsOptions = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n    var endPoint, responsePromise, dataResponseJsonPromise, breedsObject;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            endPoint = 'https://dog.ceo/api/breeds/list/all';\n            responsePromise = fetch(endPoint);\n            dataResponseJsonPromise = responsePromise.then(function (responseObjectData) {\n              return responseObjectData.json();\n            });\n            _context.next = 5;\n            return dataResponseJsonPromise.then(function (dataResponse) {\n              return dataResponse;\n            });\n\n          case 5:\n            breedsObject = _context.sent;\n            dataResponseJsonPromise[\"catch\"](function (error) {\n              return console.log(error);\n            });\n            Object(_ui_optionsBreeds_js__WEBPACK_IMPORTED_MODULE_2__[\"showBreedsInSelect\"])(breedsObject);\n\n          case 8:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _loadBreedsOptions.apply(this, arguments);\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/dogs/breeds/service/api.js?");

/***/ }),

/***/ "./src/modules/dogs/breeds/ui/optionsBreeds.js":
/*!*****************************************************!*\
  !*** ./src/modules/dogs/breeds/ui/optionsBreeds.js ***!
  \*****************************************************/
/*! exports provided: showBreedsInSelect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"showBreedsInSelect\", function() { return showBreedsInSelect; });\nfunction showBreedsInSelect(breedsObject) {\n  var breeds = Object.keys(breedsObject.message);\n  breeds.forEach(function (breed) {\n    var html = '';\n    html += \"\".concat(breed);\n    var option = document.createElement(\"option\");\n    option.setAttribute(\"value\", breed);\n    option.innerHTML = html;\n    document.getElementById(\"dog-selector\").appendChild(option);\n  });\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/dogs/breeds/ui/optionsBreeds.js?");

/***/ }),

/***/ "./src/modules/dogs/breeds/ui/toShowBreeds.js":
false

})