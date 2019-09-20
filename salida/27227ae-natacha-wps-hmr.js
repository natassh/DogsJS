webpackHotUpdate("natacha",{

/***/ "./src/pages/home.js":
/*!***************************!*\
  !*** ./src/pages/home.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var slim_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! slim-select */ \"./node_modules/slim-select/dist/slimselect.min.js\");\n/* harmony import */ var slim_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(slim_select__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_slim_select_dist_SlimSelect_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/slim-select/dist/SlimSelect.min.css */ \"./node_modules/slim-select/dist/SlimSelect.min.css\");\n/* harmony import */ var _node_modules_slim_select_dist_SlimSelect_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_slim_select_dist_SlimSelect_min_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _modules_dogs_photos_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/dogs/photos/index.js */ \"./src/modules/dogs/photos/index.js\");\n/* harmony import */ var _modules_dogs_breeds_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/dogs/breeds/index.js */ \"./src/modules/dogs/breeds/index.js\");\n/* harmony import */ var _modules_used_stack_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/used-stack/index.js */ \"./src/modules/used-stack/index.js\");\n/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../css/styles.css */ \"./css/styles.css\");\n/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_css_styles_css__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  Object(_modules_used_stack_index_js__WEBPACK_IMPORTED_MODULE_4__[\"stackInit\"])();\n  new slim_select__WEBPACK_IMPORTED_MODULE_0___default.a({\n    select: '#dog-selector'\n  });\n  Object(_modules_dogs_breeds_index_js__WEBPACK_IMPORTED_MODULE_3__[\"loadBreedsOptions\"])();\n});\ndocument.querySelector('#btn-submit').addEventListener(\"click\", function (e) {\n  e.preventDefault();\n  Object(_modules_dogs_photos_index_js__WEBPACK_IMPORTED_MODULE_2__[\"getPhotosDogs\"])();\n});\n\n//# sourceURL=webpack:///./src/pages/home.js?");

/***/ })

})