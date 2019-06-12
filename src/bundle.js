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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("document.addEventListener(\"DOMContentLoaded\", () => {\n    // IMPORTANT NOTE: RIGHT NOW, THIS IS CODE I WROTE FOR A TUTORIAL, AS PROOF OF CONCEPT\n    // NOT MY OWN PROJECT CODE (but I didn't just copy / paste)\n    // Tutorial source: http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/\n\n    // alert('hello!!!');\n    // console.log('this should print in the console!')\n    // debugger\n\n    const width = 720,\n        height = 500;\n\n    // console.log(width);\n    // console.log(height);\n\n    const projection = d3.geoAlbersUsa()\n        .scale(1000)\n        .translate([width / 2, height / 2]);\n\n    const path = d3.geoPath()\n        .projection(projection);\n\n    let svg = d3.select(\"body\").append(\"svg\")\n        .attr(\"width\", width)\n        .attr(\"height\", height);\n\n    // VERSION 5 SYNTAX: PROMISES\n    d3.json(\"assets/data/us.json\").then(us => {\n        // debugger\n        d3.tsv(\"assets/data/us_unemployment_2008.tsv\").then(unemployment => {\n\n            let rateById = {};  // empty object to hold dataset\n            unemployment.forEach(d => {\n                rateById[d.id] = d.rate;    // populate object with each county's rate (retrieve and set at a key of each county's id)\n            });\n            // console.log(rateById);\n\n            svg.append(\"g\")\n                .attr(\"class\", \"counties\")\n                .selectAll(\"path\")\n                .data(topojson.feature(us, us.objects.counties).features) // Bind TopoJSON data elements\n                .enter().append(\"path\")\n                .attr(\"d\", path)\n                .style(\"fill\", d => {\n                    let rateValue = rateById[d.id]; // get unemployment rate for the given data point (match by id)\n                    return color(rateValue);    // pass unemployment rate into color function (defined below) to get the correct fill color\n                });\n            // .style(\"stroke\", \"black\");\n\n            svg.append('path')\n                .datum(topojson.mesh(us, us.objects.states, (a, b) => {\n                    // console.log(us.objects.states);\n                    return a.id !== b.id;\n                }))\n                .attr(\"class\", \"states\")\n                // .attr(\"fill\", \"none\")   // inline styling --> right now application.css is dictating the style\n                // .attr(\"stroke\", \"white\")  // inline styling --> right now application.css is dictating the style\n                .attr(\"d\", path);\n        });\n\n        let color = d3.scaleThreshold()\n            .domain([0.02, 0.04, 0.06, 0.08, 0.10])\n            .range([\"#F0F0F0\", \"#b2d8d8\", \"#66b2b2\", \"#008080\", \"#006666\", \"#004c4c\"]);\n            // .range([\"#f2f0f7\", \"#dadaeb\", \"#bcbddc\", \"#9e9ac8\", \"#756bb1\", \"#54278f\"]);  // different color palette\n    });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEI7QUFDOUI7QUFDQSx3Q0FBd0M7QUFDeEMsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25ELDRDQUE0QztBQUM1QyxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLDBGQUEwRjtBQUMxRixLQUFLO0FBQ0wsQ0FBQyIsImZpbGUiOiIuL3NyYy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICAvLyBJTVBPUlRBTlQgTk9URTogUklHSFQgTk9XLCBUSElTIElTIENPREUgSSBXUk9URSBGT1IgQSBUVVRPUklBTCwgQVMgUFJPT0YgT0YgQ09OQ0VQVFxuICAgIC8vIE5PVCBNWSBPV04gUFJPSkVDVCBDT0RFIChidXQgSSBkaWRuJ3QganVzdCBjb3B5IC8gcGFzdGUpXG4gICAgLy8gVHV0b3JpYWwgc291cmNlOiBodHRwOi8vZHVzcHZpei5taXQuZWR1L2QzLXdvcmtzaG9wL21hcHBpbmctZGF0YS13aXRoLWQzL1xuXG4gICAgLy8gYWxlcnQoJ2hlbGxvISEhJyk7XG4gICAgLy8gY29uc29sZS5sb2coJ3RoaXMgc2hvdWxkIHByaW50IGluIHRoZSBjb25zb2xlIScpXG4gICAgLy8gZGVidWdnZXJcblxuICAgIGNvbnN0IHdpZHRoID0gNzIwLFxuICAgICAgICBoZWlnaHQgPSA1MDA7XG5cbiAgICAvLyBjb25zb2xlLmxvZyh3aWR0aCk7XG4gICAgLy8gY29uc29sZS5sb2coaGVpZ2h0KTtcblxuICAgIGNvbnN0IHByb2plY3Rpb24gPSBkMy5nZW9BbGJlcnNVc2EoKVxuICAgICAgICAuc2NhbGUoMTAwMClcbiAgICAgICAgLnRyYW5zbGF0ZShbd2lkdGggLyAyLCBoZWlnaHQgLyAyXSk7XG5cbiAgICBjb25zdCBwYXRoID0gZDMuZ2VvUGF0aCgpXG4gICAgICAgIC5wcm9qZWN0aW9uKHByb2plY3Rpb24pO1xuXG4gICAgbGV0IHN2ZyA9IGQzLnNlbGVjdChcImJvZHlcIikuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbiAgICAvLyBWRVJTSU9OIDUgU1lOVEFYOiBQUk9NSVNFU1xuICAgIGQzLmpzb24oXCJhc3NldHMvZGF0YS91cy5qc29uXCIpLnRoZW4odXMgPT4ge1xuICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICBkMy50c3YoXCJhc3NldHMvZGF0YS91c191bmVtcGxveW1lbnRfMjAwOC50c3ZcIikudGhlbih1bmVtcGxveW1lbnQgPT4ge1xuXG4gICAgICAgICAgICBsZXQgcmF0ZUJ5SWQgPSB7fTsgIC8vIGVtcHR5IG9iamVjdCB0byBob2xkIGRhdGFzZXRcbiAgICAgICAgICAgIHVuZW1wbG95bWVudC5mb3JFYWNoKGQgPT4ge1xuICAgICAgICAgICAgICAgIHJhdGVCeUlkW2QuaWRdID0gZC5yYXRlOyAgICAvLyBwb3B1bGF0ZSBvYmplY3Qgd2l0aCBlYWNoIGNvdW50eSdzIHJhdGUgKHJldHJpZXZlIGFuZCBzZXQgYXQgYSBrZXkgb2YgZWFjaCBjb3VudHkncyBpZClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmF0ZUJ5SWQpO1xuXG4gICAgICAgICAgICBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJjb3VudGllc1wiKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAgICAgICAgICAgLmRhdGEodG9wb2pzb24uZmVhdHVyZSh1cywgdXMub2JqZWN0cy5jb3VudGllcykuZmVhdHVyZXMpIC8vIEJpbmQgVG9wb0pTT04gZGF0YSBlbGVtZW50c1xuICAgICAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImRcIiwgcGF0aClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmF0ZVZhbHVlID0gcmF0ZUJ5SWRbZC5pZF07IC8vIGdldCB1bmVtcGxveW1lbnQgcmF0ZSBmb3IgdGhlIGdpdmVuIGRhdGEgcG9pbnQgKG1hdGNoIGJ5IGlkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sb3IocmF0ZVZhbHVlKTsgICAgLy8gcGFzcyB1bmVtcGxveW1lbnQgcmF0ZSBpbnRvIGNvbG9yIGZ1bmN0aW9uIChkZWZpbmVkIGJlbG93KSB0byBnZXQgdGhlIGNvcnJlY3QgZmlsbCBjb2xvclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gLnN0eWxlKFwic3Ryb2tlXCIsIFwiYmxhY2tcIik7XG5cbiAgICAgICAgICAgIHN2Zy5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgICAgIC5kYXR1bSh0b3BvanNvbi5tZXNoKHVzLCB1cy5vYmplY3RzLnN0YXRlcywgKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXMub2JqZWN0cy5zdGF0ZXMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5pZCAhPT0gYi5pZDtcbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3RhdGVzXCIpXG4gICAgICAgICAgICAgICAgLy8gLmF0dHIoXCJmaWxsXCIsIFwibm9uZVwiKSAgIC8vIGlubGluZSBzdHlsaW5nIC0tPiByaWdodCBub3cgYXBwbGljYXRpb24uY3NzIGlzIGRpY3RhdGluZyB0aGUgc3R5bGVcbiAgICAgICAgICAgICAgICAvLyAuYXR0cihcInN0cm9rZVwiLCBcIndoaXRlXCIpICAvLyBpbmxpbmUgc3R5bGluZyAtLT4gcmlnaHQgbm93IGFwcGxpY2F0aW9uLmNzcyBpcyBkaWN0YXRpbmcgdGhlIHN0eWxlXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJkXCIsIHBhdGgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgY29sb3IgPSBkMy5zY2FsZVRocmVzaG9sZCgpXG4gICAgICAgICAgICAuZG9tYWluKFswLjAyLCAwLjA0LCAwLjA2LCAwLjA4LCAwLjEwXSlcbiAgICAgICAgICAgIC5yYW5nZShbXCIjRjBGMEYwXCIsIFwiI2IyZDhkOFwiLCBcIiM2NmIyYjJcIiwgXCIjMDA4MDgwXCIsIFwiIzAwNjY2NlwiLCBcIiMwMDRjNGNcIl0pO1xuICAgICAgICAgICAgLy8gLnJhbmdlKFtcIiNmMmYwZjdcIiwgXCIjZGFkYWViXCIsIFwiI2JjYmRkY1wiLCBcIiM5ZTlhYzhcIiwgXCIjNzU2YmIxXCIsIFwiIzU0Mjc4ZlwiXSk7ICAvLyBkaWZmZXJlbnQgY29sb3IgcGFsZXR0ZVxuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });