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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/geomap.js":
/*!***********************!*\
  !*** ./src/geomap.js ***!
  \***********************/
/*! exports provided: renderGeoMap, colorGeoMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderGeoMap\", function() { return renderGeoMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"colorGeoMap\", function() { return colorGeoMap; });\nconst geoColor = d3.scaleThreshold()\n    .domain([0, 0.15, 0.30, 0.45, 0.55, 0.70, 0.85, 1.0])\n    .range([\"lightgray\", \"#009392\", \"#39B185\", \"#9CCB86\", \"#E9E29C\", \"#EEB479\", \"#E88471\", \"#CF597E\"]); // color scheme 1 (green-red)\n    // .range([\"lightgray\", \"#228B3B\", \"#6CBA7D\", \"#CDE5D2\", \"#FCE1A4\", \"#FABF7B\", \"#E05C5C\", \"#AB1866\"]); // color scheme 2 (green-magenta)\n    // .range([\"lightgray\", \"#3C93C2\", \"#6CB0D6\", \"#9EC9E2\", \"#E1F2E3\", \"#FEB24C\", \"#FD8D3C\", \"#FC4E2A\"]); // color scheme 3 (blue-orange)\n\nconst renderGeoMap = (dataset) => {  // renderGeoMap doesn't use dataset directly, but passes it to colorGeoMap()\n    const width = 720;\n    const height = 500;\n\n    const projection = d3.geoAlbersUsa()\n        .scale(1000)\n        .translate([width / 2, height / 2]);\n\n    const path = d3.geoPath()\n        .projection(projection);\n\n    let svg = d3.select(\".geomap-container\").append(\"svg\")\n        .attr(\"width\", width)\n        .attr(\"height\", height);\n\n    d3.json(\"assets/data/cb_2018_us_state_5m.json\").then(us => {\n        svg.append(\"g\")\n            .selectAll(\"path\")\n            .data(topojson.feature(us, us.objects.cb_2018_us_state_5m).features)\n            .enter()\n            .append(\"path\")\n            .attr(\"d\", path)\n            .attr(\"class\", \"states\")\n            .style(\"fill\", \"lightgray\");\n        colorGeoMap(dataset);\n    });\n}\n\nconst colorGeoMap = (dataset, year = \"2006\") => {\n\n    d3.csv(dataset).then(data => {\n        const filteredData = data.filter(datum => datum.year === year);\n        let searchFreqByState = {};\n        filteredData.forEach(datum => {\n            if (datum.sriracha === \"0\" && datum.tabasco === \"0\") {\n                searchFreqByState[datum.Region] = -0.2;\n            } else {\n                searchFreqByState[datum.Region] = parseFloat(datum.sriracha);\n            }\n        });\n\n        d3.selectAll(\".states\")\n            .transition().duration(150) // may get rid of this\n            .style(\"fill\", d => {\n                let searchFreq = searchFreqByState[d.properties.NAME];\n                return geoColor(searchFreq);\n            });\n    });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2VvbWFwLmpzPzg5MGQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHVHQUF1RztBQUN2RywwR0FBMEc7QUFDMUcsMEdBQTBHOztBQUVuRyxtQ0FBbUM7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsS0FBSztBQUNMIiwiZmlsZSI6Ii4vc3JjL2dlb21hcC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdlb0NvbG9yID0gZDMuc2NhbGVUaHJlc2hvbGQoKVxuICAgIC5kb21haW4oWzAsIDAuMTUsIDAuMzAsIDAuNDUsIDAuNTUsIDAuNzAsIDAuODUsIDEuMF0pXG4gICAgLnJhbmdlKFtcImxpZ2h0Z3JheVwiLCBcIiMwMDkzOTJcIiwgXCIjMzlCMTg1XCIsIFwiIzlDQ0I4NlwiLCBcIiNFOUUyOUNcIiwgXCIjRUVCNDc5XCIsIFwiI0U4ODQ3MVwiLCBcIiNDRjU5N0VcIl0pOyAvLyBjb2xvciBzY2hlbWUgMSAoZ3JlZW4tcmVkKVxuICAgIC8vIC5yYW5nZShbXCJsaWdodGdyYXlcIiwgXCIjMjI4QjNCXCIsIFwiIzZDQkE3RFwiLCBcIiNDREU1RDJcIiwgXCIjRkNFMUE0XCIsIFwiI0ZBQkY3QlwiLCBcIiNFMDVDNUNcIiwgXCIjQUIxODY2XCJdKTsgLy8gY29sb3Igc2NoZW1lIDIgKGdyZWVuLW1hZ2VudGEpXG4gICAgLy8gLnJhbmdlKFtcImxpZ2h0Z3JheVwiLCBcIiMzQzkzQzJcIiwgXCIjNkNCMEQ2XCIsIFwiIzlFQzlFMlwiLCBcIiNFMUYyRTNcIiwgXCIjRkVCMjRDXCIsIFwiI0ZEOEQzQ1wiLCBcIiNGQzRFMkFcIl0pOyAvLyBjb2xvciBzY2hlbWUgMyAoYmx1ZS1vcmFuZ2UpXG5cbmV4cG9ydCBjb25zdCByZW5kZXJHZW9NYXAgPSAoZGF0YXNldCkgPT4geyAgLy8gcmVuZGVyR2VvTWFwIGRvZXNuJ3QgdXNlIGRhdGFzZXQgZGlyZWN0bHksIGJ1dCBwYXNzZXMgaXQgdG8gY29sb3JHZW9NYXAoKVxuICAgIGNvbnN0IHdpZHRoID0gNzIwO1xuICAgIGNvbnN0IGhlaWdodCA9IDUwMDtcblxuICAgIGNvbnN0IHByb2plY3Rpb24gPSBkMy5nZW9BbGJlcnNVc2EoKVxuICAgICAgICAuc2NhbGUoMTAwMClcbiAgICAgICAgLnRyYW5zbGF0ZShbd2lkdGggLyAyLCBoZWlnaHQgLyAyXSk7XG5cbiAgICBjb25zdCBwYXRoID0gZDMuZ2VvUGF0aCgpXG4gICAgICAgIC5wcm9qZWN0aW9uKHByb2plY3Rpb24pO1xuXG4gICAgbGV0IHN2ZyA9IGQzLnNlbGVjdChcIi5nZW9tYXAtY29udGFpbmVyXCIpLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpO1xuXG4gICAgZDMuanNvbihcImFzc2V0cy9kYXRhL2NiXzIwMThfdXNfc3RhdGVfNW0uanNvblwiKS50aGVuKHVzID0+IHtcbiAgICAgICAgc3ZnLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAgICAgICAuZGF0YSh0b3BvanNvbi5mZWF0dXJlKHVzLCB1cy5vYmplY3RzLmNiXzIwMThfdXNfc3RhdGVfNW0pLmZlYXR1cmVzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgcGF0aClcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdGF0ZXNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgXCJsaWdodGdyYXlcIik7XG4gICAgICAgIGNvbG9yR2VvTWFwKGRhdGFzZXQpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgY29uc3QgY29sb3JHZW9NYXAgPSAoZGF0YXNldCwgeWVhciA9IFwiMjAwNlwiKSA9PiB7XG5cbiAgICBkMy5jc3YoZGF0YXNldCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgY29uc3QgZmlsdGVyZWREYXRhID0gZGF0YS5maWx0ZXIoZGF0dW0gPT4gZGF0dW0ueWVhciA9PT0geWVhcik7XG4gICAgICAgIGxldCBzZWFyY2hGcmVxQnlTdGF0ZSA9IHt9O1xuICAgICAgICBmaWx0ZXJlZERhdGEuZm9yRWFjaChkYXR1bSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0dW0uc3JpcmFjaGEgPT09IFwiMFwiICYmIGRhdHVtLnRhYmFzY28gPT09IFwiMFwiKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoRnJlcUJ5U3RhdGVbZGF0dW0uUmVnaW9uXSA9IC0wLjI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlYXJjaEZyZXFCeVN0YXRlW2RhdHVtLlJlZ2lvbl0gPSBwYXJzZUZsb2F0KGRhdHVtLnNyaXJhY2hhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZDMuc2VsZWN0QWxsKFwiLnN0YXRlc1wiKVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKS5kdXJhdGlvbigxNTApIC8vIG1heSBnZXQgcmlkIG9mIHRoaXNcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaEZyZXEgPSBzZWFyY2hGcmVxQnlTdGF0ZVtkLnByb3BlcnRpZXMuTkFNRV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlb0NvbG9yKHNlYXJjaEZyZXEpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/geomap.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _geomap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geomap */ \"./src/geomap.js\");\n/* harmony import */ var _scatter_plot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scatter_plot */ \"./src/scatter_plot.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n\n    // Years for time slider\n    const year = [\n        \"2006\", \"2007\", \"2008\", \n        \"2009\", \"2010\", \"2011\", \n        \"2012\", \"2013\", \"2014\", \n        \"2015\", \"2016\", \"2017\", \n        \"2018\", \"2019\"\n    ];\n\n    // This dataset should dynamically change based on the comparison selected\n    // (Will prob have a menu allowing users to select food comparison)\n    // Refactor later to assign dataset based on the input value\n    // ...may need a dictionary or to rename data files to faciliate interpolation\n    let geoDataset = \"assets/data/sriracha/sriracha_vs_tabasco_geo_trended.csv\";\n\n    d3.select(\"#timeslide\").on(\"input\", function() {\n        document.getElementById(\"range\").innerHTML = year[this.value];\n        Object(_geomap__WEBPACK_IMPORTED_MODULE_0__[\"colorGeoMap\"])(geoDataset, `${year[this.value]}`);\n        Object(_scatter_plot__WEBPACK_IMPORTED_MODULE_1__[\"colorScatterPlot\"])(`${year[this.value]}`);\n    });\n\n    Object(_geomap__WEBPACK_IMPORTED_MODULE_0__[\"renderGeoMap\"])(geoDataset);\n    \n    let temporalDataset = \"assets/data/sriracha/sriracha_tabasco_timeline_2004_to_present.csv\";\n    Object(_scatter_plot__WEBPACK_IMPORTED_MODULE_1__[\"renderScatterPlot\"])(temporalDataset);\n});\n\n// Something to think about later: do I need to clean up event listeners & timers?\n// Check for closures, memory leak sources?//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBcUQ7QUFDZ0I7O0FBRXJFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSwyREFBVyxnQkFBZ0IsaUJBQWlCO0FBQ3BELFFBQVEsc0VBQWdCLElBQUksaUJBQWlCO0FBQzdDLEtBQUs7O0FBRUwsSUFBSSw0REFBWTs7QUFFaEI7QUFDQSxJQUFJLHVFQUFpQjtBQUNyQixDQUFDOztBQUVEO0FBQ0EiLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJHZW9NYXAsIGNvbG9yR2VvTWFwIH0gZnJvbSAnLi9nZW9tYXAnO1xuaW1wb3J0IHsgcmVuZGVyU2NhdHRlclBsb3QsIGNvbG9yU2NhdHRlclBsb3QgfSBmcm9tICcuL3NjYXR0ZXJfcGxvdCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICAgIC8vIFllYXJzIGZvciB0aW1lIHNsaWRlclxuICAgIGNvbnN0IHllYXIgPSBbXG4gICAgICAgIFwiMjAwNlwiLCBcIjIwMDdcIiwgXCIyMDA4XCIsIFxuICAgICAgICBcIjIwMDlcIiwgXCIyMDEwXCIsIFwiMjAxMVwiLCBcbiAgICAgICAgXCIyMDEyXCIsIFwiMjAxM1wiLCBcIjIwMTRcIiwgXG4gICAgICAgIFwiMjAxNVwiLCBcIjIwMTZcIiwgXCIyMDE3XCIsIFxuICAgICAgICBcIjIwMThcIiwgXCIyMDE5XCJcbiAgICBdO1xuXG4gICAgLy8gVGhpcyBkYXRhc2V0IHNob3VsZCBkeW5hbWljYWxseSBjaGFuZ2UgYmFzZWQgb24gdGhlIGNvbXBhcmlzb24gc2VsZWN0ZWRcbiAgICAvLyAoV2lsbCBwcm9iIGhhdmUgYSBtZW51IGFsbG93aW5nIHVzZXJzIHRvIHNlbGVjdCBmb29kIGNvbXBhcmlzb24pXG4gICAgLy8gUmVmYWN0b3IgbGF0ZXIgdG8gYXNzaWduIGRhdGFzZXQgYmFzZWQgb24gdGhlIGlucHV0IHZhbHVlXG4gICAgLy8gLi4ubWF5IG5lZWQgYSBkaWN0aW9uYXJ5IG9yIHRvIHJlbmFtZSBkYXRhIGZpbGVzIHRvIGZhY2lsaWF0ZSBpbnRlcnBvbGF0aW9uXG4gICAgbGV0IGdlb0RhdGFzZXQgPSBcImFzc2V0cy9kYXRhL3NyaXJhY2hhL3NyaXJhY2hhX3ZzX3RhYmFzY29fZ2VvX3RyZW5kZWQuY3N2XCI7XG5cbiAgICBkMy5zZWxlY3QoXCIjdGltZXNsaWRlXCIpLm9uKFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFuZ2VcIikuaW5uZXJIVE1MID0geWVhclt0aGlzLnZhbHVlXTtcbiAgICAgICAgY29sb3JHZW9NYXAoZ2VvRGF0YXNldCwgYCR7eWVhclt0aGlzLnZhbHVlXX1gKTtcbiAgICAgICAgY29sb3JTY2F0dGVyUGxvdChgJHt5ZWFyW3RoaXMudmFsdWVdfWApO1xuICAgIH0pO1xuXG4gICAgcmVuZGVyR2VvTWFwKGdlb0RhdGFzZXQpO1xuICAgIFxuICAgIGxldCB0ZW1wb3JhbERhdGFzZXQgPSBcImFzc2V0cy9kYXRhL3NyaXJhY2hhL3NyaXJhY2hhX3RhYmFzY29fdGltZWxpbmVfMjAwNF90b19wcmVzZW50LmNzdlwiO1xuICAgIHJlbmRlclNjYXR0ZXJQbG90KHRlbXBvcmFsRGF0YXNldCk7XG59KTtcblxuLy8gU29tZXRoaW5nIHRvIHRoaW5rIGFib3V0IGxhdGVyOiBkbyBJIG5lZWQgdG8gY2xlYW4gdXAgZXZlbnQgbGlzdGVuZXJzICYgdGltZXJzP1xuLy8gQ2hlY2sgZm9yIGNsb3N1cmVzLCBtZW1vcnkgbGVhayBzb3VyY2VzPyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/scatter_plot.js":
/*!*****************************!*\
  !*** ./src/scatter_plot.js ***!
  \*****************************/
/*! exports provided: renderScatterPlot, colorScatterPlot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderScatterPlot\", function() { return renderScatterPlot; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"colorScatterPlot\", function() { return colorScatterPlot; });\nconst renderScatterPlot = dataset => {\n\n    const width = 720;\n    const height = 500;\n    const padding = 40;\n\n    let svg = d3.select(\".line-chart-container\").append(\"svg\")\n        .attr(\"width\", width)\n        .attr(\"height\", height);\n    \n    d3.csv(dataset).then(data => {\n\n        // Define x & y scales based on dataset\n        let xScale = d3.scaleTime()\n            .domain([new Date(2006, 0, 1), new Date(2019, 0, 6)])\n            .range([padding, width - padding]);\n            \n        let maxY = 100;\n        let yScale = d3.scaleLinear()\n            .domain([0, maxY])\n            .range([height - padding, padding]);\n\n        // Define axes based on x & y scales\n        let xAxis = d3.axisBottom(xScale);\n        let yAxis = d3.axisLeft(yScale);\n\n        // Render axes onto DOM\n        svg.append(\"g\")\n            .attr(\"class\", \"axis\")\n            .attr(\"transform\", \"translate(0,\" + (height - padding) + \")\")\n            .call(xAxis);\n        svg.append(\"g\")\n            .attr(\"class\", \"axis\")\n            .attr(\"transform\", \"translate(\" + padding + \", 0)\")\n            .call(yAxis);\n\n        // Tag and combine tabasco & sriracha data for scatterplot overlay\n        // Note: It didn't work when I tried to append first one column's data (tabasco),\n        // ...then another (sriracha) in two separate data joins and enter / append statements.\n        // ...Not quite sure why it didn't work...might have to do with the datasets being the\n        // ...same size and therefore not registering an enter selection.\n        // ...This implementation is a workaround that selects, joins, and appends both datasets at the same time.\n        // POTENTIAL REFACTOR LATER: PASS IN VARIABLES (instead of \"tabasco\", \"sriracha\")\n        let tabascoData = data.map(datum => {\n            let newRow = Object.assign({}, { Month: datum.Month, tabasco: datum.tabasco });\n            return newRow;\n        });\n        let srirachaData = data.map(datum => {\n            let newRow = Object.assign({}, { Month: datum.Month, sriracha: datum.sriracha });\n            return newRow;\n        });\n        let taggedCombinedData = tabascoData.concat(srirachaData);\n\n        // Render data as circles on the chart\n        svg.selectAll(\"circle\")\n            .data(taggedCombinedData)\n            .enter()\n            .append(\"circle\")\n            .attr(\"cx\", (datum) => {\n                return xScale(new Date(datum.Month))\n            })\n            .attr(\"cy\", datum => {\n                if (datum.tabasco !== undefined) {\n                    return yScale(datum.tabasco)\n                } else if (datum.sriracha !== undefined) {\n                    return yScale(datum.sriracha)\n                }\n            })\n            .attr(\"r\", \"5\")\n            .attr(\"fill\", datum => {\n                if (datum.tabasco !== undefined) {\n                    return \"lightgreen\";\n                } else if (datum.sriracha !== undefined) {\n                    return \"orange\";\n                }\n            });\n        colorScatterPlot();\n    });\n}\n\nconst colorScatterPlot = (year = \"2006\") => {\n    const selectFillColor = datum => {\n        let datumYr = datum.Month.split(\"-\")[0];\n        if (datumYr === year) {\n            if (datum.tabasco !== undefined) {\n                return \"darkgreen\";\n            } else if (datum.sriracha !== undefined) {\n                return \"red\";\n            }\n        } else {\n            if (datum.tabasco !== undefined) {\n                return \"lightgreen\";\n            } else if (datum.sriracha !== undefined) {\n                return \"orange\";\n            }\n        }\n    };\n\n    d3.selectAll(\"circle\")\n        .transition().duration(150) // may get rid of this\n        .style(\"fill\", selectFillColor);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NhdHRlcl9wbG90LmpzP2ZiYzQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsR0FBRyw2Q0FBNkM7QUFDekY7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx5Q0FBeUMsR0FBRywrQ0FBK0M7QUFDM0Y7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vc3JjL3NjYXR0ZXJfcGxvdC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCByZW5kZXJTY2F0dGVyUGxvdCA9IGRhdGFzZXQgPT4ge1xuXG4gICAgY29uc3Qgd2lkdGggPSA3MjA7XG4gICAgY29uc3QgaGVpZ2h0ID0gNTAwO1xuICAgIGNvbnN0IHBhZGRpbmcgPSA0MDtcblxuICAgIGxldCBzdmcgPSBkMy5zZWxlY3QoXCIubGluZS1jaGFydC1jb250YWluZXJcIikuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG4gICAgXG4gICAgZDMuY3N2KGRhdGFzZXQpLnRoZW4oZGF0YSA9PiB7XG5cbiAgICAgICAgLy8gRGVmaW5lIHggJiB5IHNjYWxlcyBiYXNlZCBvbiBkYXRhc2V0XG4gICAgICAgIGxldCB4U2NhbGUgPSBkMy5zY2FsZVRpbWUoKVxuICAgICAgICAgICAgLmRvbWFpbihbbmV3IERhdGUoMjAwNiwgMCwgMSksIG5ldyBEYXRlKDIwMTksIDAsIDYpXSlcbiAgICAgICAgICAgIC5yYW5nZShbcGFkZGluZywgd2lkdGggLSBwYWRkaW5nXSk7XG4gICAgICAgICAgICBcbiAgICAgICAgbGV0IG1heFkgPSAxMDA7XG4gICAgICAgIGxldCB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCBtYXhZXSlcbiAgICAgICAgICAgIC5yYW5nZShbaGVpZ2h0IC0gcGFkZGluZywgcGFkZGluZ10pO1xuXG4gICAgICAgIC8vIERlZmluZSBheGVzIGJhc2VkIG9uIHggJiB5IHNjYWxlc1xuICAgICAgICBsZXQgeEF4aXMgPSBkMy5heGlzQm90dG9tKHhTY2FsZSk7XG4gICAgICAgIGxldCB5QXhpcyA9IGQzLmF4aXNMZWZ0KHlTY2FsZSk7XG5cbiAgICAgICAgLy8gUmVuZGVyIGF4ZXMgb250byBET01cbiAgICAgICAgc3ZnLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJheGlzXCIpXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLFwiICsgKGhlaWdodCAtIHBhZGRpbmcpICsgXCIpXCIpXG4gICAgICAgICAgICAuY2FsbCh4QXhpcyk7XG4gICAgICAgIHN2Zy5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYXhpc1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBwYWRkaW5nICsgXCIsIDApXCIpXG4gICAgICAgICAgICAuY2FsbCh5QXhpcyk7XG5cbiAgICAgICAgLy8gVGFnIGFuZCBjb21iaW5lIHRhYmFzY28gJiBzcmlyYWNoYSBkYXRhIGZvciBzY2F0dGVycGxvdCBvdmVybGF5XG4gICAgICAgIC8vIE5vdGU6IEl0IGRpZG4ndCB3b3JrIHdoZW4gSSB0cmllZCB0byBhcHBlbmQgZmlyc3Qgb25lIGNvbHVtbidzIGRhdGEgKHRhYmFzY28pLFxuICAgICAgICAvLyAuLi50aGVuIGFub3RoZXIgKHNyaXJhY2hhKSBpbiB0d28gc2VwYXJhdGUgZGF0YSBqb2lucyBhbmQgZW50ZXIgLyBhcHBlbmQgc3RhdGVtZW50cy5cbiAgICAgICAgLy8gLi4uTm90IHF1aXRlIHN1cmUgd2h5IGl0IGRpZG4ndCB3b3JrLi4ubWlnaHQgaGF2ZSB0byBkbyB3aXRoIHRoZSBkYXRhc2V0cyBiZWluZyB0aGVcbiAgICAgICAgLy8gLi4uc2FtZSBzaXplIGFuZCB0aGVyZWZvcmUgbm90IHJlZ2lzdGVyaW5nIGFuIGVudGVyIHNlbGVjdGlvbi5cbiAgICAgICAgLy8gLi4uVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBhIHdvcmthcm91bmQgdGhhdCBzZWxlY3RzLCBqb2lucywgYW5kIGFwcGVuZHMgYm90aCBkYXRhc2V0cyBhdCB0aGUgc2FtZSB0aW1lLlxuICAgICAgICAvLyBQT1RFTlRJQUwgUkVGQUNUT1IgTEFURVI6IFBBU1MgSU4gVkFSSUFCTEVTIChpbnN0ZWFkIG9mIFwidGFiYXNjb1wiLCBcInNyaXJhY2hhXCIpXG4gICAgICAgIGxldCB0YWJhc2NvRGF0YSA9IGRhdGEubWFwKGRhdHVtID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdSb3cgPSBPYmplY3QuYXNzaWduKHt9LCB7IE1vbnRoOiBkYXR1bS5Nb250aCwgdGFiYXNjbzogZGF0dW0udGFiYXNjbyB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdSb3c7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgc3JpcmFjaGFEYXRhID0gZGF0YS5tYXAoZGF0dW0gPT4ge1xuICAgICAgICAgICAgbGV0IG5ld1JvdyA9IE9iamVjdC5hc3NpZ24oe30sIHsgTW9udGg6IGRhdHVtLk1vbnRoLCBzcmlyYWNoYTogZGF0dW0uc3JpcmFjaGEgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3Um93O1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHRhZ2dlZENvbWJpbmVkRGF0YSA9IHRhYmFzY29EYXRhLmNvbmNhdChzcmlyYWNoYURhdGEpO1xuXG4gICAgICAgIC8vIFJlbmRlciBkYXRhIGFzIGNpcmNsZXMgb24gdGhlIGNoYXJ0XG4gICAgICAgIHN2Zy5zZWxlY3RBbGwoXCJjaXJjbGVcIilcbiAgICAgICAgICAgIC5kYXRhKHRhZ2dlZENvbWJpbmVkRGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKFwiY2lyY2xlXCIpXG4gICAgICAgICAgICAuYXR0cihcImN4XCIsIChkYXR1bSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB4U2NhbGUobmV3IERhdGUoZGF0dW0uTW9udGgpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKFwiY3lcIiwgZGF0dW0gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXR1bS50YWJhc2NvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlTY2FsZShkYXR1bS50YWJhc2NvKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0dW0uc3JpcmFjaGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geVNjYWxlKGRhdHVtLnNyaXJhY2hhKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cihcInJcIiwgXCI1XCIpXG4gICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgZGF0dW0gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXR1bS50YWJhc2NvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwibGlnaHRncmVlblwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0dW0uc3JpcmFjaGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJvcmFuZ2VcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY29sb3JTY2F0dGVyUGxvdCgpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgY29uc3QgY29sb3JTY2F0dGVyUGxvdCA9ICh5ZWFyID0gXCIyMDA2XCIpID0+IHtcbiAgICBjb25zdCBzZWxlY3RGaWxsQ29sb3IgPSBkYXR1bSA9PiB7XG4gICAgICAgIGxldCBkYXR1bVlyID0gZGF0dW0uTW9udGguc3BsaXQoXCItXCIpWzBdO1xuICAgICAgICBpZiAoZGF0dW1ZciA9PT0geWVhcikge1xuICAgICAgICAgICAgaWYgKGRhdHVtLnRhYmFzY28gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcImRhcmtncmVlblwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXR1bS5zcmlyYWNoYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicmVkXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZGF0dW0udGFiYXNjbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibGlnaHRncmVlblwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXR1bS5zcmlyYWNoYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwib3JhbmdlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZDMuc2VsZWN0QWxsKFwiY2lyY2xlXCIpXG4gICAgICAgIC50cmFuc2l0aW9uKCkuZHVyYXRpb24oMTUwKSAvLyBtYXkgZ2V0IHJpZCBvZiB0aGlzXG4gICAgICAgIC5zdHlsZShcImZpbGxcIiwgc2VsZWN0RmlsbENvbG9yKTtcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/scatter_plot.js\n");

/***/ })

/******/ });