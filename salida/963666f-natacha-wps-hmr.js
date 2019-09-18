webpackHotUpdate("natacha",{

/***/ "./src/modules/dogs/breeds/ui/optionsBreeds.js":
/*!*****************************************************!*\
  !*** ./src/modules/dogs/breeds/ui/optionsBreeds.js ***!
  \*****************************************************/
/*! exports provided: showBreedsInSelect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"showBreedsInSelect\", function() { return showBreedsInSelect; });\n/* harmony import */ var custom_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! custom-select */ \"./node_modules/custom-select/build/index.js\");\n/* harmony import */ var custom_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(custom_select__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction showBreedsInSelect(breedsObject) {\n  var breeds = Object.keys(breedsObject.message);\n  var mySelect = custom_select__WEBPACK_IMPORTED_MODULE_0___default()(document.getElementById('dog-selector'));\n  console.log(mySelect);\n  breeds.forEach(function (breed) {\n    var html = '';\n    html += \"\".concat(breed);\n    var option = document.createElement(\"option\");\n    option.setAttribute(\"value\", breed);\n    option.innerHTML = html;\n    document.getElementById(\"dog-selector\").appendChild(option);\n  });\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/dogs/breeds/ui/optionsBreeds.js?");

/***/ })

})