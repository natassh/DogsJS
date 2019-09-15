/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/home.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/modules/dogs/breeds/UI/toShowBreeds.js":
/*!****************************************************!*\
  !*** ./src/modules/dogs/breeds/UI/toShowBreeds.js ***!
  \****************************************************/
/*! exports provided: showBreedsInSelect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"showBreedsInSelect\", function() { return showBreedsInSelect; });\nfunction showBreedsInSelect(breedsObject) {\n  var breeds = Object.keys(breedsObject.message);\n  breeds.forEach(function (breed) {\n    var html = '';\n    html += \"\".concat(breed);\n    var option = document.createElement(\"option\");\n    option.setAttribute(\"value\", breed);\n    option.innerHTML = html;\n    document.getElementById(\"dog-selector\").appendChild(option);\n  });\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/dogs/breeds/UI/toShowBreeds.js?");

/***/ }),

/***/ "./src/modules/dogs/breeds/index.js":
/*!******************************************!*\
  !*** ./src/modules/dogs/breeds/index.js ***!
  \******************************************/
/*! exports provided: loadBreedsOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _service_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service/api.js */ \"./src/modules/dogs/breeds/service/api.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"loadBreedsOptions\", function() { return _service_api_js__WEBPACK_IMPORTED_MODULE_0__[\"loadBreedsOptions\"]; });\n\n\n\n\n//# sourceURL=webpack:///./src/modules/dogs/breeds/index.js?");

/***/ }),

/***/ "./src/modules/dogs/breeds/service/api.js":
/*!************************************************!*\
  !*** ./src/modules/dogs/breeds/service/api.js ***!
  \************************************************/
/*! exports provided: loadBreedsOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadBreedsOptions\", function() { return loadBreedsOptions; });\n/* harmony import */ var _UI_toShowBreeds_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../UI/toShowBreeds.js */ \"./src/modules/dogs/breeds/UI/toShowBreeds.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\nfunction loadBreedsOptions() {\n  return _loadBreedsOptions.apply(this, arguments);\n}\n\nfunction _loadBreedsOptions() {\n  _loadBreedsOptions = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee() {\n    var endPoint, responsePromise, dataResponseJsonPromise, breedsObject;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            endPoint = 'https://dog.ceo/api/breeds/list/all';\n            responsePromise = fetch(endPoint);\n            dataResponseJsonPromise = responsePromise.then(function (responseObjectData) {\n              return responseObjectData.json();\n            });\n            _context.next = 5;\n            return dataResponseJsonPromise.then(function (dataResponse) {\n              return dataResponse;\n            });\n\n          case 5:\n            breedsObject = _context.sent;\n            dataResponseJsonPromise[\"catch\"](function (error) {\n              return console.log(error);\n            });\n            Object(_UI_toShowBreeds_js__WEBPACK_IMPORTED_MODULE_0__[\"showBreedsInSelect\"])(breedsObject);\n\n          case 8:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _loadBreedsOptions.apply(this, arguments);\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/dogs/breeds/service/api.js?");

/***/ }),

/***/ "./src/modules/dogs/photos/UI/toShowPhotos.js":
/*!****************************************************!*\
  !*** ./src/modules/dogs/photos/UI/toShowPhotos.js ***!
  \****************************************************/
/*! exports provided: showError, showPhotos */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"showError\", function() { return showError; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"showPhotos\", function() { return showPhotos; });\n// import Carousel from 'https://cdn.pika.dev/marvina-carousel/v1';\nfunction showError() {\n  //console.log('funcion error');\n  var alertError = document.createElement('p');\n  alertError.className = 'text-error';\n  var textAlertError = document.createTextNode('El campo no puede estar vacío');\n  alertError.appendChild(textAlertError);\n  document.querySelector('.main-content').insertBefore(alertError, document.querySelector('.list-photos'));\n  var select = document.getElementById(\"dog-selector\");\n  select.className += ' error'; // Ocultamos el mensaje despues de 2 seg\n\n  setTimeout(function () {\n    alertError.remove();\n    select.classList.remove('error');\n  }, 2000);\n}\n\nfunction showPhotos(photos) {\n  document.querySelector(\".list-photos\").innerHTML = '';\n  photos.message.forEach(function (photo) {\n    var html = '';\n    html += \"<img src=\\\"\".concat(photo, \"\\\"/>\");\n    var figure = document.createElement(\"figure\");\n    figure.className = 'mc-carousel-element';\n    figure.innerHTML = html;\n    document.querySelector(\".list-photos\").appendChild(figure);\n  }); // const carousel = new Carousel({\n  //     el: '#carousel',\n  //     minImage: 2\n  // });\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/dogs/photos/UI/toShowPhotos.js?");

/***/ }),

/***/ "./src/modules/dogs/photos/index.js":
/*!******************************************!*\
  !*** ./src/modules/dogs/photos/index.js ***!
  \******************************************/
/*! exports provided: getPhotosDogs, queryApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPhotosDogs\", function() { return getPhotosDogs; });\n/* harmony import */ var _service_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service/api.js */ \"./src/modules/dogs/photos/service/api.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"queryApi\", function() { return _service_api_js__WEBPACK_IMPORTED_MODULE_0__[\"queryApi\"]; });\n\n/* harmony import */ var _UI_toShowPhotos_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI/toShowPhotos.js */ \"./src/modules/dogs/photos/UI/toShowPhotos.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\n\nfunction getPhotosDogs() {\n  return _getPhotosDogs.apply(this, arguments);\n}\n\nfunction _getPhotosDogs() {\n  _getPhotosDogs = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee() {\n    var breedValue, dogs;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            breedValue = document.getElementById(\"dog-selector\").value;\n\n            if (!(breedValue === '')) {\n              _context.next = 5;\n              break;\n            }\n\n            Object(_UI_toShowPhotos_js__WEBPACK_IMPORTED_MODULE_1__[\"showError\"])();\n            _context.next = 9;\n            break;\n\n          case 5:\n            _context.next = 7;\n            return Object(_service_api_js__WEBPACK_IMPORTED_MODULE_0__[\"queryApi\"])();\n\n          case 7:\n            dogs = _context.sent;\n            Object(_UI_toShowPhotos_js__WEBPACK_IMPORTED_MODULE_1__[\"showPhotos\"])(dogs);\n\n          case 9:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _getPhotosDogs.apply(this, arguments);\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/dogs/photos/index.js?");

/***/ }),

/***/ "./src/modules/dogs/photos/service/api.js":
/*!************************************************!*\
  !*** ./src/modules/dogs/photos/service/api.js ***!
  \************************************************/
/*! exports provided: queryApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"queryApi\", function() { return queryApi; });\nfunction queryApi() {\n  var breedValue = document.getElementById(\"dog-selector\").value;\n  var endPoint = 'https://dog.ceo/api/breed/' + breedValue + '/images/random/25'; //console.log(endPoint);\n\n  var responsePromise = fetch(endPoint);\n  var dataResponseJsonPromise = responsePromise.then(function (responseObjectData) {\n    return responseObjectData.json();\n  });\n  var dogs = dataResponseJsonPromise.then(function (dataResponse) {\n    return dataResponse;\n  });\n  dataResponseJsonPromise[\"catch\"](function (error) {\n    return console.log(error);\n  });\n  return dogs;\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/dogs/photos/service/api.js?");

/***/ }),

/***/ "./src/pages/home.js":
/*!***************************!*\
  !*** ./src/pages/home.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_dogs_photos_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/dogs/photos/index.js */ \"./src/modules/dogs/photos/index.js\");\n/* harmony import */ var _modules_dogs_breeds_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/dogs/breeds/index.js */ \"./src/modules/dogs/breeds/index.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  new SlimSelect({\n    select: '#dog-selector'\n  });\n  Object(_modules_dogs_breeds_index_js__WEBPACK_IMPORTED_MODULE_1__[\"loadBreedsOptions\"])();\n  var xmlString = str2DOMElement('<div id=\"foo\"><a href=\"#\" id=\"aafdsasdd\">Link</a><span></span></div>'); //console.log(xmlString);\n  // document.getElementById(\"list-photos\").appendChild(xmlString);\n  // document.querySelector('#aafdsasdd').addEventListener(\"click\", (e) => {\n  //     e.preventDefault();\n  //     console.log('aa');\n  // });\n});\ndocument.querySelector('#btn-submit').addEventListener(\"click\", function (e) {\n  e.preventDefault();\n  Object(_modules_dogs_photos_index_js__WEBPACK_IMPORTED_MODULE_0__[\"getPhotosDogs\"])();\n});\n\nvar str2DOMElement = function str2DOMElement(html) {\n  var frame = document.createElement('iframe');\n  frame.style.display = 'none';\n  document.body.appendChild(frame);\n  frame.contentDocument.open();\n  frame.contentDocument.write(html);\n  frame.contentDocument.close();\n  var el = frame.contentDocument.body.firstChild;\n  document.body.removeChild(frame);\n  return el;\n};\n\n//# sourceURL=webpack:///./src/pages/home.js?");

/***/ })

/******/ });