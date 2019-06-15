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

/***/ "./src/bar_chart.js":
/*!**************************!*\
  !*** ./src/bar_chart.js ***!
  \**************************/
/*! exports provided: renderBarChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderBarChart\", function() { return renderBarChart; });\nconst renderBarChart = dataset => {\n\n    const width = 650;\n    const height = 400;\n    const padding = 40;\n\n    let svg = d3.select(\".bar-chart-container\").append(\"svg\")\n        .attr(\"width\", width)\n        .attr(\"height\", height);\n\n    d3.csv(dataset).then(data => {\n\n        // Define x & y scales based on dataset\n        let xScale = d3.scaleLinear()   // should I use scaleBand?\n            .domain([0, 12])\n            .range([padding, width - padding]);\n        let xScaleLabels = d3.scaleLinear()   // should I use scaleBand?\n            .domain([0, 11])\n            .range([padding + 24, width - padding - 24]);\n        let yScale = d3.scaleLinear()\n            .domain([0, 100])\n            .range([height - padding, padding]);\n\n        // Define axes based on x & y scales\n        const months = [\n            \"Jan\", \"Feb\", \"Mar\", \"Apr\", \n            \"May\", \"Jun\", \"Jul\", \"Aug\", \n            \"Sep\", \"Oct\", \"Nov\", \"Dec\"\n        ];\n        let xAxis = d3.axisBottom(xScale)\n                    .tickFormat(\"\");\n        let xAxisLabels = d3.axisBottom(xScaleLabels)\n                    // .tickSize(0)\n                    .tickFormat(d => months[d]);\n        let yAxis = d3.axisLeft(yScale);\n\n        // Render axes onto DOM\n        svg.append(\"g\")\n            .attr(\"class\", \"axis\")\n            .attr(\"transform\", \"translate(0,\" + (height - padding) + \")\")\n            .call(xAxis);\n        svg.append(\"g\")\n            .attr(\"class\", \"axis\")\n            .attr(\"transform\", \"translate(\" + padding + \", 0)\")\n            .call(yAxis);\n\n        // Render x-axis label separately (for centering); might need a better solution\n        svg.append(\"g\")\n            .attr(\"class\", \"axis-labels\")\n            .attr(\"transform\", \"translate(0,\" + (height - padding) + \")\")\n            .call(xAxisLabels);\n        svg.selectAll(\".axis-labels\")\n            .selectAll(\".tick\")\n            .selectAll(\"line\")\n            .attr(\"stroke\", \"transparent\");\n\n        // Render data as bars on the chart\n        const filteredData = data.filter(datum => {\n            let [datumYr] = datum.Month.split(\"-\");\n            return datumYr === \"2016\";  // hardcoded for now\n        });\n        svg.selectAll(\"rect\")\n            .data(filteredData)\n            .enter()\n            .append(\"rect\")\n            .attr(\"class\", \"chocolate-bars\")\n            .attr(\"x\", datum => {\n                let [_, datumMonth] = datum.Month.split(\"-\");\n                return xScale(parseInt(datumMonth) - 1) + 6;    // Adding 6 to center bar graphs for now, but need a better way (also need to offset labels)\n            })\n            .attr(\"y\", datum => {\n                return height - padding - datum.chocolate;\n            })\n            .attr(\"width\", \"36\")\n            // .attr(\"width\", xScale.bandwidth())\n            .attr(\"height\", \"0\")\n            .attr(\"fill\", \"red\")\n            .transition()   // note: transition needs to precede any attributes that are to transition (should also BE preceded by initial values)\n            .duration(750) // hard-coded for now\n            // .ease(d3.easeLinear)\n            .attr(\"height\", datum => datum.chocolate)\n            .attr(\"fill\", \"orange\") // temporary blink of color to highlight the change\n            .transition()\n            .duration(500)\n            .attr(\"fill\", \"red\");\n\n        // exit data\n        svg.selectAll(\".chocolate-bars\")\n            .transition()\n            .delay(2000)\n            .duration(1000)\n            .attr(\"fill\", \"blue\")\n            .attr('height', 0)\n            .attr('y', height - padding)\n            .remove();\n    });\n\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFyX2NoYXJ0LmpzPzk5Y2QiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTREO0FBQzVELGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMIiwiZmlsZSI6Ii4vc3JjL2Jhcl9jaGFydC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCByZW5kZXJCYXJDaGFydCA9IGRhdGFzZXQgPT4ge1xuXG4gICAgY29uc3Qgd2lkdGggPSA2NTA7XG4gICAgY29uc3QgaGVpZ2h0ID0gNDAwO1xuICAgIGNvbnN0IHBhZGRpbmcgPSA0MDtcblxuICAgIGxldCBzdmcgPSBkMy5zZWxlY3QoXCIuYmFyLWNoYXJ0LWNvbnRhaW5lclwiKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcblxuICAgIGQzLmNzdihkYXRhc2V0KS50aGVuKGRhdGEgPT4ge1xuXG4gICAgICAgIC8vIERlZmluZSB4ICYgeSBzY2FsZXMgYmFzZWQgb24gZGF0YXNldFxuICAgICAgICBsZXQgeFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKSAgIC8vIHNob3VsZCBJIHVzZSBzY2FsZUJhbmQ/XG4gICAgICAgICAgICAuZG9tYWluKFswLCAxMl0pXG4gICAgICAgICAgICAucmFuZ2UoW3BhZGRpbmcsIHdpZHRoIC0gcGFkZGluZ10pO1xuICAgICAgICBsZXQgeFNjYWxlTGFiZWxzID0gZDMuc2NhbGVMaW5lYXIoKSAgIC8vIHNob3VsZCBJIHVzZSBzY2FsZUJhbmQ/XG4gICAgICAgICAgICAuZG9tYWluKFswLCAxMV0pXG4gICAgICAgICAgICAucmFuZ2UoW3BhZGRpbmcgKyAyNCwgd2lkdGggLSBwYWRkaW5nIC0gMjRdKTtcbiAgICAgICAgbGV0IHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzAsIDEwMF0pXG4gICAgICAgICAgICAucmFuZ2UoW2hlaWdodCAtIHBhZGRpbmcsIHBhZGRpbmddKTtcblxuICAgICAgICAvLyBEZWZpbmUgYXhlcyBiYXNlZCBvbiB4ICYgeSBzY2FsZXNcbiAgICAgICAgY29uc3QgbW9udGhzID0gW1xuICAgICAgICAgICAgXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXG4gICAgICAgICAgICBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcbiAgICAgICAgICAgIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJcbiAgICAgICAgXTtcbiAgICAgICAgbGV0IHhBeGlzID0gZDMuYXhpc0JvdHRvbSh4U2NhbGUpXG4gICAgICAgICAgICAgICAgICAgIC50aWNrRm9ybWF0KFwiXCIpO1xuICAgICAgICBsZXQgeEF4aXNMYWJlbHMgPSBkMy5heGlzQm90dG9tKHhTY2FsZUxhYmVscylcbiAgICAgICAgICAgICAgICAgICAgLy8gLnRpY2tTaXplKDApXG4gICAgICAgICAgICAgICAgICAgIC50aWNrRm9ybWF0KGQgPT4gbW9udGhzW2RdKTtcbiAgICAgICAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoeVNjYWxlKTtcblxuICAgICAgICAvLyBSZW5kZXIgYXhlcyBvbnRvIERPTVxuICAgICAgICBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImF4aXNcIilcbiAgICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyAoaGVpZ2h0IC0gcGFkZGluZykgKyBcIilcIilcbiAgICAgICAgICAgIC5jYWxsKHhBeGlzKTtcbiAgICAgICAgc3ZnLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJheGlzXCIpXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHBhZGRpbmcgKyBcIiwgMClcIilcbiAgICAgICAgICAgIC5jYWxsKHlBeGlzKTtcblxuICAgICAgICAvLyBSZW5kZXIgeC1heGlzIGxhYmVsIHNlcGFyYXRlbHkgKGZvciBjZW50ZXJpbmcpOyBtaWdodCBuZWVkIGEgYmV0dGVyIHNvbHV0aW9uXG4gICAgICAgIHN2Zy5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYXhpcy1sYWJlbHNcIilcbiAgICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyAoaGVpZ2h0IC0gcGFkZGluZykgKyBcIilcIilcbiAgICAgICAgICAgIC5jYWxsKHhBeGlzTGFiZWxzKTtcbiAgICAgICAgc3ZnLnNlbGVjdEFsbChcIi5heGlzLWxhYmVsc1wiKVxuICAgICAgICAgICAgLnNlbGVjdEFsbChcIi50aWNrXCIpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKFwibGluZVwiKVxuICAgICAgICAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCJ0cmFuc3BhcmVudFwiKTtcblxuICAgICAgICAvLyBSZW5kZXIgZGF0YSBhcyBiYXJzIG9uIHRoZSBjaGFydFxuICAgICAgICBjb25zdCBmaWx0ZXJlZERhdGEgPSBkYXRhLmZpbHRlcihkYXR1bSA9PiB7XG4gICAgICAgICAgICBsZXQgW2RhdHVtWXJdID0gZGF0dW0uTW9udGguc3BsaXQoXCItXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdHVtWXIgPT09IFwiMjAxNlwiOyAgLy8gaGFyZGNvZGVkIGZvciBub3dcbiAgICAgICAgfSk7XG4gICAgICAgIHN2Zy5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgICAgICAgICAuZGF0YShmaWx0ZXJlZERhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJjaG9jb2xhdGUtYmFyc1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJ4XCIsIGRhdHVtID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgW18sIGRhdHVtTW9udGhdID0gZGF0dW0uTW9udGguc3BsaXQoXCItXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB4U2NhbGUocGFyc2VJbnQoZGF0dW1Nb250aCkgLSAxKSArIDY7ICAgIC8vIEFkZGluZyA2IHRvIGNlbnRlciBiYXIgZ3JhcGhzIGZvciBub3csIGJ1dCBuZWVkIGEgYmV0dGVyIHdheSAoYWxzbyBuZWVkIHRvIG9mZnNldCBsYWJlbHMpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIGRhdHVtID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0IC0gcGFkZGluZyAtIGRhdHVtLmNob2NvbGF0ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIFwiMzZcIilcbiAgICAgICAgICAgIC8vIC5hdHRyKFwid2lkdGhcIiwgeFNjYWxlLmJhbmR3aWR0aCgpKVxuICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgXCIwXCIpXG4gICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJyZWRcIilcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKCkgICAvLyBub3RlOiB0cmFuc2l0aW9uIG5lZWRzIHRvIHByZWNlZGUgYW55IGF0dHJpYnV0ZXMgdGhhdCBhcmUgdG8gdHJhbnNpdGlvbiAoc2hvdWxkIGFsc28gQkUgcHJlY2VkZWQgYnkgaW5pdGlhbCB2YWx1ZXMpXG4gICAgICAgICAgICAuZHVyYXRpb24oNzUwKSAvLyBoYXJkLWNvZGVkIGZvciBub3dcbiAgICAgICAgICAgIC8vIC5lYXNlKGQzLmVhc2VMaW5lYXIpXG4gICAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCBkYXR1bSA9PiBkYXR1bS5jaG9jb2xhdGUpXG4gICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJvcmFuZ2VcIikgLy8gdGVtcG9yYXJ5IGJsaW5rIG9mIGNvbG9yIHRvIGhpZ2hsaWdodCB0aGUgY2hhbmdlXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwicmVkXCIpO1xuXG4gICAgICAgIC8vIGV4aXQgZGF0YVxuICAgICAgICBzdmcuc2VsZWN0QWxsKFwiLmNob2NvbGF0ZS1iYXJzXCIpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZGVsYXkoMjAwMClcbiAgICAgICAgICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwiYmx1ZVwiKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDApXG4gICAgICAgICAgICAuYXR0cigneScsIGhlaWdodCAtIHBhZGRpbmcpXG4gICAgICAgICAgICAucmVtb3ZlKCk7XG4gICAgfSk7XG5cbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/bar_chart.js\n");

/***/ }),

/***/ "./src/geomap.js":
/*!***********************!*\
  !*** ./src/geomap.js ***!
  \***********************/
/*! exports provided: renderGeoMap, colorGeoMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderGeoMap\", function() { return renderGeoMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"colorGeoMap\", function() { return colorGeoMap; });\n// // 10-point color scheme\n// const geoColor = d3.scaleThreshold()\n//     .domain([0, 0.1, 0.20, 0.30, 0.40, 0.50, 0.51, 0.60, 0.70, 0.80, 0.9, 1.0])\n    // .range([\"lightgray\", \"#00451b\", \"#197837\", \"#5aae61\", \"#a6dba0\", \"#d8f0d3\", \"#f7f7f7\", \"#e7d4e7\", \"#c2a5cf\", \"#9970ac\", \"#752a83\", \"#400b4b\"]);\n    // .range([\"lightgray\", \"#276319\", \"#4e9220\", \"#7fbc40\", \"#b8e086\", \"#e6f5d1\", \"#f7f7f7\", \"#fee0ef\", \"#f1b6da\", \"#de78ae\", \"#c5237d\", \"#8e1552\"]);\n    // .range([\"lightgray\", \"#2d094b\", \"#532688\", \"#8073ac\", \"#b2abd2\", \"#d8dbeb\", \"#f7f7f7\", \"#fee0b6\", \"#fdb863\", \"#e18215\", \"#b35805\", \"#7f3b09\"]);\n    // .range([\"lightgray\", \"#003b2f\", \"#00665d\", \"#35968e\", \"#80cdc1\", \"#c6eae5\", \"#f7f7f7\", \"#fee0b6\", \"#fdb863\", \"#e18215\", \"#b35805\", \"#7f3b09\"]);\n\n// 7-point color scheme\nconst geoColor = d3.scaleThreshold()\n    .domain([0, 0.15, 0.30, 0.45, 0.55, 0.70, 0.85, 1.0])\n    .range([\"lightgray\", \"#009392\", \"#39B185\", \"#9CCB86\", \"#E9E29C\", \"#EEB479\", \"#E88471\", \"#CF597E\"]); // color scheme 1 (green-red)\n    // .range([\"lightgray\", \"#228B3B\", \"#6CBA7D\", \"#CDE5D2\", \"#FCE1A4\", \"#FABF7B\", \"#E05C5C\", \"#AB1866\"]); // color scheme 2 (green-magenta)\n    // .range([\"lightgray\", \"#3C93C2\", \"#6CB0D6\", \"#9EC9E2\", \"#E1F2E3\", \"#FEB24C\", \"#FD8D3C\", \"#FC4E2A\"]); // color scheme 3 (blue-orange)\n\nconst renderGeoMap = dataset => {  // renderGeoMap doesn't use dataset directly, but passes it to colorGeoMap()\n    const width = 720;\n    const height = 500;\n\n    const projection = d3.geoAlbersUsa()\n        .scale(1000)\n        .translate([width / 2, height / 2]);\n\n    const path = d3.geoPath()\n        .projection(projection);\n\n    let svg = d3.select(\".geomap-container\").append(\"svg\")\n        .attr(\"width\", width)\n        .attr(\"height\", height);\n\n    d3.json(\"assets/data/cb_2018_us_state_5m.json\").then(us => {\n        svg.append(\"g\")\n            .selectAll(\"path\")\n            .data(topojson.feature(us, us.objects.cb_2018_us_state_5m).features)\n            .enter()\n            .append(\"path\")\n            .attr(\"d\", path)\n            .attr(\"class\", \"states\")\n            .style(\"fill\", \"lightgray\");\n        colorGeoMap(dataset);\n    });\n}\n\nconst colorGeoMap = (dataset, year = \"2006\") => {\n\n    d3.csv(dataset).then(data => {\n        const filteredData = data.filter(datum => datum.year === year);\n        let searchFreqByState = {};\n        filteredData.forEach(datum => {\n            if (datum.sriracha === \"0\" && datum.tabasco === \"0\") {\n                searchFreqByState[datum.Region] = -0.2;\n            } else {\n                searchFreqByState[datum.Region] = parseFloat(datum.sriracha);\n            }\n        });\n\n        d3.selectAll(\".states\")\n            .transition().duration(150) // may get rid of this\n            .style(\"fill\", d => {\n                let searchFreq = searchFreqByState[d.properties.NAME];\n                return geoColor(searchFreq);\n            });\n    });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2VvbWFwLmpzPzg5MGQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUdBQXVHO0FBQ3ZHLDBHQUEwRztBQUMxRywwR0FBMEc7O0FBRW5HLGlDQUFpQztBQUN4QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixLQUFLO0FBQ0wiLCJmaWxlIjoiLi9zcmMvZ2VvbWFwLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gLy8gMTAtcG9pbnQgY29sb3Igc2NoZW1lXG4vLyBjb25zdCBnZW9Db2xvciA9IGQzLnNjYWxlVGhyZXNob2xkKClcbi8vICAgICAuZG9tYWluKFswLCAwLjEsIDAuMjAsIDAuMzAsIDAuNDAsIDAuNTAsIDAuNTEsIDAuNjAsIDAuNzAsIDAuODAsIDAuOSwgMS4wXSlcbiAgICAvLyAucmFuZ2UoW1wibGlnaHRncmF5XCIsIFwiIzAwNDUxYlwiLCBcIiMxOTc4MzdcIiwgXCIjNWFhZTYxXCIsIFwiI2E2ZGJhMFwiLCBcIiNkOGYwZDNcIiwgXCIjZjdmN2Y3XCIsIFwiI2U3ZDRlN1wiLCBcIiNjMmE1Y2ZcIiwgXCIjOTk3MGFjXCIsIFwiIzc1MmE4M1wiLCBcIiM0MDBiNGJcIl0pO1xuICAgIC8vIC5yYW5nZShbXCJsaWdodGdyYXlcIiwgXCIjMjc2MzE5XCIsIFwiIzRlOTIyMFwiLCBcIiM3ZmJjNDBcIiwgXCIjYjhlMDg2XCIsIFwiI2U2ZjVkMVwiLCBcIiNmN2Y3ZjdcIiwgXCIjZmVlMGVmXCIsIFwiI2YxYjZkYVwiLCBcIiNkZTc4YWVcIiwgXCIjYzUyMzdkXCIsIFwiIzhlMTU1MlwiXSk7XG4gICAgLy8gLnJhbmdlKFtcImxpZ2h0Z3JheVwiLCBcIiMyZDA5NGJcIiwgXCIjNTMyNjg4XCIsIFwiIzgwNzNhY1wiLCBcIiNiMmFiZDJcIiwgXCIjZDhkYmViXCIsIFwiI2Y3ZjdmN1wiLCBcIiNmZWUwYjZcIiwgXCIjZmRiODYzXCIsIFwiI2UxODIxNVwiLCBcIiNiMzU4MDVcIiwgXCIjN2YzYjA5XCJdKTtcbiAgICAvLyAucmFuZ2UoW1wibGlnaHRncmF5XCIsIFwiIzAwM2IyZlwiLCBcIiMwMDY2NWRcIiwgXCIjMzU5NjhlXCIsIFwiIzgwY2RjMVwiLCBcIiNjNmVhZTVcIiwgXCIjZjdmN2Y3XCIsIFwiI2ZlZTBiNlwiLCBcIiNmZGI4NjNcIiwgXCIjZTE4MjE1XCIsIFwiI2IzNTgwNVwiLCBcIiM3ZjNiMDlcIl0pO1xuXG4vLyA3LXBvaW50IGNvbG9yIHNjaGVtZVxuY29uc3QgZ2VvQ29sb3IgPSBkMy5zY2FsZVRocmVzaG9sZCgpXG4gICAgLmRvbWFpbihbMCwgMC4xNSwgMC4zMCwgMC40NSwgMC41NSwgMC43MCwgMC44NSwgMS4wXSlcbiAgICAucmFuZ2UoW1wibGlnaHRncmF5XCIsIFwiIzAwOTM5MlwiLCBcIiMzOUIxODVcIiwgXCIjOUNDQjg2XCIsIFwiI0U5RTI5Q1wiLCBcIiNFRUI0NzlcIiwgXCIjRTg4NDcxXCIsIFwiI0NGNTk3RVwiXSk7IC8vIGNvbG9yIHNjaGVtZSAxIChncmVlbi1yZWQpXG4gICAgLy8gLnJhbmdlKFtcImxpZ2h0Z3JheVwiLCBcIiMyMjhCM0JcIiwgXCIjNkNCQTdEXCIsIFwiI0NERTVEMlwiLCBcIiNGQ0UxQTRcIiwgXCIjRkFCRjdCXCIsIFwiI0UwNUM1Q1wiLCBcIiNBQjE4NjZcIl0pOyAvLyBjb2xvciBzY2hlbWUgMiAoZ3JlZW4tbWFnZW50YSlcbiAgICAvLyAucmFuZ2UoW1wibGlnaHRncmF5XCIsIFwiIzNDOTNDMlwiLCBcIiM2Q0IwRDZcIiwgXCIjOUVDOUUyXCIsIFwiI0UxRjJFM1wiLCBcIiNGRUIyNENcIiwgXCIjRkQ4RDNDXCIsIFwiI0ZDNEUyQVwiXSk7IC8vIGNvbG9yIHNjaGVtZSAzIChibHVlLW9yYW5nZSlcblxuZXhwb3J0IGNvbnN0IHJlbmRlckdlb01hcCA9IGRhdGFzZXQgPT4geyAgLy8gcmVuZGVyR2VvTWFwIGRvZXNuJ3QgdXNlIGRhdGFzZXQgZGlyZWN0bHksIGJ1dCBwYXNzZXMgaXQgdG8gY29sb3JHZW9NYXAoKVxuICAgIGNvbnN0IHdpZHRoID0gNzIwO1xuICAgIGNvbnN0IGhlaWdodCA9IDUwMDtcblxuICAgIGNvbnN0IHByb2plY3Rpb24gPSBkMy5nZW9BbGJlcnNVc2EoKVxuICAgICAgICAuc2NhbGUoMTAwMClcbiAgICAgICAgLnRyYW5zbGF0ZShbd2lkdGggLyAyLCBoZWlnaHQgLyAyXSk7XG5cbiAgICBjb25zdCBwYXRoID0gZDMuZ2VvUGF0aCgpXG4gICAgICAgIC5wcm9qZWN0aW9uKHByb2plY3Rpb24pO1xuXG4gICAgbGV0IHN2ZyA9IGQzLnNlbGVjdChcIi5nZW9tYXAtY29udGFpbmVyXCIpLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpO1xuXG4gICAgZDMuanNvbihcImFzc2V0cy9kYXRhL2NiXzIwMThfdXNfc3RhdGVfNW0uanNvblwiKS50aGVuKHVzID0+IHtcbiAgICAgICAgc3ZnLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAgICAgICAuZGF0YSh0b3BvanNvbi5mZWF0dXJlKHVzLCB1cy5vYmplY3RzLmNiXzIwMThfdXNfc3RhdGVfNW0pLmZlYXR1cmVzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgcGF0aClcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdGF0ZXNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgXCJsaWdodGdyYXlcIik7XG4gICAgICAgIGNvbG9yR2VvTWFwKGRhdGFzZXQpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgY29uc3QgY29sb3JHZW9NYXAgPSAoZGF0YXNldCwgeWVhciA9IFwiMjAwNlwiKSA9PiB7XG5cbiAgICBkMy5jc3YoZGF0YXNldCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgY29uc3QgZmlsdGVyZWREYXRhID0gZGF0YS5maWx0ZXIoZGF0dW0gPT4gZGF0dW0ueWVhciA9PT0geWVhcik7XG4gICAgICAgIGxldCBzZWFyY2hGcmVxQnlTdGF0ZSA9IHt9O1xuICAgICAgICBmaWx0ZXJlZERhdGEuZm9yRWFjaChkYXR1bSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0dW0uc3JpcmFjaGEgPT09IFwiMFwiICYmIGRhdHVtLnRhYmFzY28gPT09IFwiMFwiKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoRnJlcUJ5U3RhdGVbZGF0dW0uUmVnaW9uXSA9IC0wLjI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlYXJjaEZyZXFCeVN0YXRlW2RhdHVtLlJlZ2lvbl0gPSBwYXJzZUZsb2F0KGRhdHVtLnNyaXJhY2hhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZDMuc2VsZWN0QWxsKFwiLnN0YXRlc1wiKVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKS5kdXJhdGlvbigxNTApIC8vIG1heSBnZXQgcmlkIG9mIHRoaXNcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaEZyZXEgPSBzZWFyY2hGcmVxQnlTdGF0ZVtkLnByb3BlcnRpZXMuTkFNRV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlb0NvbG9yKHNlYXJjaEZyZXEpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/geomap.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _geomap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geomap */ \"./src/geomap.js\");\n/* harmony import */ var _scatter_plot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scatter_plot */ \"./src/scatter_plot.js\");\n/* harmony import */ var _bar_chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bar_chart */ \"./src/bar_chart.js\");\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n\n    // Years for time slider\n    const year = [\n        \"2006\", \"2007\", \"2008\", \n        \"2009\", \"2010\", \"2011\", \n        \"2012\", \"2013\", \"2014\", \n        \"2015\", \"2016\", \"2017\", \n        \"2018\", \"2019\"\n    ];\n\n    // This dataset should dynamically change based on the comparison selected\n    // (Will prob have a menu allowing users to select food comparison)\n    // Refactor later to assign dataset based on the input value\n    // ...may need a dictionary or to rename data files to faciliate interpolation\n    let geoDataset = \"assets/data/sriracha/sriracha_vs_tabasco_geo_trended.csv\";\n\n    d3.select(\"#timeslide\").on(\"input\", function() {\n        document.getElementById(\"range\").innerHTML = year[this.value];\n        Object(_geomap__WEBPACK_IMPORTED_MODULE_0__[\"colorGeoMap\"])(geoDataset, `${year[this.value]}`);\n        Object(_scatter_plot__WEBPACK_IMPORTED_MODULE_1__[\"colorScatterPlot\"])(`${year[this.value]}`);\n    });\n\n    Object(_geomap__WEBPACK_IMPORTED_MODULE_0__[\"renderGeoMap\"])(geoDataset);\n    \n    let temporalDataset = \"assets/data/sriracha/sriracha_tabasco_timeline_2004_to_present.csv\";\n    Object(_scatter_plot__WEBPACK_IMPORTED_MODULE_1__[\"renderScatterPlot\"])(temporalDataset);\n\n    let seasonalDataset = \"assets/data/seasonal/chocolate.csv\";\n    Object(_bar_chart__WEBPACK_IMPORTED_MODULE_2__[\"renderBarChart\"])(seasonalDataset);\n});\n\n// Something to think about later: do I need to clean up event listeners & timers?\n// Check for closures, memory leak sources?//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFxRDtBQUNnQjtBQUN4Qjs7QUFFN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLDJEQUFXLGdCQUFnQixpQkFBaUI7QUFDcEQsUUFBUSxzRUFBZ0IsSUFBSSxpQkFBaUI7QUFDN0MsS0FBSzs7QUFFTCxJQUFJLDREQUFZOztBQUVoQjtBQUNBLElBQUksdUVBQWlCOztBQUVyQjtBQUNBLElBQUksaUVBQWM7QUFDbEIsQ0FBQzs7QUFFRDtBQUNBIiwiZmlsZSI6Ii4vc3JjL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyR2VvTWFwLCBjb2xvckdlb01hcCB9IGZyb20gJy4vZ2VvbWFwJztcbmltcG9ydCB7IHJlbmRlclNjYXR0ZXJQbG90LCBjb2xvclNjYXR0ZXJQbG90IH0gZnJvbSAnLi9zY2F0dGVyX3Bsb3QnO1xuaW1wb3J0IHsgcmVuZGVyQmFyQ2hhcnQgfSBmcm9tICcuL2Jhcl9jaGFydCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICAgIC8vIFllYXJzIGZvciB0aW1lIHNsaWRlclxuICAgIGNvbnN0IHllYXIgPSBbXG4gICAgICAgIFwiMjAwNlwiLCBcIjIwMDdcIiwgXCIyMDA4XCIsIFxuICAgICAgICBcIjIwMDlcIiwgXCIyMDEwXCIsIFwiMjAxMVwiLCBcbiAgICAgICAgXCIyMDEyXCIsIFwiMjAxM1wiLCBcIjIwMTRcIiwgXG4gICAgICAgIFwiMjAxNVwiLCBcIjIwMTZcIiwgXCIyMDE3XCIsIFxuICAgICAgICBcIjIwMThcIiwgXCIyMDE5XCJcbiAgICBdO1xuXG4gICAgLy8gVGhpcyBkYXRhc2V0IHNob3VsZCBkeW5hbWljYWxseSBjaGFuZ2UgYmFzZWQgb24gdGhlIGNvbXBhcmlzb24gc2VsZWN0ZWRcbiAgICAvLyAoV2lsbCBwcm9iIGhhdmUgYSBtZW51IGFsbG93aW5nIHVzZXJzIHRvIHNlbGVjdCBmb29kIGNvbXBhcmlzb24pXG4gICAgLy8gUmVmYWN0b3IgbGF0ZXIgdG8gYXNzaWduIGRhdGFzZXQgYmFzZWQgb24gdGhlIGlucHV0IHZhbHVlXG4gICAgLy8gLi4ubWF5IG5lZWQgYSBkaWN0aW9uYXJ5IG9yIHRvIHJlbmFtZSBkYXRhIGZpbGVzIHRvIGZhY2lsaWF0ZSBpbnRlcnBvbGF0aW9uXG4gICAgbGV0IGdlb0RhdGFzZXQgPSBcImFzc2V0cy9kYXRhL3NyaXJhY2hhL3NyaXJhY2hhX3ZzX3RhYmFzY29fZ2VvX3RyZW5kZWQuY3N2XCI7XG5cbiAgICBkMy5zZWxlY3QoXCIjdGltZXNsaWRlXCIpLm9uKFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFuZ2VcIikuaW5uZXJIVE1MID0geWVhclt0aGlzLnZhbHVlXTtcbiAgICAgICAgY29sb3JHZW9NYXAoZ2VvRGF0YXNldCwgYCR7eWVhclt0aGlzLnZhbHVlXX1gKTtcbiAgICAgICAgY29sb3JTY2F0dGVyUGxvdChgJHt5ZWFyW3RoaXMudmFsdWVdfWApO1xuICAgIH0pO1xuXG4gICAgcmVuZGVyR2VvTWFwKGdlb0RhdGFzZXQpO1xuICAgIFxuICAgIGxldCB0ZW1wb3JhbERhdGFzZXQgPSBcImFzc2V0cy9kYXRhL3NyaXJhY2hhL3NyaXJhY2hhX3RhYmFzY29fdGltZWxpbmVfMjAwNF90b19wcmVzZW50LmNzdlwiO1xuICAgIHJlbmRlclNjYXR0ZXJQbG90KHRlbXBvcmFsRGF0YXNldCk7XG5cbiAgICBsZXQgc2Vhc29uYWxEYXRhc2V0ID0gXCJhc3NldHMvZGF0YS9zZWFzb25hbC9jaG9jb2xhdGUuY3N2XCI7XG4gICAgcmVuZGVyQmFyQ2hhcnQoc2Vhc29uYWxEYXRhc2V0KTtcbn0pO1xuXG4vLyBTb21ldGhpbmcgdG8gdGhpbmsgYWJvdXQgbGF0ZXI6IGRvIEkgbmVlZCB0byBjbGVhbiB1cCBldmVudCBsaXN0ZW5lcnMgJiB0aW1lcnM/XG4vLyBDaGVjayBmb3IgY2xvc3VyZXMsIG1lbW9yeSBsZWFrIHNvdXJjZXM/Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/scatter_plot.js":
/*!*****************************!*\
  !*** ./src/scatter_plot.js ***!
  \*****************************/
/*! exports provided: renderScatterPlot, colorScatterPlot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderScatterPlot\", function() { return renderScatterPlot; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"colorScatterPlot\", function() { return colorScatterPlot; });\nconst renderScatterPlot = dataset => {\n\n    const width = 720;\n    const height = 500;\n    const padding = 40;\n\n    let svg = d3.select(\".scatter-plot-container\").append(\"svg\")\n        .attr(\"width\", width)\n        .attr(\"height\", height);\n    \n    d3.csv(dataset).then(data => {\n\n        // Define x & y scales based on dataset\n        let xScale = d3.scaleTime()\n            .domain([new Date(2006, 0, 1), new Date(2019, 0, 6)])\n            .range([padding, width - padding]);\n        let yScale = d3.scaleLinear()\n            .domain([0, 100])\n            .range([height - padding, padding]);\n\n        // Define axes based on x & y scales\n        let xAxis = d3.axisBottom(xScale);\n        let yAxis = d3.axisLeft(yScale);\n\n        // Render axes onto DOM\n        svg.append(\"g\")\n            .attr(\"class\", \"axis\")\n            .attr(\"transform\", \"translate(0,\" + (height - padding) + \")\")\n            .call(xAxis);\n        svg.append(\"g\")\n            .attr(\"class\", \"axis\")\n            .attr(\"transform\", \"translate(\" + padding + \", 0)\")\n            .call(yAxis);\n\n        // Tag and combine tabasco & sriracha data for scatterplot overlay\n        // Note: It didn't work when I tried to append first one column's data (tabasco),\n        // ...then another (sriracha) in two separate data joins and enter / append statements.\n        // ...Not quite sure why it didn't work...might have to do with the datasets being the\n        // ...same size and therefore not registering an enter selection.\n        // ...This implementation is a workaround that selects, joins, and appends both datasets at the same time.\n        // POTENTIAL REFACTOR LATER: PASS IN VARIABLES (instead of \"tabasco\", \"sriracha\")\n        let tabascoData = data.map(datum => {\n            let newRow = Object.assign({}, { Month: datum.Month, tabasco: datum.tabasco });\n            return newRow;\n        });\n        let srirachaData = data.map(datum => {\n            let newRow = Object.assign({}, { Month: datum.Month, sriracha: datum.sriracha });\n            return newRow;\n        });\n        let taggedCombinedData = tabascoData.concat(srirachaData);\n\n        // Render data as circles on the chart\n        svg.selectAll(\"circle\")\n            .data(taggedCombinedData)\n            .enter()\n            .append(\"circle\")\n            .attr(\"cx\", (datum) => {\n                return xScale(new Date(datum.Month))\n            })\n            .attr(\"cy\", datum => {\n                if (datum.tabasco !== undefined) {\n                    return yScale(datum.tabasco)\n                } else if (datum.sriracha !== undefined) {\n                    return yScale(datum.sriracha)\n                }\n            })\n            .attr(\"r\", \"5\")\n            .attr(\"fill\", datum => {\n                if (datum.tabasco !== undefined) {\n                    return \"lightgreen\";\n                } else if (datum.sriracha !== undefined) {\n                    return \"orange\";\n                }\n            });\n        colorScatterPlot();\n    });\n}\n\nconst colorScatterPlot = (year = \"2006\") => {\n    const selectFillColor = datum => {\n        // let datumYr = datum.Month.split(\"-\")[0];\n        let [datumYr] = datum.Month.split(\"-\"); // try out some JS array destructuring\n        if (datumYr === year) {\n            if (datum.tabasco !== undefined) {\n                return \"darkgreen\";\n            } else if (datum.sriracha !== undefined) {\n                return \"red\";\n            }\n        } else {\n            if (datum.tabasco !== undefined) {\n                return \"lightgreen\";\n            } else if (datum.sriracha !== undefined) {\n                return \"orange\";\n            }\n        }\n    };\n\n    d3.selectAll(\"circle\")\n        .transition().duration(150) // may get rid of this\n        .style(\"fill\", selectFillColor);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NhdHRlcl9wbG90LmpzP2ZiYzQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsR0FBRyw2Q0FBNkM7QUFDekY7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx5Q0FBeUMsR0FBRywrQ0FBK0M7QUFDM0Y7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDs7QUFFTztBQUNQO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL3NyYy9zY2F0dGVyX3Bsb3QuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgcmVuZGVyU2NhdHRlclBsb3QgPSBkYXRhc2V0ID0+IHtcblxuICAgIGNvbnN0IHdpZHRoID0gNzIwO1xuICAgIGNvbnN0IGhlaWdodCA9IDUwMDtcbiAgICBjb25zdCBwYWRkaW5nID0gNDA7XG5cbiAgICBsZXQgc3ZnID0gZDMuc2VsZWN0KFwiLnNjYXR0ZXItcGxvdC1jb250YWluZXJcIikuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG4gICAgXG4gICAgZDMuY3N2KGRhdGFzZXQpLnRoZW4oZGF0YSA9PiB7XG5cbiAgICAgICAgLy8gRGVmaW5lIHggJiB5IHNjYWxlcyBiYXNlZCBvbiBkYXRhc2V0XG4gICAgICAgIGxldCB4U2NhbGUgPSBkMy5zY2FsZVRpbWUoKVxuICAgICAgICAgICAgLmRvbWFpbihbbmV3IERhdGUoMjAwNiwgMCwgMSksIG5ldyBEYXRlKDIwMTksIDAsIDYpXSlcbiAgICAgICAgICAgIC5yYW5nZShbcGFkZGluZywgd2lkdGggLSBwYWRkaW5nXSk7XG4gICAgICAgIGxldCB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCAxMDBdKVxuICAgICAgICAgICAgLnJhbmdlKFtoZWlnaHQgLSBwYWRkaW5nLCBwYWRkaW5nXSk7XG5cbiAgICAgICAgLy8gRGVmaW5lIGF4ZXMgYmFzZWQgb24geCAmIHkgc2NhbGVzXG4gICAgICAgIGxldCB4QXhpcyA9IGQzLmF4aXNCb3R0b20oeFNjYWxlKTtcbiAgICAgICAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoeVNjYWxlKTtcblxuICAgICAgICAvLyBSZW5kZXIgYXhlcyBvbnRvIERPTVxuICAgICAgICBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImF4aXNcIilcbiAgICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyAoaGVpZ2h0IC0gcGFkZGluZykgKyBcIilcIilcbiAgICAgICAgICAgIC5jYWxsKHhBeGlzKTtcbiAgICAgICAgc3ZnLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJheGlzXCIpXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHBhZGRpbmcgKyBcIiwgMClcIilcbiAgICAgICAgICAgIC5jYWxsKHlBeGlzKTtcblxuICAgICAgICAvLyBUYWcgYW5kIGNvbWJpbmUgdGFiYXNjbyAmIHNyaXJhY2hhIGRhdGEgZm9yIHNjYXR0ZXJwbG90IG92ZXJsYXlcbiAgICAgICAgLy8gTm90ZTogSXQgZGlkbid0IHdvcmsgd2hlbiBJIHRyaWVkIHRvIGFwcGVuZCBmaXJzdCBvbmUgY29sdW1uJ3MgZGF0YSAodGFiYXNjbyksXG4gICAgICAgIC8vIC4uLnRoZW4gYW5vdGhlciAoc3JpcmFjaGEpIGluIHR3byBzZXBhcmF0ZSBkYXRhIGpvaW5zIGFuZCBlbnRlciAvIGFwcGVuZCBzdGF0ZW1lbnRzLlxuICAgICAgICAvLyAuLi5Ob3QgcXVpdGUgc3VyZSB3aHkgaXQgZGlkbid0IHdvcmsuLi5taWdodCBoYXZlIHRvIGRvIHdpdGggdGhlIGRhdGFzZXRzIGJlaW5nIHRoZVxuICAgICAgICAvLyAuLi5zYW1lIHNpemUgYW5kIHRoZXJlZm9yZSBub3QgcmVnaXN0ZXJpbmcgYW4gZW50ZXIgc2VsZWN0aW9uLlxuICAgICAgICAvLyAuLi5UaGlzIGltcGxlbWVudGF0aW9uIGlzIGEgd29ya2Fyb3VuZCB0aGF0IHNlbGVjdHMsIGpvaW5zLCBhbmQgYXBwZW5kcyBib3RoIGRhdGFzZXRzIGF0IHRoZSBzYW1lIHRpbWUuXG4gICAgICAgIC8vIFBPVEVOVElBTCBSRUZBQ1RPUiBMQVRFUjogUEFTUyBJTiBWQVJJQUJMRVMgKGluc3RlYWQgb2YgXCJ0YWJhc2NvXCIsIFwic3JpcmFjaGFcIilcbiAgICAgICAgbGV0IHRhYmFzY29EYXRhID0gZGF0YS5tYXAoZGF0dW0gPT4ge1xuICAgICAgICAgICAgbGV0IG5ld1JvdyA9IE9iamVjdC5hc3NpZ24oe30sIHsgTW9udGg6IGRhdHVtLk1vbnRoLCB0YWJhc2NvOiBkYXR1bS50YWJhc2NvIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld1JvdztcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBzcmlyYWNoYURhdGEgPSBkYXRhLm1hcChkYXR1bSA9PiB7XG4gICAgICAgICAgICBsZXQgbmV3Um93ID0gT2JqZWN0LmFzc2lnbih7fSwgeyBNb250aDogZGF0dW0uTW9udGgsIHNyaXJhY2hhOiBkYXR1bS5zcmlyYWNoYSB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdSb3c7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgdGFnZ2VkQ29tYmluZWREYXRhID0gdGFiYXNjb0RhdGEuY29uY2F0KHNyaXJhY2hhRGF0YSk7XG5cbiAgICAgICAgLy8gUmVuZGVyIGRhdGEgYXMgY2lyY2xlcyBvbiB0aGUgY2hhcnRcbiAgICAgICAgc3ZnLnNlbGVjdEFsbChcImNpcmNsZVwiKVxuICAgICAgICAgICAgLmRhdGEodGFnZ2VkQ29tYmluZWREYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY3hcIiwgKGRhdHVtKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHhTY2FsZShuZXcgRGF0ZShkYXR1bS5Nb250aCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoXCJjeVwiLCBkYXR1bSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdHVtLnRhYmFzY28gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geVNjYWxlKGRhdHVtLnRhYmFzY28pXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXR1bS5zcmlyYWNoYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5U2NhbGUoZGF0dW0uc3JpcmFjaGEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKFwiclwiLCBcIjVcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZmlsbFwiLCBkYXR1bSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdHVtLnRhYmFzY28gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJsaWdodGdyZWVuXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXR1bS5zcmlyYWNoYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIm9yYW5nZVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjb2xvclNjYXR0ZXJQbG90KCk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBjb2xvclNjYXR0ZXJQbG90ID0gKHllYXIgPSBcIjIwMDZcIikgPT4ge1xuICAgIGNvbnN0IHNlbGVjdEZpbGxDb2xvciA9IGRhdHVtID0+IHtcbiAgICAgICAgLy8gbGV0IGRhdHVtWXIgPSBkYXR1bS5Nb250aC5zcGxpdChcIi1cIilbMF07XG4gICAgICAgIGxldCBbZGF0dW1Zcl0gPSBkYXR1bS5Nb250aC5zcGxpdChcIi1cIik7IC8vIHRyeSBvdXQgc29tZSBKUyBhcnJheSBkZXN0cnVjdHVyaW5nXG4gICAgICAgIGlmIChkYXR1bVlyID09PSB5ZWFyKSB7XG4gICAgICAgICAgICBpZiAoZGF0dW0udGFiYXNjbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZGFya2dyZWVuXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdHVtLnNyaXJhY2hhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJyZWRcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkYXR1bS50YWJhc2NvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJsaWdodGdyZWVuXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdHVtLnNyaXJhY2hhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJvcmFuZ2VcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBkMy5zZWxlY3RBbGwoXCJjaXJjbGVcIilcbiAgICAgICAgLnRyYW5zaXRpb24oKS5kdXJhdGlvbigxNTApIC8vIG1heSBnZXQgcmlkIG9mIHRoaXNcbiAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBzZWxlY3RGaWxsQ29sb3IpO1xufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/scatter_plot.js\n");

/***/ })

/******/ });