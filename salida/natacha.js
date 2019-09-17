/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "db438ee-" + chunkId + "-wps-hmr.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "db438ee-wps-hmr.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "59b2623364e7326624a6";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "natacha";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "db438ee-" + chunkId + "-wps-hmr.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "db438ee-wps-hmr.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "59b2623364e7326624a6";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "natacha";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: [],
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./css/styles.css":
/*!************************!*\
  !*** ./css/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--5-1!../node_modules/postcss-loader/src??postcss!./styles.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./css/styles.css\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\nif (true) {\n  if (!content.locals) {\n    module.hot.accept(\n      /*! !../node_modules/css-loader/dist/cjs.js??ref--5-1!../node_modules/postcss-loader/src??postcss!./styles.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./css/styles.css\",\n      function () {\n        var newContent = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--5-1!../node_modules/postcss-loader/src??postcss!./styles.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./css/styles.css\");\n\n        if (typeof newContent === 'string') {\n          newContent = [[module.i, newContent, '']];\n        }\n        \n        update(newContent);\n      }\n    )\n  }\n\n  module.hot.dispose(function() { \n    update();\n  });\n}\n\n//# sourceURL=webpack:///./css/styles.css?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n  try {\n    var info = gen[key](arg);\n    var value = info.value;\n  } catch (error) {\n    reject(error);\n    return;\n  }\n\n  if (info.done) {\n    resolve(value);\n  } else {\n    Promise.resolve(value).then(_next, _throw);\n  }\n}\n\nfunction _asyncToGenerator(fn) {\n  return function () {\n    var self = this,\n        args = arguments;\n    return new Promise(function (resolve, reject) {\n      var gen = fn.apply(self, args);\n\n      function _next(value) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n      }\n\n      function _throw(err) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n      }\n\n      _next(undefined);\n    });\n  };\n}\n\nmodule.exports = _asyncToGenerator;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/asyncToGenerator.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! regenerator-runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/regenerator/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/btn-submit.css":
/*!*********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/components/atoms/btn-submit.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \".form__btn-submit {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    border: none;\\n    font-family: var(--main-font);\\n    font-weight: var(--regular);\\n    text-transform: uppercase;\\n    font-size: 0.7rem;\\n    height: 1.8rem;\\n    color: var(--bg-main);\\n    background-color: var(--color-title);\\n    border: 1px solid var(--color-title);\\n    border-radius: 5px;\\n}\\n.form__btn-submit:hover {\\n    color: var(--color-title);\\n    background-color: var(--bg-main);\\n    border: 1px solid var(--color-title);\\n}\", \"\",{\"version\":3,\"sources\":[\"btn-submit.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;IACZ,6BAA6B;IAC7B,2BAA2B;IAC3B,yBAAyB;IACzB,iBAAiB;IACjB,cAAc;IACd,qBAAqB;IACrB,oCAAoC;IACpC,oCAAoC;IACpC,kBAAkB;AACtB;AACA;IACI,yBAAyB;IACzB,gCAAgC;IAChC,oCAAoC;AACxC\",\"file\":\"btn-submit.css\",\"sourcesContent\":[\".form__btn-submit {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    border: none;\\n    font-family: var(--main-font);\\n    font-weight: var(--regular);\\n    text-transform: uppercase;\\n    font-size: 0.7rem;\\n    height: 1.8rem;\\n    color: var(--bg-main);\\n    background-color: var(--color-title);\\n    border: 1px solid var(--color-title);\\n    border-radius: 5px;\\n}\\n.form__btn-submit:hover {\\n    color: var(--color-title);\\n    background-color: var(--bg-main);\\n    border: 1px solid var(--color-title);\\n}\"]}]);\n\n\n//# sourceURL=webpack:///./css/components/atoms/btn-submit.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/label-title.css":
/*!**********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/components/atoms/label-title.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \".form__label-title {\\n    color: var(--color-title);\\n    font-size: 1.3rem;\\n\\tfont-family: var(--main-font);\\n    font-weight: var(--regular);\\n    margin-right: 0.5rem;\\n}\", \"\",{\"version\":3,\"sources\":[\"label-title.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,yBAAyB;IACzB,iBAAiB;CACpB,6BAA6B;IAC1B,2BAA2B;IAC3B,oBAAoB;AACxB\",\"file\":\"label-title.css\",\"sourcesContent\":[\".form__label-title {\\n    color: var(--color-title);\\n    font-size: 1.3rem;\\n\\tfont-family: var(--main-font);\\n    font-weight: var(--regular);\\n    margin-right: 0.5rem;\\n}\"]}]);\n\n\n//# sourceURL=webpack:///./css/components/atoms/label-title.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/list-item.css":
/*!********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/components/atoms/list-item.css ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \"#list-photos li {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    list-style: none;\\n    margin: 2rem 2rem;\\n    width: 400px;\\n    height: 400px;\\n    overflow: hidden;\\n}\\n#list-photos li img {\\n    width: 100%;\\n}\\n.mc-carousel-element {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    margin: 0;\\n    max-height: 400px!important;\\n    overflow: hidden;\\n}\\n.mc-carousel-element img {\\n    width: 100%;\\n}\\n.mc .mc-arrow svg {\\n    fill: rgba(255,128,113,.6)!important;\\n}\\n.mc .mc-arrow:hover svg {\\n    fill: var(--color-second)!important;\\n}\", \"\",{\"version\":3,\"sources\":[\"list-item.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,gBAAgB;IAChB,iBAAiB;IACjB,YAAY;IACZ,aAAa;IACb,gBAAgB;AACpB;AACA;IACI,WAAW;AACf;AACA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,SAAS;IACT,2BAA2B;IAC3B,gBAAgB;AACpB;AACA;IACI,WAAW;AACf;AACA;IACI,oCAAoC;AACxC;AACA;IACI,mCAAmC;AACvC\",\"file\":\"list-item.css\",\"sourcesContent\":[\"#list-photos li {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    list-style: none;\\n    margin: 2rem 2rem;\\n    width: 400px;\\n    height: 400px;\\n    overflow: hidden;\\n}\\n#list-photos li img {\\n    width: 100%;\\n}\\n.mc-carousel-element {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    margin: 0;\\n    max-height: 400px!important;\\n    overflow: hidden;\\n}\\n.mc-carousel-element img {\\n    width: 100%;\\n}\\n.mc .mc-arrow svg {\\n    fill: rgba(255,128,113,.6)!important;\\n}\\n.mc .mc-arrow:hover svg {\\n    fill: var(--color-second)!important;\\n}\"]}]);\n\n\n//# sourceURL=webpack:///./css/components/atoms/list-item.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/logo.css":
/*!***************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/components/atoms/logo.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \"figure img {\\n    display: block;\\n    width: 100%;\\n}\", \"\",{\"version\":3,\"sources\":[\"logo.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,cAAc;IACd,WAAW;AACf\",\"file\":\"logo.css\",\"sourcesContent\":[\"figure img {\\n    display: block;\\n    width: 100%;\\n}\"]}]);\n\n\n//# sourceURL=webpack:///./css/components/atoms/logo.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/select.css":
/*!*****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/components/atoms/select.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \".form__select {\\n    width: 15.5rem;\\n    color: var(--color-text);\\n    font-family: var(--main-font);\\n    font-weight: var(--regular);\\n    letter-spacing: 0.1rem;\\n    text-transform: uppercase;\\n    font-size: 0.75rem;\\n}\\n.error {\\n    border: 1px solid var(--color-error);\\n}\\n.ss-main .ss-content .ss-list {\\n    max-height: 220px;\\n}\", \"\",{\"version\":3,\"sources\":[\"select.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,cAAc;IACd,wBAAwB;IACxB,6BAA6B;IAC7B,2BAA2B;IAC3B,sBAAsB;IACtB,yBAAyB;IACzB,kBAAkB;AACtB;AACA;IACI,oCAAoC;AACxC;AACA;IACI,iBAAiB;AACrB\",\"file\":\"select.css\",\"sourcesContent\":[\".form__select {\\n    width: 15.5rem;\\n    color: var(--color-text);\\n    font-family: var(--main-font);\\n    font-weight: var(--regular);\\n    letter-spacing: 0.1rem;\\n    text-transform: uppercase;\\n    font-size: 0.75rem;\\n}\\n.error {\\n    border: 1px solid var(--color-error);\\n}\\n.ss-main .ss-content .ss-list {\\n    max-height: 220px;\\n}\"]}]);\n\n\n//# sourceURL=webpack:///./css/components/atoms/select.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/text-error.css":
/*!*********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/components/atoms/text-error.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \".text-error {\\n    margin: 0;\\n    padding: 0;\\n    color: var(--color-error);\\n    font-size: 1.1rem;\\n\\tfont-family: var(--main-font);\\n    font-weight: var(--regular);\\n    text-align: center;\\n    position: absolute;\\n    top: 6%;\\n    left: calc( ( 100% - 283px ) / 2 );\\n}\", \"\",{\"version\":3,\"sources\":[\"text-error.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,SAAS;IACT,UAAU;IACV,yBAAyB;IACzB,iBAAiB;CACpB,6BAA6B;IAC1B,2BAA2B;IAC3B,kBAAkB;IAClB,kBAAkB;IAClB,OAAO;IACP,kCAAkC;AACtC\",\"file\":\"text-error.css\",\"sourcesContent\":[\".text-error {\\n    margin: 0;\\n    padding: 0;\\n    color: var(--color-error);\\n    font-size: 1.1rem;\\n\\tfont-family: var(--main-font);\\n    font-weight: var(--regular);\\n    text-align: center;\\n    position: absolute;\\n    top: 6%;\\n    left: calc( ( 100% - 283px ) / 2 );\\n}\"]}]);\n\n\n//# sourceURL=webpack:///./css/components/atoms/text-error.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/title-stack.css":
/*!**********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/components/atoms/title-stack.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \".stack__title-stack {\\n    margin: 0;\\n    padding: 0;\\n    color: var(--bg-main);\\n    font-size: 1rem;\\n\\tfont-family: var(--main-font);\\n    font-weight: var(--regular);\\n    letter-spacing: 0.2rem;\\n    text-transform: uppercase;\\n    background-color: var(--color-second);\\n    padding: 0.4rem;\\n    transition: all .2s ease-in-out;\\n}\\n.stack:hover h2 {\\n    background-color: var(--color-title);\\n    transform: scale(1.1);\\n}\", \"\",{\"version\":3,\"sources\":[\"title-stack.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,SAAS;IACT,UAAU;IACV,qBAAqB;IACrB,eAAe;CAClB,6BAA6B;IAC1B,2BAA2B;IAC3B,sBAAsB;IACtB,yBAAyB;IACzB,qCAAqC;IACrC,eAAe;IACf,+BAA+B;AACnC;AACA;IACI,oCAAoC;IACpC,qBAAqB;AACzB\",\"file\":\"title-stack.css\",\"sourcesContent\":[\".stack__title-stack {\\n    margin: 0;\\n    padding: 0;\\n    color: var(--bg-main);\\n    font-size: 1rem;\\n\\tfont-family: var(--main-font);\\n    font-weight: var(--regular);\\n    letter-spacing: 0.2rem;\\n    text-transform: uppercase;\\n    background-color: var(--color-second);\\n    padding: 0.4rem;\\n    transition: all .2s ease-in-out;\\n}\\n.stack:hover h2 {\\n    background-color: var(--color-title);\\n    transform: scale(1.1);\\n}\"]}]);\n\n\n//# sourceURL=webpack:///./css/components/atoms/title-stack.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/title.css":
/*!****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/components/atoms/title.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \".title {\\n    margin: 0;\\n    padding: 0;\\n    color: var(--color-title);\\n    font-size: 2.5rem;\\n\\tfont-family: var(--main-font);\\n    font-weight: var(--bold);\\n    letter-spacing: 0.2rem;\\n    text-transform: uppercase;\\n    margin-right: 0.3rem;\\n}\", \"\",{\"version\":3,\"sources\":[\"title.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,SAAS;IACT,UAAU;IACV,yBAAyB;IACzB,iBAAiB;CACpB,6BAA6B;IAC1B,wBAAwB;IACxB,sBAAsB;IACtB,yBAAyB;IACzB,oBAAoB;AACxB\",\"file\":\"title.css\",\"sourcesContent\":[\".title {\\n    margin: 0;\\n    padding: 0;\\n    color: var(--color-title);\\n    font-size: 2.5rem;\\n\\tfont-family: var(--main-font);\\n    font-weight: var(--bold);\\n    letter-spacing: 0.2rem;\\n    text-transform: uppercase;\\n    margin-right: 0.3rem;\\n}\"]}]);\n\n\n//# sourceURL=webpack:///./css/components/atoms/title.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/components/molecules/block-logo.css":
/*!*************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/components/molecules/block-logo.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \".block-logo {\\n    margin: 0;\\n    padding: 0;\\n    max-width: 6rem;\\n    max-height: 6rem;\\n    transform: rotate(20deg);\\n}\\n\", \"\",{\"version\":3,\"sources\":[\"block-logo.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,SAAS;IACT,UAAU;IACV,eAAe;IACf,gBAAgB;IAChB,wBAAwB;AAC5B\",\"file\":\"block-logo.css\",\"sourcesContent\":[\".block-logo {\\n    margin: 0;\\n    padding: 0;\\n    max-width: 6rem;\\n    max-height: 6rem;\\n    transform: rotate(20deg);\\n}\\n\"]}]);\n\n\n//# sourceURL=webpack:///./css/components/molecules/block-logo.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/components/molecules/block-stack.css":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/components/molecules/block-stack.css ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \".stack {\\n    display: inline-block;\\n    transform: rotate(38deg);\\n    position: absolute;\\n    top: 42px;\\n    right: -6px;\\n    /*\\n    top: 37px;\\n    right: -12px;\\n    */\\n}\\n\", \"\",{\"version\":3,\"sources\":[\"block-stack.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,qBAAqB;IACrB,wBAAwB;IACxB,kBAAkB;IAClB,SAAS;IACT,WAAW;IACX;;;KAGC;AACL\",\"file\":\"block-stack.css\",\"sourcesContent\":[\".stack {\\n    display: inline-block;\\n    transform: rotate(38deg);\\n    position: absolute;\\n    top: 42px;\\n    right: -6px;\\n    /*\\n    top: 37px;\\n    right: -12px;\\n    */\\n}\\n\"]}]);\n\n\n//# sourceURL=webpack:///./css/components/molecules/block-stack.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/components/molecules/form-block-content.css":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/components/molecules/form-block-content.css ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \".form__block-content {\\n    border: none;\\n    margin: 0;\\n    padding: 0;\\n    margin-right: 1.5rem;\\n}\\n\", \"\",{\"version\":3,\"sources\":[\"form-block-content.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,YAAY;IACZ,SAAS;IACT,UAAU;IACV,oBAAoB;AACxB\",\"file\":\"form-block-content.css\",\"sourcesContent\":[\".form__block-content {\\n    border: none;\\n    margin: 0;\\n    padding: 0;\\n    margin-right: 1.5rem;\\n}\\n\"]}]);\n\n\n//# sourceURL=webpack:///./css/components/molecules/form-block-content.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/components/molecules/form.css":
/*!*******************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/components/molecules/form.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \".form {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    margin: 5rem 2rem;\\n}\", \"\",{\"version\":3,\"sources\":[\"form.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,iBAAiB;AACrB\",\"file\":\"form.css\",\"sourcesContent\":[\".form {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    margin: 5rem 2rem;\\n}\"]}]);\n\n\n//# sourceURL=webpack:///./css/components/molecules/form.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/components/molecules/list.css":
/*!*******************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/components/molecules/list.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \".list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    align-items: center;\\n    margin: 0;\\n    padding: 0;\\n}\", \"\",{\"version\":3,\"sources\":[\"list.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,aAAa;IACb,eAAe;IACf,6BAA6B;IAC7B,mBAAmB;IACnB,SAAS;IACT,UAAU;AACd\",\"file\":\"list.css\",\"sourcesContent\":[\".list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    align-items: center;\\n    margin: 0;\\n    padding: 0;\\n}\"]}]);\n\n\n//# sourceURL=webpack:///./css/components/molecules/list.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/components/molecules/main-header.css":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/components/molecules/main-header.css ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \".main-header {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    margin: 5rem 2rem;\\n}\", \"\",{\"version\":3,\"sources\":[\"main-header.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,iBAAiB;AACrB\",\"file\":\"main-header.css\",\"sourcesContent\":[\".main-header {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    margin: 5rem 2rem;\\n}\"]}]);\n\n\n//# sourceURL=webpack:///./css/components/molecules/main-header.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/components/organisms/main-content.css":
/*!***************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/components/organisms/main-content.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \".main-content {\\n    position: relative;\\n    /*min-height: 100vh;*/\\n}\", \"\",{\"version\":3,\"sources\":[\"main-content.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,kBAAkB;IAClB,qBAAqB;AACzB\",\"file\":\"main-content.css\",\"sourcesContent\":[\".main-content {\\n    position: relative;\\n    /*min-height: 100vh;*/\\n}\"]}]);\n\n\n//# sourceURL=webpack:///./css/components/organisms/main-content.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/global/commons.css":
/*!********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/global/commons.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \"body {\\n    background-color: var(--bg-main);\\n}\\n.stack-on { \\n    background-color: grey;\\n    opacity: 0.5;\\n    filter: alpha(opacity=50);\\n}\\n.mc>ul {\\n    display: none!important;\\n}\\n\", \"\",{\"version\":3,\"sources\":[\"commons.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,gCAAgC;AACpC;AACA;IACI,sBAAsB;IACtB,YAAY;IACZ,yBAAyB;AAC7B;AACA;IACI,uBAAuB;AAC3B\",\"file\":\"commons.css\",\"sourcesContent\":[\"body {\\n    background-color: var(--bg-main);\\n}\\n.stack-on { \\n    background-color: grey;\\n    opacity: 0.5;\\n    filter: alpha(opacity=50);\\n}\\n.mc>ul {\\n    display: none!important;\\n}\\n\"]}]);\n\n\n//# sourceURL=webpack:///./css/global/commons.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./css/global/global-var.css":
/*!***********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./css/global/global-var.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Module\nexports.push([module.i, \":root {\\n    --bg-main: #fff4ea;\\n    --color-second: #ff8071;\\n    --color-text: #020009;\\n    --color-title: #344ba6;\\n    --color-error: #d90714;\\n    \\n\\n    --main-font: 'Montserrat', sans-serif;\\n\\n    --bold: 700;\\n    --regular: 400;\\n    --light: 300;\\n}\", \"\",{\"version\":3,\"sources\":[\"global-var.css\"],\"names\":[],\"mappings\":\"AAAA;IACI,kBAAkB;IAClB,uBAAuB;IACvB,qBAAqB;IACrB,sBAAsB;IACtB,sBAAsB;;;IAGtB,qCAAqC;;IAErC,WAAW;IACX,cAAc;IACd,YAAY;AAChB\",\"file\":\"global-var.css\",\"sourcesContent\":[\":root {\\n    --bg-main: #fff4ea;\\n    --color-second: #ff8071;\\n    --color-text: #020009;\\n    --color-title: #344ba6;\\n    --color-error: #d90714;\\n    \\n\\n    --main-font: 'Montserrat', sans-serif;\\n\\n    --bold: 700;\\n    --regular: 400;\\n    --light: 300;\\n}\"]}]);\n\n\n//# sourceURL=webpack:///./css/global/global-var.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./css/styles.css":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/postcss-loader/src??postcss!./css/styles.css ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(true);\n// Imports\nexports.push([module.i, \"@import url(https://fonts.googleapis.com/css?family=Montserrat:300,400,700&display=swap);\", \"\"]);\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./global/global-var.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/global/global-var.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./components/atoms/title.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/title.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./components/atoms/logo.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/logo.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./components/atoms/label-title.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/label-title.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./components/atoms/select.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/select.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./components/atoms/btn-submit.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/btn-submit.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./components/atoms/list-item.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/list-item.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./components/atoms/text-error.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/text-error.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./components/atoms/title-stack.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/components/atoms/title-stack.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./components/molecules/main-header.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/components/molecules/main-header.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./components/molecules/block-logo.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/components/molecules/block-logo.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./components/molecules/form.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/components/molecules/form.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./components/molecules/form-block-content.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/components/molecules/form-block-content.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./components/molecules/list.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/components/molecules/list.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./components/molecules/block-stack.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/components/molecules/block-stack.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./components/organisms/main-content.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/components/organisms/main-content.css\"), \"\");\nexports.i(__webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js??ref--5-1!./global/commons.css */ \"./node_modules/css-loader/dist/cjs.js?!./css/global/commons.css\"), \"\");\n// Module\nexports.push([module.i, \"/*@import 'components/atoms/input-list.css';*/\", \"\",{\"version\":3,\"sources\":[\"styles.css\"],\"names\":[],\"mappings\":\"AAQA,6CAA6C\",\"file\":\"styles.css\",\"sourcesContent\":[\"@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700&display=swap');\\n\\n@import 'global/global-var.css';\\n\\n@import 'components/atoms/title.css';\\n@import 'components/atoms/logo.css';\\n@import 'components/atoms/label-title.css';\\n@import 'components/atoms/select.css';\\n/*@import 'components/atoms/input-list.css';*/\\n@import 'components/atoms/btn-submit.css';\\n@import 'components/atoms/list-item.css';\\n@import 'components/atoms/text-error.css';\\n@import 'components/atoms/title-stack.css';\\n@import 'components/molecules/main-header.css';\\n@import 'components/molecules/block-logo.css';\\n@import 'components/molecules/form.css';\\n@import 'components/molecules/form-block-content.css';\\n@import 'components/molecules/list.css';\\n@import 'components/molecules/block-stack.css';\\n@import 'components/organisms/main-content.css';\\n@import 'global/commons.css';\"]}]);\n\n\n//# sourceURL=webpack:///./css/styles.css?./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/postcss-loader/src??postcss");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \"{\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      // eslint-disable-next-line prefer-destructuring\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = modules[_i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = \"(\".concat(item[2], \") and (\").concat(mediaQuery, \")\");\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot).concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/marvina-carousel/dist/js/marvina-carousel.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/marvina-carousel/dist/js/marvina-carousel.esm.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global, process) {/*!\n *   Marvina carousel\n *   version: 1.0.6\n *    author: Cevad Tokatli <cevadtokatli@hotmail.com>\n *   website: http://cevadtokatli.com\n *    github: https://github.com/cevadtokatli/marvina-carousel\n *   license: MIT\n */ \n\nvar commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};\n\nfunction commonjsRequire () {\n\tthrow new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');\n}\n\nfunction createCommonjsModule(fn, module) {\n\treturn module = { exports: {} }, fn(module, module.exports), module.exports;\n}\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) {\n  return typeof obj;\n} : function (obj) {\n  return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;\n};\n\nvar asyncToGenerator = function (fn) {\n  return function () {\n    var gen = fn.apply(this, arguments);\n    return new Promise(function (resolve, reject) {\n      function step(key, arg) {\n        try {\n          var info = gen[key](arg);\n          var value = info.value;\n        } catch (error) {\n          reject(error);\n          return;\n        }\n\n        if (info.done) {\n          resolve(value);\n        } else {\n          return Promise.resolve(value).then(function (value) {\n            step(\"next\", value);\n          }, function (err) {\n            step(\"throw\", err);\n          });\n        }\n      }\n\n      return step(\"next\");\n    });\n  };\n};\n\nvar classCallCheck = function (instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n};\n\nvar createClass = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];\n      descriptor.enumerable = descriptor.enumerable || false;\n      descriptor.configurable = true;\n      if (\"value\" in descriptor) descriptor.writable = true;\n      Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }\n\n  return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);\n    if (staticProps) defineProperties(Constructor, staticProps);\n    return Constructor;\n  };\n}();\n\nvar es6Promise = createCommonjsModule(function (module, exports) {\n  /*!\n   * @overview es6-promise - a tiny implementation of Promises/A+.\n   * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)\n   * @license   Licensed under MIT license\n   *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE\n   * @version   v4.2.5+7f2b526d\n   */\n\n  (function (global, factory) {\n    module.exports = factory();\n  })(commonjsGlobal, function () {\n\n    function objectOrFunction(x) {\n      var type = typeof x === 'undefined' ? 'undefined' : _typeof(x);\n      return x !== null && (type === 'object' || type === 'function');\n    }\n\n    function isFunction(x) {\n      return typeof x === 'function';\n    }\n\n    var _isArray = void 0;\n    if (Array.isArray) {\n      _isArray = Array.isArray;\n    } else {\n      _isArray = function _isArray(x) {\n        return Object.prototype.toString.call(x) === '[object Array]';\n      };\n    }\n\n    var isArray = _isArray;\n\n    var len = 0;\n    var vertxNext = void 0;\n    var customSchedulerFn = void 0;\n\n    var asap = function asap(callback, arg) {\n      queue[len] = callback;\n      queue[len + 1] = arg;\n      len += 2;\n      if (len === 2) {\n        // If len is 2, that means that we need to schedule an async flush.\n        // If additional callbacks are queued before the queue is flushed, they\n        // will be processed by this flush that we are scheduling.\n        if (customSchedulerFn) {\n          customSchedulerFn(flush);\n        } else {\n          scheduleFlush();\n        }\n      }\n    };\n\n    function setScheduler(scheduleFn) {\n      customSchedulerFn = scheduleFn;\n    }\n\n    function setAsap(asapFn) {\n      asap = asapFn;\n    }\n\n    var browserWindow = typeof window !== 'undefined' ? window : undefined;\n    var browserGlobal = browserWindow || {};\n    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;\n    var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';\n\n    // test for web worker but not in IE10\n    var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';\n\n    // node\n    function useNextTick() {\n      // node version 0.10.x displays a deprecation warning when nextTick is used recursively\n      // see https://github.com/cujojs/when/issues/410 for details\n      return function () {\n        return process.nextTick(flush);\n      };\n    }\n\n    // vertx\n    function useVertxTimer() {\n      if (typeof vertxNext !== 'undefined') {\n        return function () {\n          vertxNext(flush);\n        };\n      }\n\n      return useSetTimeout();\n    }\n\n    function useMutationObserver() {\n      var iterations = 0;\n      var observer = new BrowserMutationObserver(flush);\n      var node = document.createTextNode('');\n      observer.observe(node, { characterData: true });\n\n      return function () {\n        node.data = iterations = ++iterations % 2;\n      };\n    }\n\n    // web worker\n    function useMessageChannel() {\n      var channel = new MessageChannel();\n      channel.port1.onmessage = flush;\n      return function () {\n        return channel.port2.postMessage(0);\n      };\n    }\n\n    function useSetTimeout() {\n      // Store setTimeout reference so es6-promise will be unaffected by\n      // other code modifying setTimeout (like sinon.useFakeTimers())\n      var globalSetTimeout = setTimeout;\n      return function () {\n        return globalSetTimeout(flush, 1);\n      };\n    }\n\n    var queue = new Array(1000);\n    function flush() {\n      for (var i = 0; i < len; i += 2) {\n        var callback = queue[i];\n        var arg = queue[i + 1];\n\n        callback(arg);\n\n        queue[i] = undefined;\n        queue[i + 1] = undefined;\n      }\n\n      len = 0;\n    }\n\n    function attemptVertx() {\n      try {\n        var vertx = Function('return this')().require('vertx');\n        vertxNext = vertx.runOnLoop || vertx.runOnContext;\n        return useVertxTimer();\n      } catch (e) {\n        return useSetTimeout();\n      }\n    }\n\n    var scheduleFlush = void 0;\n    // Decide what async method to use to triggering processing of queued callbacks:\n    if (isNode) {\n      scheduleFlush = useNextTick();\n    } else if (BrowserMutationObserver) {\n      scheduleFlush = useMutationObserver();\n    } else if (isWorker) {\n      scheduleFlush = useMessageChannel();\n    } else if (browserWindow === undefined && typeof commonjsRequire === 'function') {\n      scheduleFlush = attemptVertx();\n    } else {\n      scheduleFlush = useSetTimeout();\n    }\n\n    function then(onFulfillment, onRejection) {\n      var parent = this;\n\n      var child = new this.constructor(noop);\n\n      if (child[PROMISE_ID] === undefined) {\n        makePromise(child);\n      }\n\n      var _state = parent._state;\n\n      if (_state) {\n        var callback = arguments[_state - 1];\n        asap(function () {\n          return invokeCallback(_state, child, callback, parent._result);\n        });\n      } else {\n        subscribe(parent, child, onFulfillment, onRejection);\n      }\n\n      return child;\n    }\n\n    /**\n      `Promise.resolve` returns a promise that will become resolved with the\n      passed `value`. It is shorthand for the following:\n    \n      ```javascript\n      let promise = new Promise(function(resolve, reject){\n        resolve(1);\n      });\n    \n      promise.then(function(value){\n        // value === 1\n      });\n      ```\n    \n      Instead of writing the above, your code now simply becomes the following:\n    \n      ```javascript\n      let promise = Promise.resolve(1);\n    \n      promise.then(function(value){\n        // value === 1\n      });\n      ```\n    \n      @method resolve\n      @static\n      @param {Any} value value that the returned promise will be resolved with\n      Useful for tooling.\n      @return {Promise} a promise that will become fulfilled with the given\n      `value`\n    */\n    function resolve$1(object) {\n      /*jshint validthis:true */\n      var Constructor = this;\n\n      if (object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Constructor) {\n        return object;\n      }\n\n      var promise = new Constructor(noop);\n      resolve(promise, object);\n      return promise;\n    }\n\n    var PROMISE_ID = Math.random().toString(36).substring(2);\n\n    function noop() {}\n\n    var PENDING = void 0;\n    var FULFILLED = 1;\n    var REJECTED = 2;\n\n    var TRY_CATCH_ERROR = { error: null };\n\n    function selfFulfillment() {\n      return new TypeError(\"You cannot resolve a promise with itself\");\n    }\n\n    function cannotReturnOwn() {\n      return new TypeError('A promises callback cannot return that same promise.');\n    }\n\n    function getThen(promise) {\n      try {\n        return promise.then;\n      } catch (error) {\n        TRY_CATCH_ERROR.error = error;\n        return TRY_CATCH_ERROR;\n      }\n    }\n\n    function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {\n      try {\n        then$$1.call(value, fulfillmentHandler, rejectionHandler);\n      } catch (e) {\n        return e;\n      }\n    }\n\n    function handleForeignThenable(promise, thenable, then$$1) {\n      asap(function (promise) {\n        var sealed = false;\n        var error = tryThen(then$$1, thenable, function (value) {\n          if (sealed) {\n            return;\n          }\n          sealed = true;\n          if (thenable !== value) {\n            resolve(promise, value);\n          } else {\n            fulfill(promise, value);\n          }\n        }, function (reason) {\n          if (sealed) {\n            return;\n          }\n          sealed = true;\n\n          reject(promise, reason);\n        }, 'Settle: ' + (promise._label || ' unknown promise'));\n\n        if (!sealed && error) {\n          sealed = true;\n          reject(promise, error);\n        }\n      }, promise);\n    }\n\n    function handleOwnThenable(promise, thenable) {\n      if (thenable._state === FULFILLED) {\n        fulfill(promise, thenable._result);\n      } else if (thenable._state === REJECTED) {\n        reject(promise, thenable._result);\n      } else {\n        subscribe(thenable, undefined, function (value) {\n          return resolve(promise, value);\n        }, function (reason) {\n          return reject(promise, reason);\n        });\n      }\n    }\n\n    function handleMaybeThenable(promise, maybeThenable, then$$1) {\n      if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {\n        handleOwnThenable(promise, maybeThenable);\n      } else {\n        if (then$$1 === TRY_CATCH_ERROR) {\n          reject(promise, TRY_CATCH_ERROR.error);\n          TRY_CATCH_ERROR.error = null;\n        } else if (then$$1 === undefined) {\n          fulfill(promise, maybeThenable);\n        } else if (isFunction(then$$1)) {\n          handleForeignThenable(promise, maybeThenable, then$$1);\n        } else {\n          fulfill(promise, maybeThenable);\n        }\n      }\n    }\n\n    function resolve(promise, value) {\n      if (promise === value) {\n        reject(promise, selfFulfillment());\n      } else if (objectOrFunction(value)) {\n        handleMaybeThenable(promise, value, getThen(value));\n      } else {\n        fulfill(promise, value);\n      }\n    }\n\n    function publishRejection(promise) {\n      if (promise._onerror) {\n        promise._onerror(promise._result);\n      }\n\n      publish(promise);\n    }\n\n    function fulfill(promise, value) {\n      if (promise._state !== PENDING) {\n        return;\n      }\n\n      promise._result = value;\n      promise._state = FULFILLED;\n\n      if (promise._subscribers.length !== 0) {\n        asap(publish, promise);\n      }\n    }\n\n    function reject(promise, reason) {\n      if (promise._state !== PENDING) {\n        return;\n      }\n      promise._state = REJECTED;\n      promise._result = reason;\n\n      asap(publishRejection, promise);\n    }\n\n    function subscribe(parent, child, onFulfillment, onRejection) {\n      var _subscribers = parent._subscribers;\n      var length = _subscribers.length;\n\n      parent._onerror = null;\n\n      _subscribers[length] = child;\n      _subscribers[length + FULFILLED] = onFulfillment;\n      _subscribers[length + REJECTED] = onRejection;\n\n      if (length === 0 && parent._state) {\n        asap(publish, parent);\n      }\n    }\n\n    function publish(promise) {\n      var subscribers = promise._subscribers;\n      var settled = promise._state;\n\n      if (subscribers.length === 0) {\n        return;\n      }\n\n      var child = void 0,\n          callback = void 0,\n          detail = promise._result;\n\n      for (var i = 0; i < subscribers.length; i += 3) {\n        child = subscribers[i];\n        callback = subscribers[i + settled];\n\n        if (child) {\n          invokeCallback(settled, child, callback, detail);\n        } else {\n          callback(detail);\n        }\n      }\n\n      promise._subscribers.length = 0;\n    }\n\n    function tryCatch(callback, detail) {\n      try {\n        return callback(detail);\n      } catch (e) {\n        TRY_CATCH_ERROR.error = e;\n        return TRY_CATCH_ERROR;\n      }\n    }\n\n    function invokeCallback(settled, promise, callback, detail) {\n      var hasCallback = isFunction(callback),\n          value = void 0,\n          error = void 0,\n          succeeded = void 0,\n          failed = void 0;\n\n      if (hasCallback) {\n        value = tryCatch(callback, detail);\n\n        if (value === TRY_CATCH_ERROR) {\n          failed = true;\n          error = value.error;\n          value.error = null;\n        } else {\n          succeeded = true;\n        }\n\n        if (promise === value) {\n          reject(promise, cannotReturnOwn());\n          return;\n        }\n      } else {\n        value = detail;\n        succeeded = true;\n      }\n\n      if (promise._state !== PENDING) ; else if (hasCallback && succeeded) {\n        resolve(promise, value);\n      } else if (failed) {\n        reject(promise, error);\n      } else if (settled === FULFILLED) {\n        fulfill(promise, value);\n      } else if (settled === REJECTED) {\n        reject(promise, value);\n      }\n    }\n\n    function initializePromise(promise, resolver) {\n      try {\n        resolver(function resolvePromise(value) {\n          resolve(promise, value);\n        }, function rejectPromise(reason) {\n          reject(promise, reason);\n        });\n      } catch (e) {\n        reject(promise, e);\n      }\n    }\n\n    var id = 0;\n    function nextId() {\n      return id++;\n    }\n\n    function makePromise(promise) {\n      promise[PROMISE_ID] = id++;\n      promise._state = undefined;\n      promise._result = undefined;\n      promise._subscribers = [];\n    }\n\n    function validationError() {\n      return new Error('Array Methods must be provided an Array');\n    }\n\n    var Enumerator = function () {\n      function Enumerator(Constructor, input) {\n        this._instanceConstructor = Constructor;\n        this.promise = new Constructor(noop);\n\n        if (!this.promise[PROMISE_ID]) {\n          makePromise(this.promise);\n        }\n\n        if (isArray(input)) {\n          this.length = input.length;\n          this._remaining = input.length;\n\n          this._result = new Array(this.length);\n\n          if (this.length === 0) {\n            fulfill(this.promise, this._result);\n          } else {\n            this.length = this.length || 0;\n            this._enumerate(input);\n            if (this._remaining === 0) {\n              fulfill(this.promise, this._result);\n            }\n          }\n        } else {\n          reject(this.promise, validationError());\n        }\n      }\n\n      Enumerator.prototype._enumerate = function _enumerate(input) {\n        for (var i = 0; this._state === PENDING && i < input.length; i++) {\n          this._eachEntry(input[i], i);\n        }\n      };\n\n      Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {\n        var c = this._instanceConstructor;\n        var resolve$$1 = c.resolve;\n\n        if (resolve$$1 === resolve$1) {\n          var _then = getThen(entry);\n\n          if (_then === then && entry._state !== PENDING) {\n            this._settledAt(entry._state, i, entry._result);\n          } else if (typeof _then !== 'function') {\n            this._remaining--;\n            this._result[i] = entry;\n          } else if (c === Promise$1) {\n            var promise = new c(noop);\n            handleMaybeThenable(promise, entry, _then);\n            this._willSettleAt(promise, i);\n          } else {\n            this._willSettleAt(new c(function (resolve$$1) {\n              return resolve$$1(entry);\n            }), i);\n          }\n        } else {\n          this._willSettleAt(resolve$$1(entry), i);\n        }\n      };\n\n      Enumerator.prototype._settledAt = function _settledAt(state, i, value) {\n        var promise = this.promise;\n\n        if (promise._state === PENDING) {\n          this._remaining--;\n\n          if (state === REJECTED) {\n            reject(promise, value);\n          } else {\n            this._result[i] = value;\n          }\n        }\n\n        if (this._remaining === 0) {\n          fulfill(promise, this._result);\n        }\n      };\n\n      Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {\n        var enumerator = this;\n\n        subscribe(promise, undefined, function (value) {\n          return enumerator._settledAt(FULFILLED, i, value);\n        }, function (reason) {\n          return enumerator._settledAt(REJECTED, i, reason);\n        });\n      };\n\n      return Enumerator;\n    }();\n\n    /**\n      `Promise.all` accepts an array of promises, and returns a new promise which\n      is fulfilled with an array of fulfillment values for the passed promises, or\n      rejected with the reason of the first passed promise to be rejected. It casts all\n      elements of the passed iterable to promises as it runs this algorithm.\n    \n      Example:\n    \n      ```javascript\n      let promise1 = resolve(1);\n      let promise2 = resolve(2);\n      let promise3 = resolve(3);\n      let promises = [ promise1, promise2, promise3 ];\n    \n      Promise.all(promises).then(function(array){\n        // The array here would be [ 1, 2, 3 ];\n      });\n      ```\n    \n      If any of the `promises` given to `all` are rejected, the first promise\n      that is rejected will be given as an argument to the returned promises's\n      rejection handler. For example:\n    \n      Example:\n    \n      ```javascript\n      let promise1 = resolve(1);\n      let promise2 = reject(new Error(\"2\"));\n      let promise3 = reject(new Error(\"3\"));\n      let promises = [ promise1, promise2, promise3 ];\n    \n      Promise.all(promises).then(function(array){\n        // Code here never runs because there are rejected promises!\n      }, function(error) {\n        // error.message === \"2\"\n      });\n      ```\n    \n      @method all\n      @static\n      @param {Array} entries array of promises\n      @param {String} label optional string for labeling the promise.\n      Useful for tooling.\n      @return {Promise} promise that is fulfilled when all `promises` have been\n      fulfilled, or rejected if any of them become rejected.\n      @static\n    */\n    function all(entries) {\n      return new Enumerator(this, entries).promise;\n    }\n\n    /**\n      `Promise.race` returns a new promise which is settled in the same way as the\n      first passed promise to settle.\n    \n      Example:\n    \n      ```javascript\n      let promise1 = new Promise(function(resolve, reject){\n        setTimeout(function(){\n          resolve('promise 1');\n        }, 200);\n      });\n    \n      let promise2 = new Promise(function(resolve, reject){\n        setTimeout(function(){\n          resolve('promise 2');\n        }, 100);\n      });\n    \n      Promise.race([promise1, promise2]).then(function(result){\n        // result === 'promise 2' because it was resolved before promise1\n        // was resolved.\n      });\n      ```\n    \n      `Promise.race` is deterministic in that only the state of the first\n      settled promise matters. For example, even if other promises given to the\n      `promises` array argument are resolved, but the first settled promise has\n      become rejected before the other promises became fulfilled, the returned\n      promise will become rejected:\n    \n      ```javascript\n      let promise1 = new Promise(function(resolve, reject){\n        setTimeout(function(){\n          resolve('promise 1');\n        }, 200);\n      });\n    \n      let promise2 = new Promise(function(resolve, reject){\n        setTimeout(function(){\n          reject(new Error('promise 2'));\n        }, 100);\n      });\n    \n      Promise.race([promise1, promise2]).then(function(result){\n        // Code here never runs\n      }, function(reason){\n        // reason.message === 'promise 2' because promise 2 became rejected before\n        // promise 1 became fulfilled\n      });\n      ```\n    \n      An example real-world use case is implementing timeouts:\n    \n      ```javascript\n      Promise.race([ajax('foo.json'), timeout(5000)])\n      ```\n    \n      @method race\n      @static\n      @param {Array} promises array of promises to observe\n      Useful for tooling.\n      @return {Promise} a promise which settles in the same way as the first passed\n      promise to settle.\n    */\n    function race(entries) {\n      /*jshint validthis:true */\n      var Constructor = this;\n\n      if (!isArray(entries)) {\n        return new Constructor(function (_, reject) {\n          return reject(new TypeError('You must pass an array to race.'));\n        });\n      } else {\n        return new Constructor(function (resolve, reject) {\n          var length = entries.length;\n          for (var i = 0; i < length; i++) {\n            Constructor.resolve(entries[i]).then(resolve, reject);\n          }\n        });\n      }\n    }\n\n    /**\n      `Promise.reject` returns a promise rejected with the passed `reason`.\n      It is shorthand for the following:\n    \n      ```javascript\n      let promise = new Promise(function(resolve, reject){\n        reject(new Error('WHOOPS'));\n      });\n    \n      promise.then(function(value){\n        // Code here doesn't run because the promise is rejected!\n      }, function(reason){\n        // reason.message === 'WHOOPS'\n      });\n      ```\n    \n      Instead of writing the above, your code now simply becomes the following:\n    \n      ```javascript\n      let promise = Promise.reject(new Error('WHOOPS'));\n    \n      promise.then(function(value){\n        // Code here doesn't run because the promise is rejected!\n      }, function(reason){\n        // reason.message === 'WHOOPS'\n      });\n      ```\n    \n      @method reject\n      @static\n      @param {Any} reason value that the returned promise will be rejected with.\n      Useful for tooling.\n      @return {Promise} a promise rejected with the given `reason`.\n    */\n    function reject$1(reason) {\n      /*jshint validthis:true */\n      var Constructor = this;\n      var promise = new Constructor(noop);\n      reject(promise, reason);\n      return promise;\n    }\n\n    function needsResolver() {\n      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');\n    }\n\n    function needsNew() {\n      throw new TypeError(\"Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.\");\n    }\n\n    /**\n      Promise objects represent the eventual result of an asynchronous operation. The\n      primary way of interacting with a promise is through its `then` method, which\n      registers callbacks to receive either a promise's eventual value or the reason\n      why the promise cannot be fulfilled.\n    \n      Terminology\n      -----------\n    \n      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.\n      - `thenable` is an object or function that defines a `then` method.\n      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).\n      - `exception` is a value that is thrown using the throw statement.\n      - `reason` is a value that indicates why a promise was rejected.\n      - `settled` the final resting state of a promise, fulfilled or rejected.\n    \n      A promise can be in one of three states: pending, fulfilled, or rejected.\n    \n      Promises that are fulfilled have a fulfillment value and are in the fulfilled\n      state.  Promises that are rejected have a rejection reason and are in the\n      rejected state.  A fulfillment value is never a thenable.\n    \n      Promises can also be said to *resolve* a value.  If this value is also a\n      promise, then the original promise's settled state will match the value's\n      settled state.  So a promise that *resolves* a promise that rejects will\n      itself reject, and a promise that *resolves* a promise that fulfills will\n      itself fulfill.\n    \n    \n      Basic Usage:\n      ------------\n    \n      ```js\n      let promise = new Promise(function(resolve, reject) {\n        // on success\n        resolve(value);\n    \n        // on failure\n        reject(reason);\n      });\n    \n      promise.then(function(value) {\n        // on fulfillment\n      }, function(reason) {\n        // on rejection\n      });\n      ```\n    \n      Advanced Usage:\n      ---------------\n    \n      Promises shine when abstracting away asynchronous interactions such as\n      `XMLHttpRequest`s.\n    \n      ```js\n      function getJSON(url) {\n        return new Promise(function(resolve, reject){\n          let xhr = new XMLHttpRequest();\n    \n          xhr.open('GET', url);\n          xhr.onreadystatechange = handler;\n          xhr.responseType = 'json';\n          xhr.setRequestHeader('Accept', 'application/json');\n          xhr.send();\n    \n          function handler() {\n            if (this.readyState === this.DONE) {\n              if (this.status === 200) {\n                resolve(this.response);\n              } else {\n                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));\n              }\n            }\n          };\n        });\n      }\n    \n      getJSON('/posts.json').then(function(json) {\n        // on fulfillment\n      }, function(reason) {\n        // on rejection\n      });\n      ```\n    \n      Unlike callbacks, promises are great composable primitives.\n    \n      ```js\n      Promise.all([\n        getJSON('/posts'),\n        getJSON('/comments')\n      ]).then(function(values){\n        values[0] // => postsJSON\n        values[1] // => commentsJSON\n    \n        return values;\n      });\n      ```\n    \n      @class Promise\n      @param {Function} resolver\n      Useful for tooling.\n      @constructor\n    */\n\n    var Promise$1 = function () {\n      function Promise(resolver) {\n        this[PROMISE_ID] = nextId();\n        this._result = this._state = undefined;\n        this._subscribers = [];\n\n        if (noop !== resolver) {\n          typeof resolver !== 'function' && needsResolver();\n          this instanceof Promise ? initializePromise(this, resolver) : needsNew();\n        }\n      }\n\n      /**\n      The primary way of interacting with a promise is through its `then` method,\n      which registers callbacks to receive either a promise's eventual value or the\n      reason why the promise cannot be fulfilled.\n       ```js\n      findUser().then(function(user){\n        // user is available\n      }, function(reason){\n        // user is unavailable, and you are given the reason why\n      });\n      ```\n       Chaining\n      --------\n       The return value of `then` is itself a promise.  This second, 'downstream'\n      promise is resolved with the return value of the first promise's fulfillment\n      or rejection handler, or rejected if the handler throws an exception.\n       ```js\n      findUser().then(function (user) {\n        return user.name;\n      }, function (reason) {\n        return 'default name';\n      }).then(function (userName) {\n        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it\n        // will be `'default name'`\n      });\n       findUser().then(function (user) {\n        throw new Error('Found user, but still unhappy');\n      }, function (reason) {\n        throw new Error('`findUser` rejected and we're unhappy');\n      }).then(function (value) {\n        // never reached\n      }, function (reason) {\n        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.\n        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.\n      });\n      ```\n      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.\n       ```js\n      findUser().then(function (user) {\n        throw new PedagogicalException('Upstream error');\n      }).then(function (value) {\n        // never reached\n      }).then(function (value) {\n        // never reached\n      }, function (reason) {\n        // The `PedgagocialException` is propagated all the way down to here\n      });\n      ```\n       Assimilation\n      ------------\n       Sometimes the value you want to propagate to a downstream promise can only be\n      retrieved asynchronously. This can be achieved by returning a promise in the\n      fulfillment or rejection handler. The downstream promise will then be pending\n      until the returned promise is settled. This is called *assimilation*.\n       ```js\n      findUser().then(function (user) {\n        return findCommentsByAuthor(user);\n      }).then(function (comments) {\n        // The user's comments are now available\n      });\n      ```\n       If the assimliated promise rejects, then the downstream promise will also reject.\n       ```js\n      findUser().then(function (user) {\n        return findCommentsByAuthor(user);\n      }).then(function (comments) {\n        // If `findCommentsByAuthor` fulfills, we'll have the value here\n      }, function (reason) {\n        // If `findCommentsByAuthor` rejects, we'll have the reason here\n      });\n      ```\n       Simple Example\n      --------------\n       Synchronous Example\n       ```javascript\n      let result;\n       try {\n        result = findResult();\n        // success\n      } catch(reason) {\n        // failure\n      }\n      ```\n       Errback Example\n       ```js\n      findResult(function(result, err){\n        if (err) {\n          // failure\n        } else {\n          // success\n        }\n      });\n      ```\n       Promise Example;\n       ```javascript\n      findResult().then(function(result){\n        // success\n      }, function(reason){\n        // failure\n      });\n      ```\n       Advanced Example\n      --------------\n       Synchronous Example\n       ```javascript\n      let author, books;\n       try {\n        author = findAuthor();\n        books  = findBooksByAuthor(author);\n        // success\n      } catch(reason) {\n        // failure\n      }\n      ```\n       Errback Example\n       ```js\n       function foundBooks(books) {\n       }\n       function failure(reason) {\n       }\n       findAuthor(function(author, err){\n        if (err) {\n          failure(err);\n          // failure\n        } else {\n          try {\n            findBoooksByAuthor(author, function(books, err) {\n              if (err) {\n                failure(err);\n              } else {\n                try {\n                  foundBooks(books);\n                } catch(reason) {\n                  failure(reason);\n                }\n              }\n            });\n          } catch(error) {\n            failure(err);\n          }\n          // success\n        }\n      });\n      ```\n       Promise Example;\n       ```javascript\n      findAuthor().\n        then(findBooksByAuthor).\n        then(function(books){\n          // found books\n      }).catch(function(reason){\n        // something went wrong\n      });\n      ```\n       @method then\n      @param {Function} onFulfilled\n      @param {Function} onRejected\n      Useful for tooling.\n      @return {Promise}\n      */\n\n      /**\n      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same\n      as the catch block of a try/catch statement.\n      ```js\n      function findAuthor(){\n      throw new Error('couldn't find that author');\n      }\n      // synchronous\n      try {\n      findAuthor();\n      } catch(reason) {\n      // something went wrong\n      }\n      // async with promises\n      findAuthor().catch(function(reason){\n      // something went wrong\n      });\n      ```\n      @method catch\n      @param {Function} onRejection\n      Useful for tooling.\n      @return {Promise}\n      */\n\n      Promise.prototype.catch = function _catch(onRejection) {\n        return this.then(null, onRejection);\n      };\n\n      /**\n        `finally` will be invoked regardless of the promise's fate just as native\n        try/catch/finally behaves\n      \n        Synchronous example:\n      \n        ```js\n        findAuthor() {\n          if (Math.random() > 0.5) {\n            throw new Error();\n          }\n          return new Author();\n        }\n      \n        try {\n          return findAuthor(); // succeed or fail\n        } catch(error) {\n          return findOtherAuther();\n        } finally {\n          // always runs\n          // doesn't affect the return value\n        }\n        ```\n      \n        Asynchronous example:\n      \n        ```js\n        findAuthor().catch(function(reason){\n          return findOtherAuther();\n        }).finally(function(){\n          // author was either found, or not\n        });\n        ```\n      \n        @method finally\n        @param {Function} callback\n        @return {Promise}\n      */\n\n      Promise.prototype.finally = function _finally(callback) {\n        var promise = this;\n        var constructor = promise.constructor;\n\n        if (isFunction(callback)) {\n          return promise.then(function (value) {\n            return constructor.resolve(callback()).then(function () {\n              return value;\n            });\n          }, function (reason) {\n            return constructor.resolve(callback()).then(function () {\n              throw reason;\n            });\n          });\n        }\n\n        return promise.then(callback, callback);\n      };\n\n      return Promise;\n    }();\n\n    Promise$1.prototype.then = then;\n    Promise$1.all = all;\n    Promise$1.race = race;\n    Promise$1.resolve = resolve$1;\n    Promise$1.reject = reject$1;\n    Promise$1._setScheduler = setScheduler;\n    Promise$1._setAsap = setAsap;\n    Promise$1._asap = asap;\n\n    /*global self*/\n    function polyfill() {\n      var local = void 0;\n\n      if (typeof commonjsGlobal !== 'undefined') {\n        local = commonjsGlobal;\n      } else if (typeof self !== 'undefined') {\n        local = self;\n      } else {\n        try {\n          local = Function('return this')();\n        } catch (e) {\n          throw new Error('polyfill failed because global object is unavailable in this environment');\n        }\n      }\n\n      var P = local.Promise;\n\n      if (P) {\n        var promiseToString = null;\n        try {\n          promiseToString = Object.prototype.toString.call(P.resolve());\n        } catch (e) {\n          // silently ignored\n        }\n\n        if (promiseToString === '[object Promise]' && !P.cast) {\n          return;\n        }\n      }\n\n      local.Promise = Promise$1;\n    }\n\n    // Strange compat..\n    Promise$1.polyfill = polyfill;\n    Promise$1.Promise = Promise$1;\n\n    return Promise$1;\n  });\n\n  \n});\n\nvar auto = es6Promise.polyfill();\n\nvar runtime = createCommonjsModule(function (module) {\n  /**\n   * Copyright (c) 2014-present, Facebook, Inc.\n   *\n   * This source code is licensed under the MIT license found in the\n   * LICENSE file in the root directory of this source tree.\n   */\n\n  !function (global) {\n\n    var Op = Object.prototype;\n    var hasOwn = Op.hasOwnProperty;\n    var undefined; // More compressible than void 0.\n    var $Symbol = typeof Symbol === \"function\" ? Symbol : {};\n    var iteratorSymbol = $Symbol.iterator || \"@@iterator\";\n    var asyncIteratorSymbol = $Symbol.asyncIterator || \"@@asyncIterator\";\n    var toStringTagSymbol = $Symbol.toStringTag || \"@@toStringTag\";\n\n    var inModule = 'object' === \"object\";\n    var runtime = global.regeneratorRuntime;\n    if (runtime) {\n      if (inModule) {\n        // If regeneratorRuntime is defined globally and we're in a module,\n        // make the exports object identical to regeneratorRuntime.\n        module.exports = runtime;\n      }\n      // Don't bother evaluating the rest of this file if the runtime was\n      // already defined globally.\n      return;\n    }\n\n    // Define the runtime globally (as expected by generated code) as either\n    // module.exports (if we're in a module) or a new, empty object.\n    runtime = global.regeneratorRuntime = inModule ? module.exports : {};\n\n    function wrap(innerFn, outerFn, self, tryLocsList) {\n      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.\n      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;\n      var generator = Object.create(protoGenerator.prototype);\n      var context = new Context(tryLocsList || []);\n\n      // The ._invoke method unifies the implementations of the .next,\n      // .throw, and .return methods.\n      generator._invoke = makeInvokeMethod(innerFn, self, context);\n\n      return generator;\n    }\n    runtime.wrap = wrap;\n\n    // Try/catch helper to minimize deoptimizations. Returns a completion\n    // record like context.tryEntries[i].completion. This interface could\n    // have been (and was previously) designed to take a closure to be\n    // invoked without arguments, but in all the cases we care about we\n    // already have an existing method we want to call, so there's no need\n    // to create a new function object. We can even get away with assuming\n    // the method takes exactly one argument, since that happens to be true\n    // in every case, so we don't have to touch the arguments object. The\n    // only additional allocation required is the completion record, which\n    // has a stable shape and so hopefully should be cheap to allocate.\n    function tryCatch(fn, obj, arg) {\n      try {\n        return { type: \"normal\", arg: fn.call(obj, arg) };\n      } catch (err) {\n        return { type: \"throw\", arg: err };\n      }\n    }\n\n    var GenStateSuspendedStart = \"suspendedStart\";\n    var GenStateSuspendedYield = \"suspendedYield\";\n    var GenStateExecuting = \"executing\";\n    var GenStateCompleted = \"completed\";\n\n    // Returning this object from the innerFn has the same effect as\n    // breaking out of the dispatch switch statement.\n    var ContinueSentinel = {};\n\n    // Dummy constructor functions that we use as the .constructor and\n    // .constructor.prototype properties for functions that return Generator\n    // objects. For full spec compliance, you may wish to configure your\n    // minifier not to mangle the names of these two functions.\n    function Generator() {}\n    function GeneratorFunction() {}\n    function GeneratorFunctionPrototype() {}\n\n    // This is a polyfill for %IteratorPrototype% for environments that\n    // don't natively support it.\n    var IteratorPrototype = {};\n    IteratorPrototype[iteratorSymbol] = function () {\n      return this;\n    };\n\n    var getProto = Object.getPrototypeOf;\n    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));\n    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {\n      // This environment has a native %IteratorPrototype%; use it instead\n      // of the polyfill.\n      IteratorPrototype = NativeIteratorPrototype;\n    }\n\n    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);\n    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;\n    GeneratorFunctionPrototype.constructor = GeneratorFunction;\n    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = \"GeneratorFunction\";\n\n    // Helper for defining the .next, .throw, and .return methods of the\n    // Iterator interface in terms of a single ._invoke method.\n    function defineIteratorMethods(prototype) {\n      [\"next\", \"throw\", \"return\"].forEach(function (method) {\n        prototype[method] = function (arg) {\n          return this._invoke(method, arg);\n        };\n      });\n    }\n\n    runtime.isGeneratorFunction = function (genFun) {\n      var ctor = typeof genFun === \"function\" && genFun.constructor;\n      return ctor ? ctor === GeneratorFunction ||\n      // For the native GeneratorFunction constructor, the best we can\n      // do is to check its .name property.\n      (ctor.displayName || ctor.name) === \"GeneratorFunction\" : false;\n    };\n\n    runtime.mark = function (genFun) {\n      if (Object.setPrototypeOf) {\n        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);\n      } else {\n        genFun.__proto__ = GeneratorFunctionPrototype;\n        if (!(toStringTagSymbol in genFun)) {\n          genFun[toStringTagSymbol] = \"GeneratorFunction\";\n        }\n      }\n      genFun.prototype = Object.create(Gp);\n      return genFun;\n    };\n\n    // Within the body of any async function, `await x` is transformed to\n    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test\n    // `hasOwn.call(value, \"__await\")` to determine if the yielded value is\n    // meant to be awaited.\n    runtime.awrap = function (arg) {\n      return { __await: arg };\n    };\n\n    function AsyncIterator(generator) {\n      function invoke(method, arg, resolve, reject) {\n        var record = tryCatch(generator[method], generator, arg);\n        if (record.type === \"throw\") {\n          reject(record.arg);\n        } else {\n          var result = record.arg;\n          var value = result.value;\n          if (value && (typeof value === \"undefined\" ? \"undefined\" : _typeof(value)) === \"object\" && hasOwn.call(value, \"__await\")) {\n            return Promise.resolve(value.__await).then(function (value) {\n              invoke(\"next\", value, resolve, reject);\n            }, function (err) {\n              invoke(\"throw\", err, resolve, reject);\n            });\n          }\n\n          return Promise.resolve(value).then(function (unwrapped) {\n            // When a yielded Promise is resolved, its final value becomes\n            // the .value of the Promise<{value,done}> result for the\n            // current iteration. If the Promise is rejected, however, the\n            // result for this iteration will be rejected with the same\n            // reason. Note that rejections of yielded Promises are not\n            // thrown back into the generator function, as is the case\n            // when an awaited Promise is rejected. This difference in\n            // behavior between yield and await is important, because it\n            // allows the consumer to decide what to do with the yielded\n            // rejection (swallow it and continue, manually .throw it back\n            // into the generator, abandon iteration, whatever). With\n            // await, by contrast, there is no opportunity to examine the\n            // rejection reason outside the generator function, so the\n            // only option is to throw it from the await expression, and\n            // let the generator function handle the exception.\n            result.value = unwrapped;\n            resolve(result);\n          }, reject);\n        }\n      }\n\n      var previousPromise;\n\n      function enqueue(method, arg) {\n        function callInvokeWithMethodAndArg() {\n          return new Promise(function (resolve, reject) {\n            invoke(method, arg, resolve, reject);\n          });\n        }\n\n        return previousPromise =\n        // If enqueue has been called before, then we want to wait until\n        // all previous Promises have been resolved before calling invoke,\n        // so that results are always delivered in the correct order. If\n        // enqueue has not been called before, then it is important to\n        // call invoke immediately, without waiting on a callback to fire,\n        // so that the async generator function has the opportunity to do\n        // any necessary setup in a predictable way. This predictability\n        // is why the Promise constructor synchronously invokes its\n        // executor callback, and why async functions synchronously\n        // execute code before the first await. Since we implement simple\n        // async functions in terms of async generators, it is especially\n        // important to get this right, even though it requires care.\n        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,\n        // Avoid propagating failures to Promises returned by later\n        // invocations of the iterator.\n        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();\n      }\n\n      // Define the unified helper method that is used to implement .next,\n      // .throw, and .return (see defineIteratorMethods).\n      this._invoke = enqueue;\n    }\n\n    defineIteratorMethods(AsyncIterator.prototype);\n    AsyncIterator.prototype[asyncIteratorSymbol] = function () {\n      return this;\n    };\n    runtime.AsyncIterator = AsyncIterator;\n\n    // Note that simple async functions are implemented on top of\n    // AsyncIterator objects; they just return a Promise for the value of\n    // the final result produced by the iterator.\n    runtime.async = function (innerFn, outerFn, self, tryLocsList) {\n      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));\n\n      return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.\n      : iter.next().then(function (result) {\n        return result.done ? result.value : iter.next();\n      });\n    };\n\n    function makeInvokeMethod(innerFn, self, context) {\n      var state = GenStateSuspendedStart;\n\n      return function invoke(method, arg) {\n        if (state === GenStateExecuting) {\n          throw new Error(\"Generator is already running\");\n        }\n\n        if (state === GenStateCompleted) {\n          if (method === \"throw\") {\n            throw arg;\n          }\n\n          // Be forgiving, per 25.3.3.3.3 of the spec:\n          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume\n          return doneResult();\n        }\n\n        context.method = method;\n        context.arg = arg;\n\n        while (true) {\n          var delegate = context.delegate;\n          if (delegate) {\n            var delegateResult = maybeInvokeDelegate(delegate, context);\n            if (delegateResult) {\n              if (delegateResult === ContinueSentinel) continue;\n              return delegateResult;\n            }\n          }\n\n          if (context.method === \"next\") {\n            // Setting context._sent for legacy support of Babel's\n            // function.sent implementation.\n            context.sent = context._sent = context.arg;\n          } else if (context.method === \"throw\") {\n            if (state === GenStateSuspendedStart) {\n              state = GenStateCompleted;\n              throw context.arg;\n            }\n\n            context.dispatchException(context.arg);\n          } else if (context.method === \"return\") {\n            context.abrupt(\"return\", context.arg);\n          }\n\n          state = GenStateExecuting;\n\n          var record = tryCatch(innerFn, self, context);\n          if (record.type === \"normal\") {\n            // If an exception is thrown from innerFn, we leave state ===\n            // GenStateExecuting and loop back for another invocation.\n            state = context.done ? GenStateCompleted : GenStateSuspendedYield;\n\n            if (record.arg === ContinueSentinel) {\n              continue;\n            }\n\n            return {\n              value: record.arg,\n              done: context.done\n            };\n          } else if (record.type === \"throw\") {\n            state = GenStateCompleted;\n            // Dispatch the exception by looping back around to the\n            // context.dispatchException(context.arg) call above.\n            context.method = \"throw\";\n            context.arg = record.arg;\n          }\n        }\n      };\n    }\n\n    // Call delegate.iterator[context.method](context.arg) and handle the\n    // result, either by returning a { value, done } result from the\n    // delegate iterator, or by modifying context.method and context.arg,\n    // setting context.delegate to null, and returning the ContinueSentinel.\n    function maybeInvokeDelegate(delegate, context) {\n      var method = delegate.iterator[context.method];\n      if (method === undefined) {\n        // A .throw or .return when the delegate iterator has no .throw\n        // method always terminates the yield* loop.\n        context.delegate = null;\n\n        if (context.method === \"throw\") {\n          if (delegate.iterator.return) {\n            // If the delegate iterator has a return method, give it a\n            // chance to clean up.\n            context.method = \"return\";\n            context.arg = undefined;\n            maybeInvokeDelegate(delegate, context);\n\n            if (context.method === \"throw\") {\n              // If maybeInvokeDelegate(context) changed context.method from\n              // \"return\" to \"throw\", let that override the TypeError below.\n              return ContinueSentinel;\n            }\n          }\n\n          context.method = \"throw\";\n          context.arg = new TypeError(\"The iterator does not provide a 'throw' method\");\n        }\n\n        return ContinueSentinel;\n      }\n\n      var record = tryCatch(method, delegate.iterator, context.arg);\n\n      if (record.type === \"throw\") {\n        context.method = \"throw\";\n        context.arg = record.arg;\n        context.delegate = null;\n        return ContinueSentinel;\n      }\n\n      var info = record.arg;\n\n      if (!info) {\n        context.method = \"throw\";\n        context.arg = new TypeError(\"iterator result is not an object\");\n        context.delegate = null;\n        return ContinueSentinel;\n      }\n\n      if (info.done) {\n        // Assign the result of the finished delegate to the temporary\n        // variable specified by delegate.resultName (see delegateYield).\n        context[delegate.resultName] = info.value;\n\n        // Resume execution at the desired location (see delegateYield).\n        context.next = delegate.nextLoc;\n\n        // If context.method was \"throw\" but the delegate handled the\n        // exception, let the outer generator proceed normally. If\n        // context.method was \"next\", forget context.arg since it has been\n        // \"consumed\" by the delegate iterator. If context.method was\n        // \"return\", allow the original .return call to continue in the\n        // outer generator.\n        if (context.method !== \"return\") {\n          context.method = \"next\";\n          context.arg = undefined;\n        }\n      } else {\n        // Re-yield the result returned by the delegate method.\n        return info;\n      }\n\n      // The delegate iterator is finished, so forget it and continue with\n      // the outer generator.\n      context.delegate = null;\n      return ContinueSentinel;\n    }\n\n    // Define Generator.prototype.{next,throw,return} in terms of the\n    // unified ._invoke helper method.\n    defineIteratorMethods(Gp);\n\n    Gp[toStringTagSymbol] = \"Generator\";\n\n    // A Generator should always return itself as the iterator object when the\n    // @@iterator function is called on it. Some browsers' implementations of the\n    // iterator prototype chain incorrectly implement this, causing the Generator\n    // object to not be returned from this call. This ensures that doesn't happen.\n    // See https://github.com/facebook/regenerator/issues/274 for more details.\n    Gp[iteratorSymbol] = function () {\n      return this;\n    };\n\n    Gp.toString = function () {\n      return \"[object Generator]\";\n    };\n\n    function pushTryEntry(locs) {\n      var entry = { tryLoc: locs[0] };\n\n      if (1 in locs) {\n        entry.catchLoc = locs[1];\n      }\n\n      if (2 in locs) {\n        entry.finallyLoc = locs[2];\n        entry.afterLoc = locs[3];\n      }\n\n      this.tryEntries.push(entry);\n    }\n\n    function resetTryEntry(entry) {\n      var record = entry.completion || {};\n      record.type = \"normal\";\n      delete record.arg;\n      entry.completion = record;\n    }\n\n    function Context(tryLocsList) {\n      // The root entry object (effectively a try statement without a catch\n      // or a finally block) gives us a place to store values thrown from\n      // locations where there is no enclosing try statement.\n      this.tryEntries = [{ tryLoc: \"root\" }];\n      tryLocsList.forEach(pushTryEntry, this);\n      this.reset(true);\n    }\n\n    runtime.keys = function (object) {\n      var keys = [];\n      for (var key in object) {\n        keys.push(key);\n      }\n      keys.reverse();\n\n      // Rather than returning an object with a next method, we keep\n      // things simple and return the next function itself.\n      return function next() {\n        while (keys.length) {\n          var key = keys.pop();\n          if (key in object) {\n            next.value = key;\n            next.done = false;\n            return next;\n          }\n        }\n\n        // To avoid creating an additional object, we just hang the .value\n        // and .done properties off the next function object itself. This\n        // also ensures that the minifier will not anonymize the function.\n        next.done = true;\n        return next;\n      };\n    };\n\n    function values(iterable) {\n      if (iterable) {\n        var iteratorMethod = iterable[iteratorSymbol];\n        if (iteratorMethod) {\n          return iteratorMethod.call(iterable);\n        }\n\n        if (typeof iterable.next === \"function\") {\n          return iterable;\n        }\n\n        if (!isNaN(iterable.length)) {\n          var i = -1,\n              next = function next() {\n            while (++i < iterable.length) {\n              if (hasOwn.call(iterable, i)) {\n                next.value = iterable[i];\n                next.done = false;\n                return next;\n              }\n            }\n\n            next.value = undefined;\n            next.done = true;\n\n            return next;\n          };\n\n          return next.next = next;\n        }\n      }\n\n      // Return an iterator with no values.\n      return { next: doneResult };\n    }\n    runtime.values = values;\n\n    function doneResult() {\n      return { value: undefined, done: true };\n    }\n\n    Context.prototype = {\n      constructor: Context,\n\n      reset: function reset(skipTempReset) {\n        this.prev = 0;\n        this.next = 0;\n        // Resetting context._sent for legacy support of Babel's\n        // function.sent implementation.\n        this.sent = this._sent = undefined;\n        this.done = false;\n        this.delegate = null;\n\n        this.method = \"next\";\n        this.arg = undefined;\n\n        this.tryEntries.forEach(resetTryEntry);\n\n        if (!skipTempReset) {\n          for (var name in this) {\n            // Not sure about the optimal order of these conditions:\n            if (name.charAt(0) === \"t\" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {\n              this[name] = undefined;\n            }\n          }\n        }\n      },\n\n      stop: function stop() {\n        this.done = true;\n\n        var rootEntry = this.tryEntries[0];\n        var rootRecord = rootEntry.completion;\n        if (rootRecord.type === \"throw\") {\n          throw rootRecord.arg;\n        }\n\n        return this.rval;\n      },\n\n      dispatchException: function dispatchException(exception) {\n        if (this.done) {\n          throw exception;\n        }\n\n        var context = this;\n        function handle(loc, caught) {\n          record.type = \"throw\";\n          record.arg = exception;\n          context.next = loc;\n\n          if (caught) {\n            // If the dispatched exception was caught by a catch block,\n            // then let that catch block handle the exception normally.\n            context.method = \"next\";\n            context.arg = undefined;\n          }\n\n          return !!caught;\n        }\n\n        for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n          var entry = this.tryEntries[i];\n          var record = entry.completion;\n\n          if (entry.tryLoc === \"root\") {\n            // Exception thrown outside of any try block that could handle\n            // it, so set the completion value of the entire function to\n            // throw the exception.\n            return handle(\"end\");\n          }\n\n          if (entry.tryLoc <= this.prev) {\n            var hasCatch = hasOwn.call(entry, \"catchLoc\");\n            var hasFinally = hasOwn.call(entry, \"finallyLoc\");\n\n            if (hasCatch && hasFinally) {\n              if (this.prev < entry.catchLoc) {\n                return handle(entry.catchLoc, true);\n              } else if (this.prev < entry.finallyLoc) {\n                return handle(entry.finallyLoc);\n              }\n            } else if (hasCatch) {\n              if (this.prev < entry.catchLoc) {\n                return handle(entry.catchLoc, true);\n              }\n            } else if (hasFinally) {\n              if (this.prev < entry.finallyLoc) {\n                return handle(entry.finallyLoc);\n              }\n            } else {\n              throw new Error(\"try statement without catch or finally\");\n            }\n          }\n        }\n      },\n\n      abrupt: function abrupt(type, arg) {\n        for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n          var entry = this.tryEntries[i];\n          if (entry.tryLoc <= this.prev && hasOwn.call(entry, \"finallyLoc\") && this.prev < entry.finallyLoc) {\n            var finallyEntry = entry;\n            break;\n          }\n        }\n\n        if (finallyEntry && (type === \"break\" || type === \"continue\") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {\n          // Ignore the finally entry if control is not jumping to a\n          // location outside the try/catch block.\n          finallyEntry = null;\n        }\n\n        var record = finallyEntry ? finallyEntry.completion : {};\n        record.type = type;\n        record.arg = arg;\n\n        if (finallyEntry) {\n          this.method = \"next\";\n          this.next = finallyEntry.finallyLoc;\n          return ContinueSentinel;\n        }\n\n        return this.complete(record);\n      },\n\n      complete: function complete(record, afterLoc) {\n        if (record.type === \"throw\") {\n          throw record.arg;\n        }\n\n        if (record.type === \"break\" || record.type === \"continue\") {\n          this.next = record.arg;\n        } else if (record.type === \"return\") {\n          this.rval = this.arg = record.arg;\n          this.method = \"return\";\n          this.next = \"end\";\n        } else if (record.type === \"normal\" && afterLoc) {\n          this.next = afterLoc;\n        }\n\n        return ContinueSentinel;\n      },\n\n      finish: function finish(finallyLoc) {\n        for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n          var entry = this.tryEntries[i];\n          if (entry.finallyLoc === finallyLoc) {\n            this.complete(entry.completion, entry.afterLoc);\n            resetTryEntry(entry);\n            return ContinueSentinel;\n          }\n        }\n      },\n\n      \"catch\": function _catch(tryLoc) {\n        for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n          var entry = this.tryEntries[i];\n          if (entry.tryLoc === tryLoc) {\n            var record = entry.completion;\n            if (record.type === \"throw\") {\n              var thrown = record.arg;\n              resetTryEntry(entry);\n            }\n            return thrown;\n          }\n        }\n\n        // The context.catch method must only be called with a location\n        // argument that corresponds to a known catch block.\n        throw new Error(\"illegal catch attempt\");\n      },\n\n      delegateYield: function delegateYield(iterable, resultName, nextLoc) {\n        this.delegate = {\n          iterator: values(iterable),\n          resultName: resultName,\n          nextLoc: nextLoc\n        };\n\n        if (this.method === \"next\") {\n          // Deliberately forget the last sent value so that we don't\n          // accidentally pass it on to the delegate.\n          this.arg = undefined;\n        }\n\n        return ContinueSentinel;\n      }\n    };\n  }(\n  // In sloppy mode, unbound `this` refers to the global object, fallback to\n  // Function constructor if we're in global strict mode. That is sadly a form\n  // of indirect eval which violates Content Security Policy.\n  function () {\n    return this;\n  }() || Function(\"return this\")());\n});\n\n/**\n * Copyright (c) 2014-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n// This method of obtaining a reference to the global object needs to be\n// kept identical to the way it is obtained in runtime.js\nvar g = function () {\n  return this;\n}() || Function(\"return this\")();\n\n// Use `getOwnPropertyNames` because not all browsers support calling\n// `hasOwnProperty` on the global `self` object in a worker. See #183.\nvar hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf(\"regeneratorRuntime\") >= 0;\n\n// Save the old regeneratorRuntime in case it needs to be restored later.\nvar oldRuntime = hadRuntime && g.regeneratorRuntime;\n\n// Force reevalutation of runtime.js.\ng.regeneratorRuntime = undefined;\n\nvar runtimeModule = runtime;\n\nif (hadRuntime) {\n  // Restore the original runtime.\n  g.regeneratorRuntime = oldRuntime;\n} else {\n  // Remove the global property added by runtime.js.\n  try {\n    delete g.regeneratorRuntime;\n  } catch (e) {\n    g.regeneratorRuntime = undefined;\n  }\n}\n\nvar regenerator = runtimeModule;\n\nvar Util;\n\nUtil = function () {\n  var Util = function () {\n    function Util() {\n      classCallCheck(this, Util);\n    }\n\n    createClass(Util, null, [{\n      key: 'getElement',\n\n      // Returns the given element.\n      // @params {HTMLElement|String} el\n      // @returns {HTMLElement}\n      value: function getElement(el) {\n        if (typeof el === 'string') {\n          return document.querySelector(el);\n        }\n        return el;\n      }\n\n      // Attaches the given events to the element.\n      // @params {HTMLElement} el\n      // @params {String[]} events\n      // @params {EventListener} callback\n\n    }, {\n      key: 'addMultiEventListener',\n      value: function addMultiEventListener(el, events, callback) {\n        var i, j, len, results;\n        results = [];\n        for (j = 0, len = events.length; j < len; j++) {\n          i = events[j];\n          results.push(el.addEventListener(i, callback, true));\n        }\n        return results;\n      }\n\n      // Removes the events from the element.\n      // @params {HTMLElement} el\n      // @params {String[]} events\n      // @params {EventListener} callback\n\n    }, {\n      key: 'removeMultiEventListener',\n      value: function removeMultiEventListener(el, events, callback) {\n        var i, j, len, results;\n        results = [];\n        for (j = 0, len = events.length; j < len; j++) {\n          i = events[j];\n          results.push(el.removeEventListener(i, callback, true));\n        }\n        return results;\n      }\n\n      // Attaches the events to the element for once.\n      // @params {HTMLElement} el\n      // @params {String[]} events\n      // @params {EventListener} callback\n\n    }, {\n      key: 'addMultiEventListenerOnce',\n      value: function addMultiEventListenerOnce(el, events, callback) {\n        var _this = this;\n\n        var _cb;\n        _cb = function cb(e) {\n          _this.removeMultiEventListener(el, events, _cb);\n          return callback(e);\n        };\n        return this.addMultiEventListener(el, events, _cb);\n      }\n\n      // @params {String} css\n      // @returns {String}\n\n    }, {\n      key: 'setCSSPrefix',\n      value: function setCSSPrefix(css) {\n        return '-webkit-' + css + '; -ms-' + css + '; ' + css + ';';\n      }\n\n      // Creates a new event and initalizes it.\n      // @params {String} name\n      // @returns {Event}\n\n    }, {\n      key: 'createEvent',\n      value: function createEvent(name) {\n        var event;\n        event = null;\n        if (typeof document !== 'undefined') {\n          event = document.createEvent('HTMLEvents') || document.createEvent('event');\n          event.initEvent(name, false, true);\n        }\n        return event;\n      }\n    }]);\n    return Util;\n  }();\n\n  Util.isMobile = typeof navigator !== 'undefined' ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) : false;\n\n  Util.events = {\n    mousedown: Util.isMobile ? 'touchstart' : 'mousedown',\n    mouseup: Util.isMobile ? 'touchend' : 'mouseup'\n  };\n\n  Util.transitionEndEvents = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'otransitionend', 'MSTransitionEnd'];\n\n  return Util;\n}.call(undefined);\n\nvar Util$1 = Util;\n\nvar Group;\n\nvar Group$1 = Group = function () {\n  function Group() {\n    classCallCheck(this, Group);\n  }\n\n  createClass(Group, null, [{\n    key: 'resize',\n\n    // @params {Boolean} skip\n    value: function resize() {\n\n      var $, e, i, iterator, j, k, l, len, len1, len2, m, n, o, p, r, ref, ref1, ref2, ref3, ref4, ref5, s, spaceElements, wrapper, wrappers;\n      iterator = this.resizeIterator.apply(this, arguments);\n      $ = iterator.next();\n      if ($.done) {\n        return;\n      } else {\n        $ = $.value;\n      }\n      this.Group.setTotalIndex.call(this, $.imageCount);\n      wrappers = this.container.querySelectorAll('.mc-wrapper');\n      for (i = j = 0, ref = this.totalIndex - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {\n        if (!(wrapper = wrappers[i])) {\n          wrapper = document.createElement('div');\n          wrapper.classList.add('mc-wrapper');\n          wrapper.style.marginRight = this.space + 'px';\n          this.container.appendChild(wrapper);\n        } else {\n          spaceElements = wrapper.querySelectorAll('.mc-carousel-space-element');\n          for (k = 0, len = spaceElements.length; k < len; k++) {\n            s = spaceElements[k];\n            wrapper.removeChild(s);\n          }\n        }\n        r = i * $.imageCount;\n        for (n = l = ref1 = r, ref2 = r + $.imageCount - 1; ref1 <= ref2 ? l <= ref2 : l >= ref2; n = ref1 <= ref2 ? ++l : --l) {\n          if (e = this.elements[n]) {\n            wrapper.appendChild(e);\n          } else {\n            s = document.createElement('div');\n            s.className = 'mc-carousel-element mc-carousel-space-element';\n            s.style.marginRight = this.space + 'px';\n            wrapper.appendChild(s);\n          }\n        }\n      }\n      wrappers = this.container.querySelectorAll('.mc-wrapper');\n      if (wrappers.length > this.totalIndex) {\n        for (i = m = ref3 = this.totalIndex, ref4 = wrappers.length - 1; ref3 <= ref4 ? m <= ref4 : m >= ref4; i = ref3 <= ref4 ? ++m : --m) {\n          this.container.removeChild(wrappers[i]);\n        }\n      }\n      ref5 = this.elements;\n      for (o = 0, len1 = ref5.length; o < len1; o++) {\n        e = ref5[o];\n        e.style.width = this.width + 'px';\n      }\n      spaceElements = this.container.querySelectorAll('.mc-wrapper > .mc-carousel-space-element');\n      for (p = 0, len2 = spaceElements.length; p < len2; p++) {\n        s = spaceElements[p];\n        s.style.width = this.width + 'px';\n      }\n      return iterator.next();\n    }\n\n    // @returns {Promise<void>}\n\n  }, {\n    key: 'setCarouselAnimation',\n    value: function setCarouselAnimation() {\n      var _this = this,\n          _arguments = arguments;\n\n      return new Promise(function () {\n        var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(resolve) {\n          var $, afterAnmCalc, beforeAnmCalc, iterator;\n          return regenerator.wrap(function _callee$(_context) {\n            while (1) {\n              switch (_context.prev = _context.next) {\n                case 0:\n                  iterator = _this.setCarouselAnimationIterator.apply(_this, _arguments);\n                  $ = iterator.next().value;\n                  if ($.reverse) {\n                    if ($.reverseNext) {\n                      beforeAnmCalc = 0;\n                      afterAnmCalc = _this.elWidth + _this.space;\n                    } else {\n                      beforeAnmCalc = _this.elWidth + _this.space;\n                      afterAnmCalc = 0;\n                    }\n                  } else {\n                    beforeAnmCalc = $.i * _this.elWidth + $.i * _this.space;\n                    afterAnmCalc = _this.index * _this.elWidth + _this.index * _this.space;\n                  }\n                  _context.next = 5;\n                  return new Promise(function (resolve) {\n                    return requestAnimationFrame(function () {\n                      var wrappers;\n                      if ($.reverse) {\n                        wrappers = _this.container.querySelectorAll('.mc-wrapper');\n                        _this.container.insertBefore(wrappers[_this.totalIndex - 1], wrappers[0]);\n                      }\n                      _this.container.setAttribute('style', Util$1.setCSSPrefix('transform:translateX(-' + beforeAnmCalc + 'px)'));\n                      return requestAnimationFrame(function () {\n                        _this.container.setAttribute('style', [_this.applyTransition(), Util$1.setCSSPrefix('transform:translateX(-' + afterAnmCalc + 'px)')].join(''));\n                        return Util$1.addMultiEventListenerOnce(_this.container, Util$1.transitionEndEvents, function () {\n                          if ($.reverse) {\n                            _this.container.appendChild(wrappers[_this.totalIndex - 1]);\n                          }\n                          _this.container.setAttribute('style', Util$1.setCSSPrefix('transform:translateX(-' + (_this.index * _this.elWidth + _this.index * _this.space) + 'px)'));\n                          return resolve();\n                        });\n                      });\n                    });\n                  });\n\n                case 5:\n                  iterator.next();\n                  return _context.abrupt('return', resolve());\n\n                case 7:\n                case 'end':\n                  return _context.stop();\n              }\n            }\n          }, _callee, _this);\n        }));\n\n        return function (_x2) {\n          return _ref.apply(this, arguments);\n        };\n      }());\n    }\n\n    // @params {HTMLElement} el\n    // @params {Number} index\n\n  }, {\n    key: 'addElement',\n    value: function addElement(el, index) {\n      var iterator;\n      iterator = this.addElementIterator.apply(this, arguments);\n      iterator.next();\n      if (this.maxWidth) {\n        el.style.maxWidth = this.maxWidth + 'px';\n      }\n      this.container.querySelector('.mc-wrapper').appendChild(el);\n      return iterator.next();\n    }\n\n    // @params {Number} index\n\n  }, {\n    key: 'removeElement',\n    value: function removeElement(index) {\n      var iterator;\n      iterator = this.removeElementIterator.apply(this, arguments);\n      iterator.next();\n      return iterator.next();\n    }\n\n    // Sets total index.\n    // @params {Number} imageCount\n\n  }, {\n    key: 'setTotalIndex',\n    value: function setTotalIndex(imageCount) {\n      var totalIndex;\n      totalIndex = Math.ceil(this.total / imageCount);\n      if (this.totalIndex !== totalIndex) {\n        this.totalIndex = totalIndex;\n        this.index = 0;\n        return this.container.setAttribute('style', Util$1.setCSSPrefix(\"transform:translateX(0)\"));\n      } else {\n        return this.container.setAttribute('style', Util$1.setCSSPrefix('transform:translateX(' + (this.index * this.elWidth + this.index * this.space) * -1 + 'px)'));\n      }\n    }\n  }]);\n  return Group;\n}();\n\nvar Solo;\n\nvar Solo$1 = Solo = function () {\n  function Solo() {\n    classCallCheck(this, Solo);\n  }\n\n  createClass(Solo, null, [{\n    key: 'resize',\n    value: function resize() {\n      var $, c, count, e, i, iterator, j, k, l, len, len1, ref, ref1, ref2, ref3, ref4;\n      iterator = this.resizeIterator.apply(this, arguments);\n      $ = iterator.next();\n      if ($.done) {\n        return;\n      } else {\n        $ = $.value;\n      }\n      if ((count = $.imageCount - 1) > 0) {\n        for (c = i = 0, ref = count - 1; 0 <= ref ? i <= ref : i >= ref; c = 0 <= ref ? ++i : --i) {\n          if (!this.cloneElements[c]) {\n            e = this.elements[c].cloneNode(true);\n            e.classList.add('mc-carousel-clone-element');\n            this.container.appendChild(e);\n            this.cloneElements.push(e);\n          }\n        }\n      }\n      if (this.cloneElements.length > count) {\n        for (c = j = ref1 = this.cloneElements.length - 1, ref2 = count; ref1 <= ref2 ? j <= ref2 : j >= ref2; c = ref1 <= ref2 ? ++j : --j) {\n          this.container.removeChild(this.cloneElements[c]);\n          this.cloneElements.splice(c, 1);\n        }\n      }\n      ref3 = this.elements;\n      for (k = 0, len = ref3.length; k < len; k++) {\n        e = ref3[k];\n        e.style.width = this.width + 'px';\n      }\n      ref4 = this.cloneElements;\n      for (l = 0, len1 = ref4.length; l < len1; l++) {\n        e = ref4[l];\n        e.style.width = this.width + 'px';\n      }\n      this.container.setAttribute('style', Util$1.setCSSPrefix('transform:translateX(-' + (this.index * this.width + this.index * this.space) + 'px)'));\n      return iterator.next();\n    }\n\n    // @returns {Promise<void>}\n\n  }, {\n    key: 'setCarouselAnimation',\n    value: function setCarouselAnimation() {\n      var _this = this,\n          _arguments = arguments;\n\n      return new Promise(function () {\n        var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(resolve) {\n          var $, afterAnmCalc, beforeAnmCalc, iterator;\n          return regenerator.wrap(function _callee$(_context) {\n            while (1) {\n              switch (_context.prev = _context.next) {\n                case 0:\n                  iterator = _this.setCarouselAnimationIterator.apply(_this, _arguments);\n                  $ = iterator.next().value;\n                  if ($.reverse) {\n                    if ($.reverseNext) {\n                      beforeAnmCalc = 0;\n                      afterAnmCalc = _this.width + _this.space;\n                    } else {\n                      beforeAnmCalc = _this.width + _this.space;\n                      afterAnmCalc = 0;\n                    }\n                  } else {\n                    beforeAnmCalc = $.i * _this.width + $.i * _this.space;\n                    afterAnmCalc = _this.index * _this.width + _this.index * _this.space;\n                  }\n                  _context.next = 5;\n                  return new Promise(function (resolve) {\n                    return requestAnimationFrame(function () {\n                      if ($.reverse) {\n                        _this.container.insertBefore(_this.elements[_this.totalIndex - 1], _this.elements[0]);\n                      }\n                      _this.container.setAttribute('style', Util$1.setCSSPrefix('transform:translateX(-' + beforeAnmCalc + 'px)'));\n                      return requestAnimationFrame(function () {\n                        _this.container.setAttribute('style', [_this.applyTransition(), Util$1.setCSSPrefix('transform:translateX(-' + afterAnmCalc + 'px)')].join(''));\n                        return Util$1.addMultiEventListenerOnce(_this.container, Util$1.transitionEndEvents, function () {\n                          if ($.reverse) {\n                            if (_this.cloneElements.length > 0) {\n                              _this.container.insertBefore(_this.elements[_this.totalIndex - 1], _this.cloneElements[0]);\n                            } else {\n                              _this.container.appendChild(_this.elements[_this.totalIndex - 1]);\n                            }\n                          }\n                          _this.container.setAttribute('style', Util$1.setCSSPrefix('transform:translateX(-' + (_this.index * _this.width + _this.index * _this.space) + 'px)'));\n                          return resolve();\n                        });\n                      });\n                    });\n                  });\n\n                case 5:\n                  iterator.next();\n                  return _context.abrupt('return', resolve());\n\n                case 7:\n                case 'end':\n                  return _context.stop();\n              }\n            }\n          }, _callee, _this);\n        }));\n\n        return function (_x) {\n          return _ref.apply(this, arguments);\n        };\n      }());\n    }\n\n    // @params {HTMLElement} el\n    // @params {Number} index\n\n  }, {\n    key: 'addElement',\n    value: function addElement(el, index) {\n      var iterator;\n      iterator = this.addElementIterator.apply(this, arguments);\n      iterator.next();\n      if (index < this.total) {\n        this.container.insertBefore(el, this.elements[index]);\n      } else {\n        this.container.appendChild(el);\n      }\n      this.totalIndex += 1;\n      if (this.list) {\n        this.list.add();\n      }\n      this.Group.removeCloneElements.call(this);\n      return iterator.next();\n    }\n\n    // @params {Number} index\n\n  }, {\n    key: 'removeElement',\n    value: function removeElement(index) {\n      var iterator;\n      iterator = this.removeElementIterator.apply(this, arguments);\n      iterator.next();\n      if (index <= this.index && this.index !== 0) {\n        this.index -= 1;\n        if (this.list) {\n          this.list.index = this.index;\n        }\n      }\n      this.totalIndex -= 1;\n      if (this.list) {\n        this.list.remove();\n      }\n      this.Group.removeCloneElements.call(this);\n      return iterator.next();\n    }\n\n    // Removes the cloned elements.\n\n  }, {\n    key: 'removeCloneElements',\n    value: function removeCloneElements() {\n      var c, i, len, ref;\n      ref = this.cloneElements;\n      for (i = 0, len = ref.length; i < len; i++) {\n        c = ref[i];\n        this.container.removeChild(c);\n      }\n      return this.cloneElements = [];\n    }\n  }]);\n  return Solo;\n}();\n\nvar Util$2;\n\nUtil$2 = function () {\n  var Util = function () {\n    function Util() {\n      classCallCheck(this, Util);\n    }\n\n    createClass(Util, null, [{\n      key: 'getElement',\n\n      // Returns the given element.\n      // @params {HTMLElement|String} el\n      // @returns {HTMLElement}\n      value: function getElement(el) {\n        if (typeof el === 'string') {\n          return document.querySelector(el);\n        }\n        return el;\n      }\n\n      // Attaches the given events to the element.\n      // @params {HTMLElement} el\n      // @params {String[]} events\n      // @params {EventListener} callback\n\n    }, {\n      key: 'addMultiEventListener',\n      value: function addMultiEventListener(el, events, callback) {\n        var i, j, len, results;\n        results = [];\n        for (j = 0, len = events.length; j < len; j++) {\n          i = events[j];\n          results.push(el.addEventListener(i, callback, true));\n        }\n        return results;\n      }\n\n      // Removes the events from the element.\n      // @params {HTMLElement} el\n      // @params {String[]} events\n      // @params {EventListener} callback\n\n    }, {\n      key: 'removeMultiEventListener',\n      value: function removeMultiEventListener(el, events, callback) {\n        var i, j, len, results;\n        results = [];\n        for (j = 0, len = events.length; j < len; j++) {\n          i = events[j];\n          results.push(el.removeEventListener(i, callback, true));\n        }\n        return results;\n      }\n\n      // Attaches the events to the element for once.\n      // @params {HTMLElement} el\n      // @params {String[]} events\n      // @params {EventListener} callback\n\n    }, {\n      key: 'addMultiEventListenerOnce',\n      value: function addMultiEventListenerOnce(el, events, callback) {\n        var _this = this;\n\n        var _cb;\n        _cb = function cb(e) {\n          _this.removeMultiEventListener(el, events, _cb);\n          return callback(e);\n        };\n        return this.addMultiEventListener(el, events, _cb);\n      }\n\n      // @params {String} css\n      // @returns {String}\n\n    }, {\n      key: 'setCSSPrefix',\n      value: function setCSSPrefix(css) {\n        return '-webkit-' + css + '; -ms-' + css + '; ' + css + ';';\n      }\n\n      // Creates a new event and initalizes it.\n      // @params {String} name\n      // @returns {Event}\n\n    }, {\n      key: 'createEvent',\n      value: function createEvent(name) {\n        var event;\n        event = null;\n        if (typeof document !== 'undefined') {\n          event = document.createEvent('HTMLEvents') || document.createEvent('event');\n          event.initEvent(name, false, true);\n        }\n        return event;\n      }\n    }]);\n    return Util;\n  }();\n\n  Util.isMobile = typeof navigator !== 'undefined' ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) : false;\n\n  Util.events = {\n    mousedown: Util.isMobile ? 'touchstart' : 'mousedown',\n    mouseup: Util.isMobile ? 'touchend' : 'mouseup'\n  };\n\n  Util.transitionEndEvents = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'otransitionend', 'MSTransitionEnd'];\n\n  return Util;\n}.call(undefined);\n\nvar Util$3 = Util$2;\n\nvar events = {\n  change: Util$3.createEvent('change'),\n  totalIndex: Util$3.createEvent('totalIndex'),\n  touchStart: Util$3.createEvent('touchStart'),\n  touchEnd: Util$3.createEvent('touchEnd'),\n  play: Util$3.createEvent('play'),\n  stop: Util$3.createEvent('stop'),\n  destroy: Util$3.createEvent('destroy')\n};\n\nvar TouchMove;\n\nvar TouchMove$1 = TouchMove = function () {\n  function TouchMove(carousel) {\n    classCallCheck(this, TouchMove);\n\n    this.carousel = carousel;\n    this.start = this.start.bind(this);\n    this.end = this.end.bind(this);\n    this.carousel.carouselEl.addEventListener(Util$3.events.mousedown, this.start, true);\n  }\n\n  // Starts touching.\n  // @params {Event} e\n\n\n  createClass(TouchMove, [{\n    key: 'start',\n    value: function start(e) {\n      if (!this.carousel.processing) {\n        this.carousel.processing = true;\n        this.carousel.el.dispatchEvent(events.touchStart);\n        this.startX = e.clientX || e.pageX;\n        this.time = new Date().getTime();\n        window.addEventListener(Util$3.events.mouseup, this.end, true);\n      }\n      return e.preventDefault();\n    }\n\n    // Ends touching.\n    // @params {Event} e\n\n  }, {\n    key: 'end',\n    value: function end(e) {\n      var endX, t, x;\n      this.destroy();\n      this.carousel.el.dispatchEvent(events.touchEnd);\n      endX = e.clientX || e.pageX;\n      x = endX - this.startX;\n      t = new Date().getTime() - this.time;\n      if (Math.abs(x) >= 25 && t <= 250) {\n        if (x <= 0) {\n          return this.carousel.nextIndex(true);\n        } else {\n          return this.carousel.prevIndex(true);\n        }\n      } else {\n        return this.carousel.processing = false;\n      }\n    }\n\n    // Removes the event listener.\n\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      return window.removeEventListener(Util$3.events.mouseup, this.end, true);\n    }\n  }]);\n  return TouchMove;\n}();\n\nvar List;\n\nvar List$1 = List = function () {\n  var List = function () {\n    function List(carousel, list, asList) {\n      classCallCheck(this, List);\n\n      var i, j, ref;\n      this.carousel = carousel;\n      this.asList = asList;\n      this.setIndex = this.setIndex.bind(this);\n      if (list) {\n        this.listEl = document.createElement('ul');\n        this.carousel.el.appendChild(this.listEl);\n        this.listEl.addEventListener(Util$3.events.mousedown, this.setIndex, true);\n        if (this.carousel.totalIndex > 0) {\n          for (i = j = 0, ref = this.carousel.totalIndex - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {\n            this.add();\n          }\n        }\n      }\n      if (this.asList) {\n        this.asList.addEventListener(Util$3.events.mousedown, this.setIndex, true);\n      }\n      this.index = this.carousel.index;\n    }\n\n    // Sets the new index by checking elements clicked on the list.\n    // @params {Event} e\n\n\n    createClass(List, [{\n      key: 'setIndex',\n      value: function setIndex(e) {\n        var index, target;\n        target = e.target;\n        while (target !== this.listEl && target !== this.asList && target.parentNode !== this.listEl && target.parentNode !== this.asList) {\n          target = target.parentNode;\n        }\n        if (target.parentNode === this.listEl || target.parentNode === this.asList) {\n          index = Array.prototype.slice.call(target.parentNode.children).indexOf(target);\n          return this.carousel.setIndex(index);\n        }\n      }\n\n      // Sets active class by index.\n\n    }, {\n      key: 'setActive',\n      value: function setActive() {\n        var activeEl, el;\n        if (this.listEl) {\n          activeEl = this.listEl.querySelector('.mc-active');\n          if (activeEl) {\n            activeEl.classList.remove('mc-active');\n          }\n          el = this.listEl.querySelectorAll('li')[this.index];\n          if (el) {\n            el.classList.add('mc-active');\n          }\n        }\n        if (this.asList) {\n          activeEl = this.asList.querySelector('.mc-active');\n          if (activeEl) {\n            activeEl.classList.remove('mc-active');\n          }\n          el = Array.prototype.slice.call(this.asList.children)[this.index];\n          if (el) {\n            return el.classList.add('mc-active');\n          }\n        }\n      }\n\n      // Adds a new element to the list.\n\n    }, {\n      key: 'add',\n      value: function add() {\n        if (this.listEl) {\n          return this.listEl.appendChild(document.createElement('li'));\n        }\n      }\n\n      // Removes an element from the list.\n\n    }, {\n      key: 'remove',\n      value: function remove() {\n        if (this.listEl) {\n          return this.listEl.removeChild(this.listEl.lastChild);\n        }\n      }\n\n      // Removes the event listener.\n\n    }, {\n      key: 'destroy',\n      value: function destroy() {\n        if (this.asList) {\n          return this.asList.removeEventListener(Util$3.events.mousedown, this.setIndex, true);\n        }\n      }\n    }]);\n    return List;\n  }();\n\n  Object.defineProperties(List.prototype, {\n    index: {\n      get: function get$$1() {\n        return this._index;\n      },\n      set: function set$$1(value) {\n        this._index = value;\n        return this.setActive();\n      }\n    }\n  });\n\n  return List;\n}.call(undefined);\n\nvar Arrows;\n\nvar Arrows$1 = Arrows = function () {\n  function Arrows(carousel, arrows, asArrows) {\n    classCallCheck(this, Arrows);\n\n    var nextArrow, prevArrow;\n    this.carousel = carousel;\n    this.asArrows = asArrows;\n    this.prev = this.carousel.prev.bind(this.carousel);\n    this.next = this.carousel.next.bind(this.carousel);\n    this.arrowEls = {};\n    if (arrows) {\n      prevArrow = this.arrowEls.prevArrow = document.createElement('div');\n      prevArrow.className = 'mc-arrow mc-prev-arrow';\n      prevArrow.innerHTML = '<svg width=\"50\" height=\"50\" viewBox=\"0 0 1792 1792\"><path d=\"M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z\"/></svg>';\n      this.carousel.el.appendChild(prevArrow);\n      prevArrow.addEventListener(Util$3.events.mousedown, this.prev, true);\n      nextArrow = this.arrowEls.nextArrow = document.createElement('div');\n      nextArrow.className = 'mc-arrow mc-next-arrow';\n      nextArrow.innerHTML = '<svg width=\"50\" height=\"50\" viewBox=\"0 0 1792 1792\"><path d=\"M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z\"/></svg>';\n      this.carousel.el.appendChild(nextArrow);\n      nextArrow.addEventListener(Util$3.events.mousedown, this.next, true);\n    }\n    if (this.asArrows.prevArrow) {\n      this.asArrows.prevArrow.addEventListener(Util$3.events.mousedown, this.prev, true);\n    }\n    if (this.asArrows.nextArrow) {\n      this.asArrows.nextArrow.addEventListener(Util$3.events.mousedown, this.next, true);\n    }\n  }\n\n  // Removes the event listeners.\n\n\n  createClass(Arrows, [{\n    key: 'destroy',\n    value: function destroy() {\n      if (this.asArrows.prevArrow) {\n        this.asArrows.prevArrow.removeEventListener(Util$3.events.mousedown, this.prev, true);\n      }\n      if (this.asArrows.nextArrow) {\n        return this.asArrows.nextArrow.removeEventListener(Util$3.events.mousedown, this.next, true);\n      }\n    }\n  }]);\n  return Arrows;\n}();\n\nvar defaultOptions = {\n  timing: 'ease',\n  duration: 800,\n  group: true,\n  minImage: 1,\n  maxImage: 1,\n  space: 0,\n  touchMove: true,\n  list: true,\n  arrows: true,\n  autoPlay: false,\n  autoPlaySpeed: 5000,\n  init: true\n};\n\nvar MarvinaCarousel;\n\nvar marvinaCarousel = MarvinaCarousel = function () {\n  // @params {Object} o\n  function MarvinaCarousel() {\n    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;\n    classCallCheck(this, MarvinaCarousel);\n\n    // dont install if runs on the server.\n    if (typeof window === 'undefined') {\n      return;\n    }\n    this.extractAttributes(o);\n    this.o = o;\n    if (!(this.el = Util$3.getElement(o.el))) {\n      throw new Error('Element could not be found');\n    }\n    // group\n    this.Group = this.group ? Group$1 : Solo$1;\n    this.resize = this.Group.resize.bind(this);\n    this.setCarouselAnimation = this.Group.setCarouselAnimation.bind(this);\n    this.addElement = this.Group.addElement.bind(this);\n    this.removeElement = this.Group.removeElement.bind(this);\n    if (this.init) {\n      this.initDOM();\n    }\n  }\n\n  // Inits slider with creating DOM.\n\n\n  createClass(MarvinaCarousel, [{\n    key: 'initDOM',\n    value: function initDOM() {\n      var c, e, elements, j, k, len, len1, wrapper;\n      this.el.classList.add('mc');\n      // elements & carousel\n      this.carouselEl = document.createElement('div');\n      this.carouselEl.classList.add('mc-carousel');\n      this.carouselEl.innerHTML = '<div class=\"mc-container\"></div>';\n      if (c = this.el.childNodes[0]) {\n        this.el.insertBefore(this.carouselEl, c);\n      } else {\n        this.el.appendChild(this.carouselEl);\n      }\n      this.container = this.carouselEl.querySelector('div');\n      elements = this.el.querySelectorAll('.mc-carousel-element');\n      this.elements = [];\n      if (this.group) {\n        wrapper = document.createElement('div');\n        wrapper.classList.add('mc-wrapper');\n        wrapper.style.marginRight = this.space + 'px';\n        this.container.appendChild(wrapper);\n        for (j = 0, len = elements.length; j < len; j++) {\n          e = elements[j];\n          e.style.marginRight = this.space + 'px';\n          wrapper.appendChild(e);\n          this.elements.push(e);\n        }\n      } else {\n        this.cloneElements = [];\n        for (k = 0, len1 = elements.length; k < len1; k++) {\n          e = elements[k];\n          e.style.marginRight = this.space + 'px';\n          this.container.appendChild(e);\n          this.elements.push(e);\n        }\n        this.totalIndex = this.elements.length;\n        this.index = 0;\n      }\n      this.total = this.elements.length;\n      this.resize();\n      this.initSettingsElements();\n      window.addEventListener('resize', this.resize, true);\n      return this.resize();\n    }\n\n    // Inits carousel without creating DOM.\n\n  }, {\n    key: 'initCarousel',\n    value: function initCarousel() {\n      this.carouselEl = this.el.querySelector('.mc-carousel');\n      this.container = this.carouselEl.querySelector('.mc-container');\n      this.total = this.totalIndex = this.carouselEl.querySelectorAll('.mc-carousel-element').length;\n      this.index = 0;\n      return this.initSettingsElements();\n    }\n\n    // Inits settings elements.\n\n  }, {\n    key: 'initSettingsElements',\n    value: function initSettingsElements() {\n      if (this.o.touchMove) {\n        // touchMove\n        this.touchMove = new TouchMove$1(this);\n      }\n      if (this.o.list || this.o.asList) {\n        // list / asList\n        this.list = new List$1(this, this.o.list, this.o.asList);\n      }\n      if (this.o.arrows || this.o.asPrevArrow || this.o.asNextArrow) {\n        // arrows / prevArrow / nextArrow\n        this.arrows = new Arrows$1(this, this.o.arrows, {\n          prevArrow: this.o.asPrevArrow,\n          nextArrow: this.o.asNextArrow\n        });\n      }\n\n      // auto playing\n      if (this.autoPlay) {\n        this.autoPlayStatus = true;\n        this.autoPlayContainer = document.createElement('div');\n        this.autoPlayContainer.className = 'mc-autoplay-container mc-active';\n        this.autoPlayContainer.innerHTML = ['<svg class=\"mc-play\" viewBox=\"0 0 48 48\"> \\t\\t\\t\\t\\t\\t<path d=\"M16 10v28l22-14z\"></path> \\t\\t\\t\\t\\t</svg>', '<svg class=\"mc-stop\" viewBox=\"0 0 512 512\"> \\t\\t\\t\\t\\t\\t<rect height=\"320\" width=\"60\" x=\"153\" y=\"96\"></rect><rect height=\"320\" width=\"60\" x=\"299\" y=\"96\"></rect> \\t\\t\\t\\t\\t</svg>'].join('');\n        this.autoPlayContainer.addEventListener(Util$3.events.mousedown, this.toggle.bind(this), true);\n        this.setAutoPlayInterval(false);\n        return this.el.appendChild(this.autoPlayContainer);\n      }\n    }\n\n    // Extracts attributes from default options.\n    // @params {Object} o\n\n  }, {\n    key: 'extractAttributes',\n    value: function extractAttributes(o) {\n      var attrsKey, j, key, len, results, value;\n      for (key in defaultOptions) {\n        value = defaultOptions[key];\n        if (o[key] == null) {\n          o[key] = value;\n        }\n      }\n      attrsKey = ['timing', 'duration', 'group', 'minImage', 'maxImage', 'minWidth', 'maxWidth', 'height', 'space', 'autoPlay', 'autoPlaySpeed', 'init'];\n      results = [];\n      for (j = 0, len = attrsKey.length; j < len; j++) {\n        key = attrsKey[j];\n        if (o[key] != null) {\n          results.push(this[key] = o[key]);\n        } else {\n          results.push(void 0);\n        }\n      }\n      return results;\n    }\n\n    // @params {HTMLElement} el\n    // @params {Number} index\n\n  }, {\n    key: 'addElementIterator',\n    value: /*#__PURE__*/regenerator.mark(function addElementIterator(el, index) {\n      return regenerator.wrap(function addElementIterator$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              el.classList.add('mc-carousel-element');\n              el.style.marginRight = this.space + 'px';\n              _context.next = 4;\n              return;\n\n            case 4:\n              this.total += 1;\n              this.elements.splice(index, 0, el);\n              return _context.abrupt('return', this.resize(true));\n\n            case 7:\n            case 'end':\n              return _context.stop();\n          }\n        }\n      }, addElementIterator, this);\n    })\n\n    // Adds a new element to the carousel.\n    // @params {String|HTMLElement} el\n    // @params {Number} index\n\n  }, {\n    key: 'add',\n    value: function add(el, index) {\n      var _this = this,\n          _arguments = arguments;\n\n      if ((el = Util$3.getElement(el)) && index > -1 && index <= this.total) {\n        if (!this.processing) {\n          return this.addElement(el, index);\n        } else {\n          return setTimeout(function () {\n            return _this.add.apply(_this, Array.prototype.slice.call(_arguments).concat([500]));\n          });\n        }\n      }\n    }\n\n    // Adds a new element to the head of the carousel.\n    // @params {String|HTMLElement} el\n\n  }, {\n    key: 'addFirst',\n    value: function addFirst(el) {\n      return this.add(el, 0);\n    }\n\n    // Adds a new element to the last of the carousel.\n    // @params {String|HTMLElement} el\n\n  }, {\n    key: 'addLast',\n    value: function addLast(el) {\n      return this.add(el, this.total);\n    }\n\n    // @params {Number} index\n\n  }, {\n    key: 'removeElementIterator',\n    value: /*#__PURE__*/regenerator.mark(function removeElementIterator(index) {\n      return regenerator.wrap(function removeElementIterator$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              this.elements[index].parentNode.removeChild(this.elements[index]);\n              _context2.next = 3;\n              return;\n\n            case 3:\n              this.total -= 1;\n              this.elements.splice(index, 1);\n              return _context2.abrupt('return', this.resize(true));\n\n            case 6:\n            case 'end':\n              return _context2.stop();\n          }\n        }\n      }, removeElementIterator, this);\n    })\n\n    // Removes the element at the specified index from the carousel.\n    // @params {Number} index\n\n  }, {\n    key: 'remove',\n    value: function remove(index) {\n      var _this2 = this,\n          _arguments2 = arguments;\n\n      if (index > -1 && index < this.total && this.total > 2) {\n        if (!this.processing) {\n          return this.removeElement(index);\n        } else {\n          return setTimeout(function () {\n            return _this2.remove.apply(_this2, Array.prototype.slice.call(_arguments2).concat([500]));\n          });\n        }\n      }\n    }\n\n    // Removes the first element from the carousel.\n\n  }, {\n    key: 'removeFirst',\n    value: function removeFirst() {\n      return this.remove(0);\n    }\n\n    // Removes the last element from the carousel.\n\n  }, {\n    key: 'removeLast',\n    value: function removeLast() {\n      return this.remove(this.total - 1);\n    }\n\n    // Triggers previous image. Returns false if the carousel is in animation.\n    // @returns {Promise<boolean>}\n\n  }, {\n    key: 'prev',\n    value: function prev() {\n      var _this3 = this;\n\n      return new Promise(function (resolve) {\n        if (!_this3.processing) {\n          return _this3.prevIndex().then(function (resp) {\n            return resolve(resp);\n          });\n        } else {\n          return resolve(false);\n        }\n      });\n    }\n\n    // @params {Boolean} touchMove\n    // @returns {Promise<boolean>}\n\n  }, {\n    key: 'prevIndex',\n    value: function prevIndex() {\n      var _this4 = this;\n\n      var touchMove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n\n      return new Promise(function (resolve) {\n        var index;\n        if ((!_this4.processing || touchMove) && _this4.totalIndex > 1) {\n          index = _this4.index - 1 >= 0 ? _this4.index - 1 : _this4.totalIndex - 1;\n          return _this4.setCarouselAnimation(index, false, false).then(function () {\n            return resolve(true);\n          });\n        } else {\n          return resolve(false);\n        }\n      });\n    }\n\n    // Triggers next image. Returns false if the carousel is in animation.\n    // @returns {Promise<boolean>}\n\n  }, {\n    key: 'next',\n    value: function next() {\n      var _this5 = this;\n\n      return new Promise(function (resolve) {\n        if (!_this5.processing) {\n          return _this5.nextIndex().then(function (resp) {\n            return resolve(resp);\n          });\n        } else {\n          return resolve(false);\n        }\n      });\n    }\n\n    // @params {Boolean} touchMove\n    // @params {Boolean} auto\n    // @returns {Promise<boolean>}\n\n  }, {\n    key: 'nextIndex',\n    value: function nextIndex() {\n      var _this6 = this;\n\n      var touchMove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n      var auto = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n\n      return new Promise(function (resolve) {\n        var index;\n        if ((!_this6.processing || touchMove) && _this6.totalIndex > 1) {\n          index = _this6.index + 1 < _this6.totalIndex ? _this6.index + 1 : 0;\n          return _this6.setCarouselAnimation(index, true, auto).then(function () {\n            return resolve(true);\n          });\n        } else {\n          return resolve(false);\n        }\n      });\n    }\n\n    // Starts autoplay.\n\n  }, {\n    key: 'play',\n    value: function play() {\n      if (!this.autoPlayStatus) {\n        this.autoPlayStatus = true;\n        this.autoPlayContainer.classList.add('mc-active');\n        this.setAutoPlayInterval();\n        return this.el.dispatchEvent(events.play);\n      }\n    }\n\n    // Stops autoplay.\n\n  }, {\n    key: 'stop',\n    value: function stop() {\n      if (this.autoPlayStatus) {\n        this.autoPlayStatus = false;\n        this.autoPlayContainer.classList.remove('mc-active');\n        clearInterval(this.autoPlayInterval);\n        return this.el.dispatchEvent(events.stop);\n      }\n    }\n\n    // Toggles autoplay.\n\n  }, {\n    key: 'toggle',\n    value: function toggle() {\n      if (this.autoPlayStatus) {\n        return this.stop();\n      } else {\n        return this.play();\n      }\n    }\n\n    // Destroys the carousel.\n\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      if (this.touchMove) {\n        this.touchMove.destroy();\n      }\n      if (this.list) {\n        this.list.destroy();\n      }\n      if (this.arrows) {\n        this.arrows.destroy();\n      }\n      if (this.autoPlay && this.autoPlayStatus) {\n        clearInterval(this.autoPlayInterval);\n      }\n      this.el.innerHTML = '';\n      this.el.classList.remove('mc');\n      return this.el.dispatchEvent(events.destroy);\n    }\n\n    // @params {Number} index\n    // @params {Boolean} next\n    // @params {Boolean} auto\n    // Sets animation\n\n  }, {\n    key: 'setCarouselAnimationIterator',\n    value: /*#__PURE__*/regenerator.mark(function setCarouselAnimationIterator(index, next) {\n      var auto = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n      var i, reverse, reverseNext;\n      return regenerator.wrap(function setCarouselAnimationIterator$(_context3) {\n        while (1) {\n          switch (_context3.prev = _context3.next) {\n            case 0:\n              this.processing = true;\n              i = this.index;\n              this.index = index;\n              if (this.list) {\n                this.list.index = index;\n              }\n              if (next && this.index === 0 && i + 1 === this.totalIndex || !next && this.index + 1 === this.totalIndex && i === 0) {\n                reverse = true;\n                reverseNext = this.index === 0;\n              } else {\n                reverse = false;\n              }\n              _context3.next = 7;\n              return { i: i, reverse: reverse, reverseNext: reverseNext };\n\n            case 7:\n              this.processing = false;\n              this.el.dispatchEvent(events.change);\n              if (this.autoPlay && this.autoPlayStatus && !auto) {\n                clearInterval(this.autoPlayInterval);\n                this.setAutoPlayInterval(false);\n              }\n              _context3.next = 12;\n              return;\n\n            case 12:\n              return _context3.abrupt('return', _context3.sent);\n\n            case 13:\n            case 'end':\n              return _context3.stop();\n          }\n        }\n      }, setCarouselAnimationIterator, this);\n    })\n  }, {\n    key: 'applyTransition',\n    value: function applyTransition() {\n      return ['-webkit-transition:-webkit-transform ' + this.duration + 'ms 0s ' + this.timing + ';', '-ms-transition:-ms-transform ' + this.duration + 'ms 0s ' + this.timing + ';', 'transition:transform ' + this.duration + 'ms 0s ' + this.timing + ';'].join('');\n    }\n\n    // Sets index, total index and image size\n    // @params {Boolean} skip\n\n  }, {\n    key: 'resizeIterator',\n    value: /*#__PURE__*/regenerator.mark(function resizeIterator() {\n      var skip = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n      var d, elHeight, elWidth, i, imageCount, j, m, ref, totalIndex;\n      return regenerator.wrap(function resizeIterator$(_context4) {\n        while (1) {\n          switch (_context4.prev = _context4.next) {\n            case 0:\n              if (this.processing) {\n                _context4.next = 27;\n                break;\n              }\n\n              elWidth = this.carouselEl.offsetWidth;\n\n              if (!(elWidth === this.elWidth && skip !== true)) {\n                _context4.next = 4;\n                break;\n              }\n\n              return _context4.abrupt('return');\n\n            case 4:\n              this.elWidth = elWidth;\n              this.processing = true;\n              imageCount = this.maxImage;\n\n            case 7:\n\n              this.width = (this.elWidth - this.space * (imageCount - 1)) / imageCount;\n\n              if (!(this.minWidth && this.width < this.minWidth)) {\n                _context4.next = 13;\n                break;\n              }\n\n              imageCount -= 1;\n              _context4.next = 14;\n              break;\n\n            case 13:\n              return _context4.abrupt('break', 16);\n\n            case 14:\n              _context4.next = 7;\n              break;\n\n            case 16:\n              if (this.minImage > imageCount) {\n                imageCount = this.minImage;\n              }\n              this.width = (this.elWidth - this.space * (imageCount - 1)) / imageCount;\n              if (this.maxWidth && this.width > this.maxWidth) {\n                this.width = this.maxWidth;\n              }\n              if (this.height) {\n                elHeight = this.width * this.height / 100;\n                this.carouselEl.style.height = elHeight + 'px';\n                if (elHeight !== this.elHeight) {\n                  this.elHeight = elHeight;\n                  this.resize();\n                }\n              }\n              totalIndex = this.totalIndex;\n              _context4.next = 23;\n              return { imageCount: imageCount };\n\n            case 23:\n              if (this.totalIndex !== totalIndex) {\n                if (this.list) {\n                  m = this.totalIndex > totalIndex ? this.list.add.bind(this.list) : this.list.remove.bind(this.list);\n                  d = Math.abs(this.totalIndex - totalIndex);\n                  for (i = j = 1, ref = d; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {\n                    m();\n                  }\n                  this.list.index = this.index;\n                }\n                this.el.dispatchEvent(events.totalIndex);\n              }\n              return _context4.abrupt('return', this.processing = false);\n\n            case 27:\n              if (this.processingTimeout) {\n                clearTimeout(this.processingTimeout);\n              }\n              return _context4.abrupt('return', this.processingTimeout = setTimeout(this.resize, 500));\n\n            case 29:\n            case 'end':\n              return _context4.stop();\n          }\n        }\n      }, resizeIterator, this);\n    })\n\n    // Calculates resize values.\n    // @param {Number} total\n\n  }, {\n    key: 'calculateResize',\n    value: function calculateResize(total) {\n      var $, iterator;\n      iterator = this.resizeIterator(true);\n      $ = iterator.next();\n      if (!$.done) {\n        $ = $.value;\n        this.imageCount = $.imageCount;\n      }\n      if (this.group) {\n        this.Group.setTotalIndex.call(this, this.imageCount);\n      } else {\n        this.total = this.totalIndex = total;\n        this.container.setAttribute('style', Util$3.setCSSPrefix('transform:translateX(-' + (this.index * this.width + this.index * this.space) + 'px)'));\n      }\n      return iterator.next();\n    }\n\n    // @returns {Number}\n\n  }, {\n    key: 'getIndex',\n    value: function getIndex() {\n      return this.index;\n    }\n\n    // @params {Number} index\n    // @returns {Promise<boolean>}\n\n  }, {\n    key: 'setIndex',\n    value: function setIndex(index) {\n      var _this7 = this;\n\n      return new Promise(function (resolve) {\n        var next;\n        if (!_this7.processing) {\n          if (index > -1 && index < _this7.totalIndex && index !== _this7.index) {\n            next = index > _this7.index;\n            return _this7.setCarouselAnimation(index, next).then(function () {\n              return resolve(true);\n            });\n          } else {\n            return resolve(false);\n          }\n        } else {\n          return resolve(false);\n        }\n      });\n    }\n\n    // @returns {Number}\n\n  }, {\n    key: 'getTotal',\n    value: function getTotal() {\n      return this.total;\n    }\n\n    // @returns {Number}\n\n  }, {\n    key: 'getTotalIndex',\n    value: function getTotalIndex() {\n      return this.totalIndex;\n    }\n\n    // @returns {String}\n\n  }, {\n    key: 'getTiming',\n    value: function getTiming() {\n      return this.timing;\n    }\n\n    // @params {Number} timing\n\n  }, {\n    key: 'setTiming',\n    value: function setTiming(timing) {\n      this.timing = timing;\n    }\n\n    // @returns {Number}\n\n  }, {\n    key: 'getDuration',\n    value: function getDuration() {\n      return this.duration;\n    }\n\n    // @params {Number} duration\n\n  }, {\n    key: 'setDuration',\n    value: function setDuration(duration1) {\n      this.duration = duration1;\n    }\n\n    // @returns {Number}\n\n  }, {\n    key: 'getAutoPlaySpeed',\n    value: function getAutoPlaySpeed() {\n      return this.autoPlaySpeed;\n    }\n\n    // @params {Number} speed\n\n  }, {\n    key: 'setAutoPlaySpeed',\n    value: function setAutoPlaySpeed(autoPlaySpeed) {\n      this.autoPlaySpeed = autoPlaySpeed;\n    }\n\n    // @params {Number} duration\n\n  }, {\n    key: 'setAutoPlayInterval',\n    value: function setAutoPlayInterval() {\n      var _this8 = this;\n\n      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n\n      var speed;\n      speed = !duration ? this.autoPlaySpeed : this.autoPlaySpeed + this.duration;\n      return this.autoPlayInterval = setInterval(function () {\n        return _this8.nextIndex(false, true);\n      }, speed);\n    }\n  }]);\n  return MarvinaCarousel;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (marvinaCarousel);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\"), __webpack_require__(/*! ./../../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/marvina-carousel/dist/js/marvina-carousel.esm.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Copyright (c) 2014-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nvar runtime = (function (exports) {\n  \"use strict\";\n\n  var Op = Object.prototype;\n  var hasOwn = Op.hasOwnProperty;\n  var undefined; // More compressible than void 0.\n  var $Symbol = typeof Symbol === \"function\" ? Symbol : {};\n  var iteratorSymbol = $Symbol.iterator || \"@@iterator\";\n  var asyncIteratorSymbol = $Symbol.asyncIterator || \"@@asyncIterator\";\n  var toStringTagSymbol = $Symbol.toStringTag || \"@@toStringTag\";\n\n  function wrap(innerFn, outerFn, self, tryLocsList) {\n    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.\n    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;\n    var generator = Object.create(protoGenerator.prototype);\n    var context = new Context(tryLocsList || []);\n\n    // The ._invoke method unifies the implementations of the .next,\n    // .throw, and .return methods.\n    generator._invoke = makeInvokeMethod(innerFn, self, context);\n\n    return generator;\n  }\n  exports.wrap = wrap;\n\n  // Try/catch helper to minimize deoptimizations. Returns a completion\n  // record like context.tryEntries[i].completion. This interface could\n  // have been (and was previously) designed to take a closure to be\n  // invoked without arguments, but in all the cases we care about we\n  // already have an existing method we want to call, so there's no need\n  // to create a new function object. We can even get away with assuming\n  // the method takes exactly one argument, since that happens to be true\n  // in every case, so we don't have to touch the arguments object. The\n  // only additional allocation required is the completion record, which\n  // has a stable shape and so hopefully should be cheap to allocate.\n  function tryCatch(fn, obj, arg) {\n    try {\n      return { type: \"normal\", arg: fn.call(obj, arg) };\n    } catch (err) {\n      return { type: \"throw\", arg: err };\n    }\n  }\n\n  var GenStateSuspendedStart = \"suspendedStart\";\n  var GenStateSuspendedYield = \"suspendedYield\";\n  var GenStateExecuting = \"executing\";\n  var GenStateCompleted = \"completed\";\n\n  // Returning this object from the innerFn has the same effect as\n  // breaking out of the dispatch switch statement.\n  var ContinueSentinel = {};\n\n  // Dummy constructor functions that we use as the .constructor and\n  // .constructor.prototype properties for functions that return Generator\n  // objects. For full spec compliance, you may wish to configure your\n  // minifier not to mangle the names of these two functions.\n  function Generator() {}\n  function GeneratorFunction() {}\n  function GeneratorFunctionPrototype() {}\n\n  // This is a polyfill for %IteratorPrototype% for environments that\n  // don't natively support it.\n  var IteratorPrototype = {};\n  IteratorPrototype[iteratorSymbol] = function () {\n    return this;\n  };\n\n  var getProto = Object.getPrototypeOf;\n  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));\n  if (NativeIteratorPrototype &&\n      NativeIteratorPrototype !== Op &&\n      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {\n    // This environment has a native %IteratorPrototype%; use it instead\n    // of the polyfill.\n    IteratorPrototype = NativeIteratorPrototype;\n  }\n\n  var Gp = GeneratorFunctionPrototype.prototype =\n    Generator.prototype = Object.create(IteratorPrototype);\n  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;\n  GeneratorFunctionPrototype.constructor = GeneratorFunction;\n  GeneratorFunctionPrototype[toStringTagSymbol] =\n    GeneratorFunction.displayName = \"GeneratorFunction\";\n\n  // Helper for defining the .next, .throw, and .return methods of the\n  // Iterator interface in terms of a single ._invoke method.\n  function defineIteratorMethods(prototype) {\n    [\"next\", \"throw\", \"return\"].forEach(function(method) {\n      prototype[method] = function(arg) {\n        return this._invoke(method, arg);\n      };\n    });\n  }\n\n  exports.isGeneratorFunction = function(genFun) {\n    var ctor = typeof genFun === \"function\" && genFun.constructor;\n    return ctor\n      ? ctor === GeneratorFunction ||\n        // For the native GeneratorFunction constructor, the best we can\n        // do is to check its .name property.\n        (ctor.displayName || ctor.name) === \"GeneratorFunction\"\n      : false;\n  };\n\n  exports.mark = function(genFun) {\n    if (Object.setPrototypeOf) {\n      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);\n    } else {\n      genFun.__proto__ = GeneratorFunctionPrototype;\n      if (!(toStringTagSymbol in genFun)) {\n        genFun[toStringTagSymbol] = \"GeneratorFunction\";\n      }\n    }\n    genFun.prototype = Object.create(Gp);\n    return genFun;\n  };\n\n  // Within the body of any async function, `await x` is transformed to\n  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test\n  // `hasOwn.call(value, \"__await\")` to determine if the yielded value is\n  // meant to be awaited.\n  exports.awrap = function(arg) {\n    return { __await: arg };\n  };\n\n  function AsyncIterator(generator) {\n    function invoke(method, arg, resolve, reject) {\n      var record = tryCatch(generator[method], generator, arg);\n      if (record.type === \"throw\") {\n        reject(record.arg);\n      } else {\n        var result = record.arg;\n        var value = result.value;\n        if (value &&\n            typeof value === \"object\" &&\n            hasOwn.call(value, \"__await\")) {\n          return Promise.resolve(value.__await).then(function(value) {\n            invoke(\"next\", value, resolve, reject);\n          }, function(err) {\n            invoke(\"throw\", err, resolve, reject);\n          });\n        }\n\n        return Promise.resolve(value).then(function(unwrapped) {\n          // When a yielded Promise is resolved, its final value becomes\n          // the .value of the Promise<{value,done}> result for the\n          // current iteration.\n          result.value = unwrapped;\n          resolve(result);\n        }, function(error) {\n          // If a rejected Promise was yielded, throw the rejection back\n          // into the async generator function so it can be handled there.\n          return invoke(\"throw\", error, resolve, reject);\n        });\n      }\n    }\n\n    var previousPromise;\n\n    function enqueue(method, arg) {\n      function callInvokeWithMethodAndArg() {\n        return new Promise(function(resolve, reject) {\n          invoke(method, arg, resolve, reject);\n        });\n      }\n\n      return previousPromise =\n        // If enqueue has been called before, then we want to wait until\n        // all previous Promises have been resolved before calling invoke,\n        // so that results are always delivered in the correct order. If\n        // enqueue has not been called before, then it is important to\n        // call invoke immediately, without waiting on a callback to fire,\n        // so that the async generator function has the opportunity to do\n        // any necessary setup in a predictable way. This predictability\n        // is why the Promise constructor synchronously invokes its\n        // executor callback, and why async functions synchronously\n        // execute code before the first await. Since we implement simple\n        // async functions in terms of async generators, it is especially\n        // important to get this right, even though it requires care.\n        previousPromise ? previousPromise.then(\n          callInvokeWithMethodAndArg,\n          // Avoid propagating failures to Promises returned by later\n          // invocations of the iterator.\n          callInvokeWithMethodAndArg\n        ) : callInvokeWithMethodAndArg();\n    }\n\n    // Define the unified helper method that is used to implement .next,\n    // .throw, and .return (see defineIteratorMethods).\n    this._invoke = enqueue;\n  }\n\n  defineIteratorMethods(AsyncIterator.prototype);\n  AsyncIterator.prototype[asyncIteratorSymbol] = function () {\n    return this;\n  };\n  exports.AsyncIterator = AsyncIterator;\n\n  // Note that simple async functions are implemented on top of\n  // AsyncIterator objects; they just return a Promise for the value of\n  // the final result produced by the iterator.\n  exports.async = function(innerFn, outerFn, self, tryLocsList) {\n    var iter = new AsyncIterator(\n      wrap(innerFn, outerFn, self, tryLocsList)\n    );\n\n    return exports.isGeneratorFunction(outerFn)\n      ? iter // If outerFn is a generator, return the full iterator.\n      : iter.next().then(function(result) {\n          return result.done ? result.value : iter.next();\n        });\n  };\n\n  function makeInvokeMethod(innerFn, self, context) {\n    var state = GenStateSuspendedStart;\n\n    return function invoke(method, arg) {\n      if (state === GenStateExecuting) {\n        throw new Error(\"Generator is already running\");\n      }\n\n      if (state === GenStateCompleted) {\n        if (method === \"throw\") {\n          throw arg;\n        }\n\n        // Be forgiving, per 25.3.3.3.3 of the spec:\n        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume\n        return doneResult();\n      }\n\n      context.method = method;\n      context.arg = arg;\n\n      while (true) {\n        var delegate = context.delegate;\n        if (delegate) {\n          var delegateResult = maybeInvokeDelegate(delegate, context);\n          if (delegateResult) {\n            if (delegateResult === ContinueSentinel) continue;\n            return delegateResult;\n          }\n        }\n\n        if (context.method === \"next\") {\n          // Setting context._sent for legacy support of Babel's\n          // function.sent implementation.\n          context.sent = context._sent = context.arg;\n\n        } else if (context.method === \"throw\") {\n          if (state === GenStateSuspendedStart) {\n            state = GenStateCompleted;\n            throw context.arg;\n          }\n\n          context.dispatchException(context.arg);\n\n        } else if (context.method === \"return\") {\n          context.abrupt(\"return\", context.arg);\n        }\n\n        state = GenStateExecuting;\n\n        var record = tryCatch(innerFn, self, context);\n        if (record.type === \"normal\") {\n          // If an exception is thrown from innerFn, we leave state ===\n          // GenStateExecuting and loop back for another invocation.\n          state = context.done\n            ? GenStateCompleted\n            : GenStateSuspendedYield;\n\n          if (record.arg === ContinueSentinel) {\n            continue;\n          }\n\n          return {\n            value: record.arg,\n            done: context.done\n          };\n\n        } else if (record.type === \"throw\") {\n          state = GenStateCompleted;\n          // Dispatch the exception by looping back around to the\n          // context.dispatchException(context.arg) call above.\n          context.method = \"throw\";\n          context.arg = record.arg;\n        }\n      }\n    };\n  }\n\n  // Call delegate.iterator[context.method](context.arg) and handle the\n  // result, either by returning a { value, done } result from the\n  // delegate iterator, or by modifying context.method and context.arg,\n  // setting context.delegate to null, and returning the ContinueSentinel.\n  function maybeInvokeDelegate(delegate, context) {\n    var method = delegate.iterator[context.method];\n    if (method === undefined) {\n      // A .throw or .return when the delegate iterator has no .throw\n      // method always terminates the yield* loop.\n      context.delegate = null;\n\n      if (context.method === \"throw\") {\n        // Note: [\"return\"] must be used for ES3 parsing compatibility.\n        if (delegate.iterator[\"return\"]) {\n          // If the delegate iterator has a return method, give it a\n          // chance to clean up.\n          context.method = \"return\";\n          context.arg = undefined;\n          maybeInvokeDelegate(delegate, context);\n\n          if (context.method === \"throw\") {\n            // If maybeInvokeDelegate(context) changed context.method from\n            // \"return\" to \"throw\", let that override the TypeError below.\n            return ContinueSentinel;\n          }\n        }\n\n        context.method = \"throw\";\n        context.arg = new TypeError(\n          \"The iterator does not provide a 'throw' method\");\n      }\n\n      return ContinueSentinel;\n    }\n\n    var record = tryCatch(method, delegate.iterator, context.arg);\n\n    if (record.type === \"throw\") {\n      context.method = \"throw\";\n      context.arg = record.arg;\n      context.delegate = null;\n      return ContinueSentinel;\n    }\n\n    var info = record.arg;\n\n    if (! info) {\n      context.method = \"throw\";\n      context.arg = new TypeError(\"iterator result is not an object\");\n      context.delegate = null;\n      return ContinueSentinel;\n    }\n\n    if (info.done) {\n      // Assign the result of the finished delegate to the temporary\n      // variable specified by delegate.resultName (see delegateYield).\n      context[delegate.resultName] = info.value;\n\n      // Resume execution at the desired location (see delegateYield).\n      context.next = delegate.nextLoc;\n\n      // If context.method was \"throw\" but the delegate handled the\n      // exception, let the outer generator proceed normally. If\n      // context.method was \"next\", forget context.arg since it has been\n      // \"consumed\" by the delegate iterator. If context.method was\n      // \"return\", allow the original .return call to continue in the\n      // outer generator.\n      if (context.method !== \"return\") {\n        context.method = \"next\";\n        context.arg = undefined;\n      }\n\n    } else {\n      // Re-yield the result returned by the delegate method.\n      return info;\n    }\n\n    // The delegate iterator is finished, so forget it and continue with\n    // the outer generator.\n    context.delegate = null;\n    return ContinueSentinel;\n  }\n\n  // Define Generator.prototype.{next,throw,return} in terms of the\n  // unified ._invoke helper method.\n  defineIteratorMethods(Gp);\n\n  Gp[toStringTagSymbol] = \"Generator\";\n\n  // A Generator should always return itself as the iterator object when the\n  // @@iterator function is called on it. Some browsers' implementations of the\n  // iterator prototype chain incorrectly implement this, causing the Generator\n  // object to not be returned from this call. This ensures that doesn't happen.\n  // See https://github.com/facebook/regenerator/issues/274 for more details.\n  Gp[iteratorSymbol] = function() {\n    return this;\n  };\n\n  Gp.toString = function() {\n    return \"[object Generator]\";\n  };\n\n  function pushTryEntry(locs) {\n    var entry = { tryLoc: locs[0] };\n\n    if (1 in locs) {\n      entry.catchLoc = locs[1];\n    }\n\n    if (2 in locs) {\n      entry.finallyLoc = locs[2];\n      entry.afterLoc = locs[3];\n    }\n\n    this.tryEntries.push(entry);\n  }\n\n  function resetTryEntry(entry) {\n    var record = entry.completion || {};\n    record.type = \"normal\";\n    delete record.arg;\n    entry.completion = record;\n  }\n\n  function Context(tryLocsList) {\n    // The root entry object (effectively a try statement without a catch\n    // or a finally block) gives us a place to store values thrown from\n    // locations where there is no enclosing try statement.\n    this.tryEntries = [{ tryLoc: \"root\" }];\n    tryLocsList.forEach(pushTryEntry, this);\n    this.reset(true);\n  }\n\n  exports.keys = function(object) {\n    var keys = [];\n    for (var key in object) {\n      keys.push(key);\n    }\n    keys.reverse();\n\n    // Rather than returning an object with a next method, we keep\n    // things simple and return the next function itself.\n    return function next() {\n      while (keys.length) {\n        var key = keys.pop();\n        if (key in object) {\n          next.value = key;\n          next.done = false;\n          return next;\n        }\n      }\n\n      // To avoid creating an additional object, we just hang the .value\n      // and .done properties off the next function object itself. This\n      // also ensures that the minifier will not anonymize the function.\n      next.done = true;\n      return next;\n    };\n  };\n\n  function values(iterable) {\n    if (iterable) {\n      var iteratorMethod = iterable[iteratorSymbol];\n      if (iteratorMethod) {\n        return iteratorMethod.call(iterable);\n      }\n\n      if (typeof iterable.next === \"function\") {\n        return iterable;\n      }\n\n      if (!isNaN(iterable.length)) {\n        var i = -1, next = function next() {\n          while (++i < iterable.length) {\n            if (hasOwn.call(iterable, i)) {\n              next.value = iterable[i];\n              next.done = false;\n              return next;\n            }\n          }\n\n          next.value = undefined;\n          next.done = true;\n\n          return next;\n        };\n\n        return next.next = next;\n      }\n    }\n\n    // Return an iterator with no values.\n    return { next: doneResult };\n  }\n  exports.values = values;\n\n  function doneResult() {\n    return { value: undefined, done: true };\n  }\n\n  Context.prototype = {\n    constructor: Context,\n\n    reset: function(skipTempReset) {\n      this.prev = 0;\n      this.next = 0;\n      // Resetting context._sent for legacy support of Babel's\n      // function.sent implementation.\n      this.sent = this._sent = undefined;\n      this.done = false;\n      this.delegate = null;\n\n      this.method = \"next\";\n      this.arg = undefined;\n\n      this.tryEntries.forEach(resetTryEntry);\n\n      if (!skipTempReset) {\n        for (var name in this) {\n          // Not sure about the optimal order of these conditions:\n          if (name.charAt(0) === \"t\" &&\n              hasOwn.call(this, name) &&\n              !isNaN(+name.slice(1))) {\n            this[name] = undefined;\n          }\n        }\n      }\n    },\n\n    stop: function() {\n      this.done = true;\n\n      var rootEntry = this.tryEntries[0];\n      var rootRecord = rootEntry.completion;\n      if (rootRecord.type === \"throw\") {\n        throw rootRecord.arg;\n      }\n\n      return this.rval;\n    },\n\n    dispatchException: function(exception) {\n      if (this.done) {\n        throw exception;\n      }\n\n      var context = this;\n      function handle(loc, caught) {\n        record.type = \"throw\";\n        record.arg = exception;\n        context.next = loc;\n\n        if (caught) {\n          // If the dispatched exception was caught by a catch block,\n          // then let that catch block handle the exception normally.\n          context.method = \"next\";\n          context.arg = undefined;\n        }\n\n        return !! caught;\n      }\n\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        var record = entry.completion;\n\n        if (entry.tryLoc === \"root\") {\n          // Exception thrown outside of any try block that could handle\n          // it, so set the completion value of the entire function to\n          // throw the exception.\n          return handle(\"end\");\n        }\n\n        if (entry.tryLoc <= this.prev) {\n          var hasCatch = hasOwn.call(entry, \"catchLoc\");\n          var hasFinally = hasOwn.call(entry, \"finallyLoc\");\n\n          if (hasCatch && hasFinally) {\n            if (this.prev < entry.catchLoc) {\n              return handle(entry.catchLoc, true);\n            } else if (this.prev < entry.finallyLoc) {\n              return handle(entry.finallyLoc);\n            }\n\n          } else if (hasCatch) {\n            if (this.prev < entry.catchLoc) {\n              return handle(entry.catchLoc, true);\n            }\n\n          } else if (hasFinally) {\n            if (this.prev < entry.finallyLoc) {\n              return handle(entry.finallyLoc);\n            }\n\n          } else {\n            throw new Error(\"try statement without catch or finally\");\n          }\n        }\n      }\n    },\n\n    abrupt: function(type, arg) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        if (entry.tryLoc <= this.prev &&\n            hasOwn.call(entry, \"finallyLoc\") &&\n            this.prev < entry.finallyLoc) {\n          var finallyEntry = entry;\n          break;\n        }\n      }\n\n      if (finallyEntry &&\n          (type === \"break\" ||\n           type === \"continue\") &&\n          finallyEntry.tryLoc <= arg &&\n          arg <= finallyEntry.finallyLoc) {\n        // Ignore the finally entry if control is not jumping to a\n        // location outside the try/catch block.\n        finallyEntry = null;\n      }\n\n      var record = finallyEntry ? finallyEntry.completion : {};\n      record.type = type;\n      record.arg = arg;\n\n      if (finallyEntry) {\n        this.method = \"next\";\n        this.next = finallyEntry.finallyLoc;\n        return ContinueSentinel;\n      }\n\n      return this.complete(record);\n    },\n\n    complete: function(record, afterLoc) {\n      if (record.type === \"throw\") {\n        throw record.arg;\n      }\n\n      if (record.type === \"break\" ||\n          record.type === \"continue\") {\n        this.next = record.arg;\n      } else if (record.type === \"return\") {\n        this.rval = this.arg = record.arg;\n        this.method = \"return\";\n        this.next = \"end\";\n      } else if (record.type === \"normal\" && afterLoc) {\n        this.next = afterLoc;\n      }\n\n      return ContinueSentinel;\n    },\n\n    finish: function(finallyLoc) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        if (entry.finallyLoc === finallyLoc) {\n          this.complete(entry.completion, entry.afterLoc);\n          resetTryEntry(entry);\n          return ContinueSentinel;\n        }\n      }\n    },\n\n    \"catch\": function(tryLoc) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        if (entry.tryLoc === tryLoc) {\n          var record = entry.completion;\n          if (record.type === \"throw\") {\n            var thrown = record.arg;\n            resetTryEntry(entry);\n          }\n          return thrown;\n        }\n      }\n\n      // The context.catch method must only be called with a location\n      // argument that corresponds to a known catch block.\n      throw new Error(\"illegal catch attempt\");\n    },\n\n    delegateYield: function(iterable, resultName, nextLoc) {\n      this.delegate = {\n        iterator: values(iterable),\n        resultName: resultName,\n        nextLoc: nextLoc\n      };\n\n      if (this.method === \"next\") {\n        // Deliberately forget the last sent value so that we don't\n        // accidentally pass it on to the delegate.\n        this.arg = undefined;\n      }\n\n      return ContinueSentinel;\n    }\n  };\n\n  // Regardless of whether this script is executing as a CommonJS module\n  // or not, return the runtime object so that we can declare the variable\n  // regeneratorRuntime in the outer scope, which allows this module to be\n  // injected easily by `bin/regenerator --include-runtime script.js`.\n  return exports;\n\n}(\n  // If this script is executing as a CommonJS module, use module.exports\n  // as the regeneratorRuntime namespace. Otherwise create a new empty\n  // object. Either way, the resulting object will be used to initialize\n  // the regeneratorRuntime variable at the top of this file.\n   true ? module.exports : undefined\n));\n\ntry {\n  regeneratorRuntime = runtime;\n} catch (accidentalStrictMode) {\n  // This module should not be running in strict mode, so the above\n  // assignment should always work unless something is misconfigured. Just\n  // in case runtime.js accidentally runs in strict mode, we can escape\n  // strict mode using a global Function call. This could conceivably fail\n  // if a Content Security Policy forbids using Function, but in that case\n  // the proper solution is to fix the accidental strict mode problem. If\n  // you've misconfigured your bundler to force strict mode and applied a\n  // CSP to forbid Function, and you're not willing to fix either of those\n  // problems, please detail your unique predicament in a GitHub issue.\n  Function(\"r\", \"regeneratorRuntime = r\")(runtime);\n}\n\n\n//# sourceURL=webpack:///./node_modules/regenerator-runtime/runtime.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar stylesInDom = {};\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nfunction listToStyles(list, options) {\n  var styles = [];\n  var newStyles = {};\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var css = item[1];\n    var media = item[2];\n    var sourceMap = item[3];\n    var part = {\n      css: css,\n      media: media,\n      sourceMap: sourceMap\n    };\n\n    if (!newStyles[id]) {\n      styles.push(newStyles[id] = {\n        id: id,\n        parts: [part]\n      });\n    } else {\n      newStyles[id].parts.push(part);\n    }\n  }\n\n  return styles;\n}\n\nfunction addStylesToDom(styles, options) {\n  for (var i = 0; i < styles.length; i++) {\n    var item = styles[i];\n    var domStyle = stylesInDom[item.id];\n    var j = 0;\n\n    if (domStyle) {\n      domStyle.refs++;\n\n      for (; j < domStyle.parts.length; j++) {\n        domStyle.parts[j](item.parts[j]);\n      }\n\n      for (; j < item.parts.length; j++) {\n        domStyle.parts.push(addStyle(item.parts[j], options));\n      }\n    } else {\n      var parts = [];\n\n      for (; j < item.parts.length; j++) {\n        parts.push(addStyle(item.parts[j], options));\n      }\n\n      stylesInDom[item.id] = {\n        id: item.id,\n        refs: 1,\n        parts: parts\n      };\n    }\n  }\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n\n  if (typeof options.attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      options.attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(options.attributes).forEach(function (key) {\n    style.setAttribute(key, options.attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  var styles = listToStyles(list, options);\n  addStylesToDom(styles, options);\n  return function update(newList) {\n    var mayRemove = [];\n\n    for (var i = 0; i < styles.length; i++) {\n      var item = styles[i];\n      var domStyle = stylesInDom[item.id];\n\n      if (domStyle) {\n        domStyle.refs--;\n        mayRemove.push(domStyle);\n      }\n    }\n\n    if (newList) {\n      var newStyles = listToStyles(newList, options);\n      addStylesToDom(newStyles, options);\n    }\n\n    for (var _i = 0; _i < mayRemove.length; _i++) {\n      var _domStyle = mayRemove[_i];\n\n      if (_domStyle.refs === 0) {\n        for (var j = 0; j < _domStyle.parts.length; j++) {\n          _domStyle.parts[j]();\n        }\n\n        delete stylesInDom[_domStyle.id];\n      }\n    }\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/client.js":
/*!****************************************!*\
  !*** (webpack)-plugin-serve/client.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\n\n/**\n * @note This file exists merely as an easy reference for folks adding it to their configuration entries\n */\n\n(() => {\n  /* eslint-disable global-require */\n  const { run } = __webpack_require__(/*! ./lib/client/client */ \"./node_modules/webpack-plugin-serve/lib/client/client.js\");\n  let hash = '<unknown>';\n  let options;\n  try {\n    options = {\"compress\":null,\"headers\":null,\"historyFallback\":false,\"hmr\":true,\"host\":\"localhost\",\"liveReload\":true,\"log\":{\"level\":\"info\",\"prefix\":{\"template\":\"{{level}}\"},\"name\":\"webpack-plugin-serve\"},\"open\":true,\"port\":3001,\"progress\":true,\"ramdisk\":false,\"secure\":false,\"static\":[\"/Users/MacMini/ISIAT/WEBS/CLIENTES/NATACHA-CLIENTES/TALLER/Ejercicios/DogsJS\"],\"status\":true,\"address\":\"localhost:3001\",\"compilerName\":null,\"wpsId\":\"db438ee\"};\n  } catch (e) {\n    const { log } = __webpack_require__(/*! ./lib/client/log */ \"./node_modules/webpack-plugin-serve/lib/client/log.js\");\n    log.error(\n      'The entry for webpack-plugin-serve was included in your build, but it does not appear that the plugin was. Please check your configuration.'\n    );\n  }\n\n  try {\n    // eslint-disable-next-line camelcase\n    hash = __webpack_require__.h();\n  } catch (e) {} // eslint-disable-line no-empty\n\n  run(hash, options);\n})();\n\n\n//# sourceURL=webpack:///(webpack)-plugin-serve/client.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/ClientSocket.js":
/*!*********************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/ClientSocket.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { error, refresh, warn } = __webpack_require__(/*! ./log */ \"./node_modules/webpack-plugin-serve/lib/client/log.js\")();\n\n// ignore 1008 (HTTP 400 equivalent) and 1011 (HTTP 500 equivalent)\nconst ignoreCodes = [1008, 1011];\nconst maxAttempts = 10;\n\nclass ClientSocket {\n  constructor(options, ...args) {\n    this.args = args;\n    this.attempts = 0;\n    this.eventHandlers = [];\n    this.options = options;\n    this.retrying = false;\n\n    this.connect();\n  }\n\n  addEventListener(...args) {\n    this.eventHandlers.push(args);\n    this.socket.addEventListener(...args);\n  }\n\n  close() {\n    this.socket.close();\n  }\n\n  connect() {\n    if (this.socket) {\n      delete this.socket;\n    }\n\n    this.connecting = true;\n\n    this.socket = new WebSocket(...this.args);\n\n    if (this.options.retry) {\n      this.socket.addEventListener('close', (event) => {\n        if (ignoreCodes.includes(event.code)) {\n          return;\n        }\n\n        if (!this.retrying) {\n          warn(`The WebSocket was closed and will attempt to reconnect`);\n        }\n\n        this.reconnect();\n      });\n    } else {\n      this.socket.onclose = () => warn(`The client WebSocket was closed. ${refresh}`);\n    }\n\n    this.socket.addEventListener('open', () => {\n      this.attempts = 0;\n      this.retrying = false;\n    });\n\n    if (this.eventHandlers.length) {\n      for (const [name, fn] of this.eventHandlers) {\n        this.socket.addEventListener(name, fn);\n      }\n    }\n  }\n\n  reconnect() {\n    this.attempts += 1;\n    this.retrying = true;\n\n    if (this.attempts > maxAttempts) {\n      error(`The WebSocket could not be reconnected. ${refresh}`);\n      this.retrying = false;\n      return;\n    }\n\n    const timeout = 1000 * this.attempts ** 2;\n\n    setTimeout(() => this.connect(this.args), timeout);\n  }\n\n  removeEventListener(...args) {\n    const [, handler] = args;\n    this.eventHandlers = this.eventHandlers.filter(([, fn]) => fn === handler);\n    this.socket.removeEventListener(...args);\n  }\n}\n\nmodule.exports = { ClientSocket };\n\n\n//# sourceURL=webpack:///(webpack)-plugin-serve/lib/client/ClientSocket.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/client.js":
/*!***************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/client.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\n/* eslint-disable global-require */\nconst run = (buildHash, options) => {\n  const { address, client = {}, progress, secure, status } = options;\n\n  options.firstInstance = !window.webpackPluginServe; // eslint-disable-line no-param-reassign\n\n  window.webpackPluginServe = window.webpackPluginServe || {\n    compilers: {}\n  };\n  window.webpackPluginServe.silent = !!client.silent;\n\n  const { ClientSocket } = __webpack_require__(/*! ./ClientSocket */ \"./node_modules/webpack-plugin-serve/lib/client/ClientSocket.js\");\n  const { replace } = __webpack_require__(/*! ./hmr */ \"./node_modules/webpack-plugin-serve/lib/client/hmr.js\");\n  const { error, info, warn } = __webpack_require__(/*! ./log */ \"./node_modules/webpack-plugin-serve/lib/client/log.js\")();\n\n  const protocol = secure ? 'wss' : 'ws';\n  const socket = new ClientSocket(client, `${protocol}://${client.address || address}/wps`);\n\n  const { compilerName } = options;\n\n  window.webpackPluginServe.compilers[compilerName] = {};\n\n  // prevents ECONNRESET errors on the server\n  window.addEventListener('beforeunload', () => socket.close());\n\n  socket.addEventListener('message', (message) => {\n    const { action, data = {} } = JSON.parse(message.data);\n    const { errors, hash = '<?>', warnings } = data || {};\n    const shortHash = hash.slice(0, 7);\n    const identifier = options.compilerName ? `(Compiler: ${options.compilerName}) ` : '';\n    const compiler = window.webpackPluginServe.compilers[compilerName];\n    const { wpsId } = data;\n\n    switch (action) {\n      case 'build':\n        compiler.done = false;\n        break;\n      case 'connected':\n        info(`WebSocket connected ${identifier}`);\n        break;\n      case 'done':\n        compiler.done = true;\n        break;\n      case 'problems':\n        if (data.errors.length) {\n          error(`${identifier}Build ${shortHash} produced errors:\\n`, errors);\n        }\n        if (data.warnings.length) {\n          warn(`${identifier}Build ${shortHash} produced warnings:\\n`, warnings);\n        }\n        break;\n      case 'reload':\n        window.location.reload();\n        break;\n      case 'replace':\n        // actions with a wpsId in tow indicate actions that should only be executed when the wpsId sent\n        // matches the wpsId set in options. this is how we can identify multiple compilers in the\n        // client.\n        if (wpsId && wpsId === options.wpsId) {\n          replace(buildHash, hash);\n        }\n        break;\n      default:\n    }\n  });\n\n  if (options.firstInstance) {\n    if (progress === 'minimal') {\n      const { init } = __webpack_require__(/*! ./overlays/progress-minimal */ \"./node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js\");\n      init(options, socket);\n    } else if (progress) {\n      const { init } = __webpack_require__(/*! ./overlays/progress */ \"./node_modules/webpack-plugin-serve/lib/client/overlays/progress.js\");\n      init(options, socket);\n    }\n\n    if (status) {\n      const { init } = __webpack_require__(/*! ./overlays/status */ \"./node_modules/webpack-plugin-serve/lib/client/overlays/status.js\");\n      init(options, socket);\n    }\n\n    if (true) {\n      info('Hot Module Replacement is active');\n\n      if (options.liveReload) {\n        info('Live Reload taking precedence over Hot Module Replacement');\n      }\n    } else {}\n\n    if (false) {}\n  }\n};\n\nmodule.exports = { run };\n\n\n//# sourceURL=webpack:///(webpack)-plugin-serve/lib/client/client.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/hmr.js":
/*!************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/hmr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { error, info, refresh, warn } = __webpack_require__(/*! ./log */ \"./node_modules/webpack-plugin-serve/lib/client/log.js\")();\n\nlet latest = true;\n\nconst hmr = {\n  onUnaccepted(data) {\n    warn('Change in unaccepted module(s):\\n', data);\n    warn(data);\n  },\n  onDeclined(data) {\n    warn('Change in declined module(s):\\n', data);\n  },\n  onErrored(data) {\n    error('Error in module(s):\\n', data);\n  }\n};\n\nconst replace = async (buildHash, hash) => {\n  const { apply, check, status } = module.hot;\n\n  if (hash) {\n    // eslint-disable-next-line no-undef\n    latest = hash.includes(buildHash);\n  }\n\n  if (!latest) {\n    const hmrStatus = status();\n\n    if (hmrStatus === 'abort' || hmrStatus === 'fail') {\n      warn(`An HMR update was triggered, but ${hmrStatus}ed. ${refresh}`);\n      return;\n    }\n\n    let modules;\n\n    try {\n      modules = await check(false);\n    } catch (e) {\n      // noop. this typically happens when a MultiCompiler has more than one compiler that includes\n      // this script, and an update happens with a hash that isn't part of the compiler/module this\n      // instance was loaded for.\n      return;\n    }\n\n    if (!modules) {\n      warn(`No modules found for replacement. ${refresh}`);\n      return;\n    }\n\n    modules = await apply(hmr);\n\n    if (modules) {\n      latest = true;\n      info(`Build ${hash.slice(0, 7)} replaced:\\n`, modules);\n    }\n  }\n};\n\nmodule.exports = { replace };\n\n\n//# sourceURL=webpack:///(webpack)-plugin-serve/lib/client/hmr.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/log.js":
/*!************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/log.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { error, info, warn } = console;\nconst log = {\n  error: error.bind(console, '⬡ wps:'),\n  info: info.bind(console, '⬡ wps:'),\n  refresh: 'Please refresh the page',\n  warn: warn.bind(console, '⬡ wps:')\n};\nconst noop = () => {};\nconst silent = {\n  error: noop,\n  info: noop,\n  warn: noop\n};\n\nmodule.exports = () => (window.webpackPluginServe.silent ? silent : log);\n\n\n//# sourceURL=webpack:///(webpack)-plugin-serve/lib/client/log.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js":
/*!**********************************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/progress-minimal.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { addCss, addHtml } = __webpack_require__(/*! ./util */ \"./node_modules/webpack-plugin-serve/lib/client/overlays/util.js\");\n\nconst ns = 'wps-progress-minimal';\nconst html = `\n<div id=\"${ns}\" class=\"${ns}-hidden\">\n  <div id=\"${ns}-bar\"></div>\n</div>\n`;\nconst css = `\n#${ns} {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 4px;\n  width: 100vw;\n  z-index: 2147483645;\n}\n\n#${ns}-bar {\n  width: 0%;\n  height: 4px;\n  background-color: rgb(186, 223, 172);\n  transition: width 1s ease-in-out;\n}\n\n.${ns}-hidden{\n  display: none;\n}\n`;\n\nconst update = (percent) => {\n  const bar = document.querySelector(`#${ns}-bar`);\n  bar.style.width = `${percent}%`;\n};\n\nconst reset = (wrapper) => {\n  wrapper.classList.add(`${ns}-hidden`);\n  setTimeout(() => update(0), 1e3);\n};\n\nconst init = (options, socket) => {\n  if (options.firstInstance) {\n    document.addEventListener('DOMContentLoaded', () => {\n      addCss(css);\n      addHtml(html);\n    });\n  }\n\n  socket.addEventListener('message', (message) => {\n    const { action, data } = JSON.parse(message.data);\n\n    if (action !== 'progress') {\n      return;\n    }\n\n    const percent = Math.floor(data.percent * 100);\n    const wrapper = document.querySelector(`#${ns}`);\n\n    wrapper.classList.remove(`${ns}-hidden`);\n\n    if (data.percent === 1) {\n      setTimeout(() => reset(wrapper), 5e3);\n    }\n\n    update(percent);\n  });\n};\n\nmodule.exports = {\n  init\n};\n\n\n//# sourceURL=webpack:///(webpack)-plugin-serve/lib/client/overlays/progress-minimal.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress.js":
/*!**************************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/progress.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { addCss, addHtml } = __webpack_require__(/*! ./util */ \"./node_modules/webpack-plugin-serve/lib/client/overlays/util.js\");\n\nconst ns = 'wps-progress';\nconst css = `\n@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');\n\n#${ns}{\n  width: 200px;\n  height: 200px;\n  position: absolute;\n  right: 5%;\n  top: 5%;\n  transition: opacity .25s ease-in-out;\n  z-index: 2147483645;\n}\n\n#${ns}-bg {\n  fill: #282d35;\n}\n\n#${ns}-fill {\n  fill: rgba(0, 0, 0, 0);\n  stroke: rgb(186, 223, 172);\n  stroke-dasharray: 219.99078369140625;\n  stroke-dashoffset: -219.99078369140625;\n  stroke-width: 10;\n  transform: rotate(90deg)translate(0px, -80px);\n  transition: stroke-dashoffset 1s;\n}\n\n#${ns}-percent {\n  font-family: 'Open Sans';\n  font-size: 18px;\n  fill: #ffffff;\n}\n\n#${ns}-percent-value {\n  dominant-baseline: middle;\n  text-anchor: middle;\n}\n\n#${ns}-percent-super {\n  fill: #bdc3c7;\n  font-size: .45em;\n  baseline-shift: 10%;\n}\n\n.${ns}-noselect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  cursor: default;\n}\n\n@keyframes ${ns}-hidden-display {\n\t0% {\n\t\topacity: 1;\n\t\ttransform: scale(1);\n\t\t-webkit-transform: scale(1);\n\t}\n\t99% {\n\t\tdisplay: inline-flex;\n\t\topacity: 0;\n\t\ttransform: scale(0);\n\t\t-webkit-transform: scale(0);\n\t}\n\t100% {\n\t\tdisplay: none;\n\t\topacity: 0;\n\t\ttransform: scale(0);\n\t\t-webkit-transform: scale(0);\n\t}\n}\n\n.${ns}-hidden {\n  animation: ${ns}-hidden-display .3s;\n  animation-fill-mode:forwards;\n  display: inline-flex;\n}\n\n.${ns}-hidden-onload {\n  display: none;\n}\n`;\n\nconst html = `\n<svg id=\"${ns}\" class=\"${ns}-noselect ${ns}-hidden-onload\" x=\"0px\" y=\"0px\" viewBox=\"0 0 80 80\">\n  <circle id=\"${ns}-bg\" cx=\"50%\" cy=\"50%\" r=\"35\"></circle>\n  <path id=\"${ns}-fill\" d=\"M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0\" />\n  <text id=\"${ns}-percent\" x=\"50%\" y=\"51%\"><tspan id=\"${ns}-percent-value\">0</tspan><tspan id=\"${ns}-percent-super\">%</tspan></text>\n</svg>\n`;\n\nconst update = (percent) => {\n  const max = -219.99078369140625;\n  const value = document.querySelector(`#${ns}-percent-value`);\n  const track = document.querySelector(`#${ns}-fill`);\n  const offset = ((100 - percent) / 100) * max;\n\n  track.setAttribute('style', `stroke-dashoffset: ${offset}`);\n  value.innerHTML = percent.toString();\n};\n\nconst reset = (svg) => {\n  svg.classList.add(`${ns}-hidden`);\n  setTimeout(() => update(0), 1e3);\n};\n\nconst init = (options, socket) => {\n  if (options.firstInstance) {\n    document.addEventListener('DOMContentLoaded', () => {\n      addCss(css);\n      addHtml(html);\n    });\n  }\n\n  socket.addEventListener('message', (message) => {\n    const { action, data } = JSON.parse(message.data);\n\n    if (action !== 'progress') {\n      return;\n    }\n\n    const percent = Math.floor(data.percent * 100);\n    const svg = document.querySelector(`#${ns}`);\n\n    if (!svg) {\n      return;\n    }\n\n    // we can safely call this even if it doesn't have the class\n    svg.classList.remove(`${ns}-hidden`, `${ns}-hidden-onload`);\n\n    if (data.percent === 1) {\n      setTimeout(() => reset(svg), 5e3);\n    }\n\n    update(percent);\n  });\n};\n\nmodule.exports = { init };\n\n\n//# sourceURL=webpack:///(webpack)-plugin-serve/lib/client/overlays/progress.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/status.js":
/*!************************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/status.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { addCss, addHtml, socketMessage } = __webpack_require__(/*! ./util */ \"./node_modules/webpack-plugin-serve/lib/client/overlays/util.js\");\n\nconst ns = 'wps-status';\nconst css = `\n@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');\n\n#${ns} {\n  background: #282d35;\n  border-radius: 0.6em;\n  display: flex;\n  flex-direction: column;\n\tfont-family: 'Open Sans', Helvetica, Arial, sans-serif;\n\tfont-size: 10px;\n  height: 90%;\n  min-height: 20em;\n  left: 50%;\n  opacity: 1;\n  overflow: hidden;\n  padding-bottom: 3em;\n  position: absolute;\n  top: 2rem;\n  transform: translateX(-50%);\n  transition: opacity .25s ease-in-out;\n  width: 95%;\n  z-index: 2147483645;\n}\n\n@keyframes ${ns}-hidden-display {\n\t0% {\n\t\topacity: 1;\n\t}\n\t99% {\n\t\tdisplay: inline-flex;\n\t\topacity: 0;\n\t}\n\t100% {\n\t\tdisplay: none;\n\t\topacity: 0;\n\t}\n}\n\n#${ns}.${ns}-hidden {\n  animation: ${ns}-hidden-display .3s;\n  animation-fill-mode:forwards;\n  display: none;\n}\n\n#${ns}.${ns}-min {\n  animation: minimize 10s;\n  bottom: 2em;\n  cursor: pointer;\n  height: 6em;\n  left: auto;\n  min-height: 6em;\n  padding-bottom: 0;\n  position: absolute;\n  right: 2em;\n  top: auto;\n  transform: none;\n  width: 6em;\n}\n\n#${ns}.${ns}-min #${ns}-beacon {\n  display: block;\n}\n\n#${ns}-title {\n  color: #fff;\n  font-size: 1.2em;\n  font-weight: normal;\n  margin: 0;\n  padding: 0.6em 0;\n  text-align: center;\n  width: 100%;\n}\n\n#${ns}.${ns}-min #${ns}-title {\n  display: none;\n}\n\n#${ns}-title-errors {\n  color: #ff5f58;\n  font-style: normal;\n  padding-left: 1em;\n}\n\n#${ns}-title-warnings {\n  color: #ffbd2e;\n  font-style: normal;\n  padding-left: 1em;\n}\n\n#${ns}-problems {\n  overflow-y: auto;\n  padding: 1em 2em;\n}\n\n#${ns}-problems pre {\n  color: #ddd;\n  background: #282d35;\n  display: block;\n  font-size: 1.3em;\n\tfont-family: 'Open Sans', Helvetica, Arial, sans-serif;\n  white-space: pre-wrap;\n}\n\n#${ns}-problems pre em {\n  background: #ff5f58;\n  border-radius: 0.3em;\n  color: #641e16;\n  font-style: normal;\n  line-height: 3em;\n  margin-right: 0.4em;\n  padding: 0.1em 0.4em;\n  text-transform: uppercase;\n}\n\npre#${ns}-warnings em {\n  background: #ffbd2e;\n  color: #3e2723;\n}\n\npre#${ns}-success {\n  display: none;\n  text-align: center;\n}\n\npre#${ns}-success em {\n  background: #7fb900;\n  color: #004d40;\n}\n\n#${ns}-problems.${ns}-success #${ns}-success {\n  display: block;\n}\n\n#${ns}.${ns}-min #${ns}-problems {\n  display: none;\n}\n\n#${ns}-nav {\n  opacity: 0.5;\n  padding: 1.2em;\n  position: absolute;\n}\n\n#${ns}.${ns}-min #${ns}-nav {\n  display: none;\n}\n\n#${ns}-nav:hover {\n  opacity: 1;\n}\n\n#${ns}-nav div {\n  background: #ff5f58;\n  border-radius: 1.2em;\n  cursor: pointer;\n  display: inline-block;\n  height: 1.2em;\n  position: relative;\n  width: 1.2em;\n}\n\ndiv#${ns}-min {\n  background: #ffbd2e;\n  margin-left: 0.8em;\n}\n\n#${ns}-beacon {\n  border-radius: 3em;\n  display: none;\n  font-size: 10px;\n  height: 3em;\n  margin: 1.6em auto;\n  position: relative;\n  width: 3em;\n}\n\n#${ns}-beacon:before, #${ns}-beacon:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(127,185,0, 0.2);\n  border-radius: 3em;\n  opacity: 0;\n}\n\n#${ns}-beacon:before {\n  animation: ${ns}-pulse 3s infinite linear;\n  transform: scale(1);\n}\n\n#${ns}-beacon:after {\n  animation: ${ns}-pulse 3s 2s infinite linear;\n}\n\n\n@keyframes ${ns}-pulse {\n  0% {\n    opacity: 0;\n    transform: scale(0.6);\n  }\n  33% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(1.4);\n  }\n}\n\n#${ns}-beacon mark {\n  background: rgba(127, 185, 0, 1);\n  border-radius: 100% 100%;\n  height: 1em;\n  left: 1em;\n  position: absolute;\n  top: 1em;\n  width: 1em;\n}\n\n#${ns}-beacon.${ns}-error mark {\n  background: #ff5f58;\n}\n\n#${ns}-beacon.${ns}-error:before, #${ns}-beacon.error:after {\n  background: rgba(255, 95, 88, 0.2);\n}\n\n#${ns}-beacon.${ns}-warning mark {\n  background: #ffbd2e;\n}\n\n#${ns}-beacon.${ns}-warning:before, #${ns}-beacon.warning:after {\n  background: rgba(255, 189, 46, 0.2);\n}\n`;\n\nconst html = `\n<aside id=\"${ns}\" class=\"${ns}-hidden\" title=\"build status\">\n  <figure id=\"${ns}-beacon\">\n    <mark/>\n  </figure>\n  <nav id=\"${ns}-nav\">\n    <div id=\"${ns}-close\" title=\"close\"></div>\n    <div id=\"${ns}-min\" title=\"minmize\"></div>\n  </nav>\n  <h1 id=\"${ns}-title\">\n    build status\n    <em id=\"${ns}-title-errors\"></em>\n    <em id=\"${ns}-title-warnings\"></em>\n  </h1>\n  <article id=\"${ns}-problems\">\n    <pre id=\"${ns}-success\"><em>Build Successful</em></pre>\n    <pre id=\"${ns}-errors\"></pre>\n    <pre id=\"${ns}-warnings\"></pre>\n  </article>\n</aside>\n`;\n\nconst init = (options, socket) => {\n  const hidden = `${ns}-hidden`;\n  let hasProblems = false;\n  let aside;\n  let beacon;\n  let problems;\n  let preErrors;\n  let preWarnings;\n  let titleErrors;\n  let titleWarnings;\n\n  const reset = () => {\n    preErrors.innerHTML = '';\n    preWarnings.innerHTML = '';\n    problems.classList.remove(`${ns}-success`);\n    beacon.className = '';\n    titleErrors.innerText = '';\n    titleWarnings.innerText = '';\n  };\n\n  const addErrors = (errors) => {\n    if (errors.length) {\n      problems.classList.remove(`${ns}-success`);\n      beacon.classList.add(`${ns}-error`);\n\n      for (const error of errors) {\n        const markup = `<div><em>Error</em> in ${error}</div>`;\n        addHtml(markup, preErrors);\n      }\n\n      titleErrors.innerText = `${errors.length} Error(s)`;\n    } else {\n      titleErrors.innerText = '';\n    }\n    aside.classList.remove(hidden);\n  };\n\n  const addWarnings = (warnings) => {\n    if (warnings.length) {\n      problems.classList.remove(`${ns}-success`);\n\n      if (!beacon.classList.contains(`${ns}-error`)) {\n        beacon.classList.add(`${ns}-warning`);\n      }\n\n      for (const warning of warnings) {\n        const markup = `<div><em>Warning</em> in ${warning}</div>`;\n        addHtml(markup, preWarnings);\n      }\n\n      titleWarnings.innerText = `${warnings.length} Warning(s)`;\n    } else {\n      titleWarnings.innerText = '';\n    }\n\n    aside.classList.remove(hidden);\n  };\n\n  if (options.firstInstance) {\n    document.addEventListener('DOMContentLoaded', () => {\n      addCss(css);\n      [aside] = addHtml(html);\n      beacon = document.querySelector(`#${ns}-beacon`);\n      problems = document.querySelector(`#${ns}-problems`);\n      preErrors = document.querySelector(`#${ns}-errors`);\n      preWarnings = document.querySelector(`#${ns}-warnings`);\n      titleErrors = document.querySelector(`#${ns}-title-errors`);\n      titleWarnings = document.querySelector(`#${ns}-title-warnings`);\n\n      const close = document.querySelector(`#${ns}-close`);\n      const min = document.querySelector(`#${ns}-min`);\n\n      aside.addEventListener('click', () => {\n        aside.classList.remove(`${ns}-min`);\n      });\n\n      close.addEventListener('click', () => {\n        aside.classList.add(`${ns}-hidden`);\n      });\n\n      min.addEventListener('click', (e) => {\n        aside.classList.add(`${ns}-min`);\n        e.stopImmediatePropagation();\n      });\n    });\n  }\n\n  socketMessage(socket, (action, data) => {\n    if (!aside) {\n      return;\n    }\n\n    const { compilers } = window.webpackPluginServe;\n\n    switch (action) {\n      case 'build':\n        // clear errors and warnings when a new build begins\n        reset();\n        break;\n      case 'problems':\n        addErrors(data.errors);\n        addWarnings(data.warnings);\n        aside.classList.remove(hidden);\n        hasProblems = data.errors.length || data.warnings.length;\n        break;\n      case 'replace':\n        // if there's a compiler that isn't done yet, hold off and let it run the show\n        for (const compilerName of Object.keys(compilers)) {\n          if (!compilers[compilerName]) {\n            return;\n          }\n        }\n\n        if (hasProblems && !preErrors.children.length && !preWarnings.children.length) {\n          reset();\n          hasProblems = false;\n          problems.classList.add(`${ns}-success`);\n          aside.classList.remove(hidden);\n\n          setTimeout(() => aside.classList.add(hidden), 3e3);\n        }\n        break;\n      default:\n    }\n  });\n};\n\nmodule.exports = { init };\n\n\n//# sourceURL=webpack:///(webpack)-plugin-serve/lib/client/overlays/status.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/util.js":
/*!**********************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/util.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst addHtml = (html, parent) => {\n  const div = document.createElement('div');\n  const nodes = [];\n\n  div.innerHTML = html.trim();\n\n  while (div.firstChild) {\n    nodes.push((parent || document.body).appendChild(div.firstChild));\n  }\n\n  return nodes;\n};\n\nconst addCss = (css) => {\n  const style = document.createElement('style');\n\n  style.type = 'text/css';\n\n  if (css.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    style.appendChild(document.createTextNode(css));\n  }\n\n  // append the stylesheet for the svg\n  document.head.appendChild(style);\n};\n\nconst socketMessage = (socket, handler) => {\n  socket.addEventListener('message', (message) => {\n    const { action, data = {} } = JSON.parse(message.data);\n    handler(action, data);\n  });\n};\n\nmodule.exports = { addCss, addHtml, socketMessage };\n\n\n//# sourceURL=webpack:///(webpack)-plugin-serve/lib/client/overlays/util.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadBreedsOptions\", function() { return loadBreedsOptions; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _UI_toShowBreeds_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../UI/toShowBreeds.js */ \"./src/modules/dogs/breeds/UI/toShowBreeds.js\");\n\n\n\n\nfunction loadBreedsOptions() {\n  return _loadBreedsOptions.apply(this, arguments);\n}\n\nfunction _loadBreedsOptions() {\n  _loadBreedsOptions = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n    var endPoint, responsePromise, dataResponseJsonPromise, breedsObject;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            endPoint = 'https://dog.ceo/api/breeds/list/all';\n            responsePromise = fetch(endPoint);\n            dataResponseJsonPromise = responsePromise.then(function (responseObjectData) {\n              return responseObjectData.json();\n            });\n            _context.next = 5;\n            return dataResponseJsonPromise.then(function (dataResponse) {\n              return dataResponse;\n            });\n\n          case 5:\n            breedsObject = _context.sent;\n            dataResponseJsonPromise[\"catch\"](function (error) {\n              return console.log(error);\n            });\n            Object(_UI_toShowBreeds_js__WEBPACK_IMPORTED_MODULE_2__[\"showBreedsInSelect\"])(breedsObject);\n\n          case 8:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _loadBreedsOptions.apply(this, arguments);\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/dogs/breeds/service/api.js?");

/***/ }),

/***/ "./src/modules/dogs/photos/UI/toShowPhotos.js":
/*!****************************************************!*\
  !*** ./src/modules/dogs/photos/UI/toShowPhotos.js ***!
  \****************************************************/
/*! exports provided: showError, showPhotos */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"showError\", function() { return showError; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"showPhotos\", function() { return showPhotos; });\n/* harmony import */ var marvina_carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! marvina-carousel */ \"./node_modules/marvina-carousel/dist/js/marvina-carousel.esm.js\");\n// import Carousel from 'https://cdn.pika.dev/marvina-carousel/v1';\n\n\nfunction showError() {\n  //console.log('funcion error');\n  var alertError = document.createElement('p');\n  alertError.className = 'text-error';\n  var textAlertError = document.createTextNode('El campo no puede estar vacío');\n  alertError.appendChild(textAlertError);\n  document.querySelector('.main-content').insertBefore(alertError, document.querySelector('.list-photos'));\n  var select = document.getElementById(\"dog-selector\");\n  select.className += ' error'; // Ocultamos el mensaje despues de 2 seg\n\n  setTimeout(function () {\n    alertError.remove();\n    select.classList.remove('error');\n  }, 2000);\n}\n\nfunction showPhotos(photos) {\n  document.querySelector(\".list-photos\").innerHTML = '';\n  photos.message.forEach(function (photo) {\n    var html = '';\n    html += \"<img src=\\\"\".concat(photo, \"\\\"/>\");\n    var figure = document.createElement(\"figure\");\n    figure.className = 'mc-carousel-element';\n    figure.innerHTML = html;\n    document.querySelector(\".list-photos\").appendChild(figure);\n  });\n  var carousel = new marvina_carousel__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    el: '#carousel',\n    minImage: 2\n  });\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/dogs/photos/UI/toShowPhotos.js?");

/***/ }),

/***/ "./src/modules/dogs/photos/index.js":
/*!******************************************!*\
  !*** ./src/modules/dogs/photos/index.js ***!
  \******************************************/
/*! exports provided: getPhotosDogs, queryApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPhotosDogs\", function() { return getPhotosDogs; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _service_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./service/api.js */ \"./src/modules/dogs/photos/service/api.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"queryApi\", function() { return _service_api_js__WEBPACK_IMPORTED_MODULE_2__[\"queryApi\"]; });\n\n/* harmony import */ var _UI_toShowPhotos_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI/toShowPhotos.js */ \"./src/modules/dogs/photos/UI/toShowPhotos.js\");\n\n\n\n\n\n\nfunction getPhotosDogs() {\n  return _getPhotosDogs.apply(this, arguments);\n}\n\nfunction _getPhotosDogs() {\n  _getPhotosDogs = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n    var breedValue, dogs;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            breedValue = document.getElementById(\"dog-selector\").value;\n\n            if (!(breedValue === '')) {\n              _context.next = 5;\n              break;\n            }\n\n            Object(_UI_toShowPhotos_js__WEBPACK_IMPORTED_MODULE_3__[\"showError\"])();\n            _context.next = 9;\n            break;\n\n          case 5:\n            _context.next = 7;\n            return Object(_service_api_js__WEBPACK_IMPORTED_MODULE_2__[\"queryApi\"])();\n\n          case 7:\n            dogs = _context.sent;\n            Object(_UI_toShowPhotos_js__WEBPACK_IMPORTED_MODULE_3__[\"showPhotos\"])(dogs);\n\n          case 9:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _getPhotosDogs.apply(this, arguments);\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/dogs/photos/index.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_dogs_photos_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/dogs/photos/index.js */ \"./src/modules/dogs/photos/index.js\");\n/* harmony import */ var _modules_dogs_breeds_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/dogs/breeds/index.js */ \"./src/modules/dogs/breeds/index.js\");\n/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../css/styles.css */ \"./css/styles.css\");\n/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_styles_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  new SlimSelect({\n    select: '#dog-selector'\n  });\n  Object(_modules_dogs_breeds_index_js__WEBPACK_IMPORTED_MODULE_1__[\"loadBreedsOptions\"])();\n  fetch('/src/pages/content.html').then(function (response) {\n    return response.text();\n  }).then(function (text) {\n    var xmlString = str2DOMElement(text);\n    document.getElementById(\"carousel\").appendChild(xmlString);\n    document.querySelector('#aafdsasdd').addEventListener(\"click\", function (e) {\n      e.preventDefault();\n      console.log('aa');\n    });\n  });\n});\ndocument.querySelector('#btn-submit').addEventListener(\"click\", function (e) {\n  e.preventDefault();\n  Object(_modules_dogs_photos_index_js__WEBPACK_IMPORTED_MODULE_0__[\"getPhotosDogs\"])();\n});\n\nvar str2DOMElement = function str2DOMElement(html) {\n  var frame = document.createElement('iframe');\n  frame.style.display = 'none';\n  document.body.appendChild(frame);\n  frame.contentDocument.open();\n  frame.contentDocument.write(html);\n  frame.contentDocument.close();\n  var el = frame.contentDocument.body.firstChild;\n  document.body.removeChild(frame);\n  return el;\n};\n\n//# sourceURL=webpack:///./src/pages/home.js?");

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./src/pages/home.js webpack-plugin-serve/client ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/pages/home.js */\"./src/pages/home.js\");\nmodule.exports = __webpack_require__(/*! webpack-plugin-serve/client */\"./node_modules/webpack-plugin-serve/client.js\");\n\n\n//# sourceURL=webpack:///multi_./src/pages/home.js_webpack-plugin-serve/client?");

/***/ })

/******/ });