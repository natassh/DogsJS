webpackHotUpdate("natacha",{

/***/ "./src/pages/home.js":
/*!***************************!*\
  !*** ./src/pages/home.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_dogs_photos_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/dogs/photos/index.js */ \"./src/modules/dogs/photos/index.js\");\n/* harmony import */ var _modules_dogs_breeds_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/dogs/breeds/index.js */ \"./src/modules/dogs/breeds/index.js\");\n/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../css/styles.css */ \"./css/styles.css\");\n/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_styles_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  new SlimSelect({\n    select: '#dog-selector'\n  });\n  Object(_modules_dogs_breeds_index_js__WEBPACK_IMPORTED_MODULE_1__[\"loadBreedsOptions\"])();\n  fetch('/src/pages/content.html').then(function (response) {\n    return response.text();\n  }).then(function (text) {\n    var xmlString = str2DOMElement(text);\n    document.getElementById(\"carousel\").appendChild(xmlString);\n    document.querySelector('#aafdsasdd').addEventListener(\"click\", function (e) {\n      e.preventDefault();\n      console.log('aa');\n    });\n  });\n});\ndocument.querySelector('#btn-submit').addEventListener(\"click\", function (e) {\n  e.preventDefault();\n  Object(_modules_dogs_photos_index_js__WEBPACK_IMPORTED_MODULE_0__[\"getPhotosDogs\"])();\n});\n\nvar str2DOMElement = function str2DOMElement(html) {\n  var frame = document.createElement('iframe');\n  frame.style.display = 'none';\n  document.body.appendChild(frame);\n  frame.contentDocument.open();\n  frame.contentDocument.write(html);\n  frame.contentDocument.close();\n  var el = frame.contentDocument.body.firstChild;\n  document.body.removeChild(frame);\n  return el;\n};\n\n//# sourceURL=webpack:///./src/pages/home.js?");

/***/ })

})