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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderGeoMap\", function() { return renderGeoMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"colorGeoMap\", function() { return colorGeoMap; });\nconst geoColor = d3.scaleThreshold()\n    .domain([0, 0.15, 0.30, 0.45, 0.55, 0.70, 0.85, 1.0])\n    .range([\"lightgray\", \"#009392\", \"#39B185\", \"#9CCB86\", \"#E9E29C\", \"#EEB479\", \"#E88471\", \"#CF597E\"]); // color scheme 1 (green-red)\n    // .range([\"lightgray\", \"#228B3B\", \"#6CBA7D\", \"#CDE5D2\", \"#FCE1A4\", \"#FABF7B\", \"#E05C5C\", \"#AB1866\"]); // color scheme 2 (green-magenta)\n    // .range([\"lightgray\", \"#3C93C2\", \"#6CB0D6\", \"#9EC9E2\", \"#E1F2E3\", \"#FEB24C\", \"#FD8D3C\", \"#FC4E2A\"]); // color scheme 3 (blue-orange)\n\nconst renderGeoMap = (dataset) => {  // renderGeoMap doesn't use dataset directly, but passes it to colorGeoMap()\n    const width = 720;\n    const height = 500;\n\n    const projection = d3.geoAlbersUsa()\n        .scale(1000)\n        .translate([width / 2, height / 2]);\n\n    const path = d3.geoPath()\n        .projection(projection);\n\n    let svg = d3.select(\".geomap-container\").append(\"svg\")\n        .attr(\"width\", width)\n        .attr(\"height\", height);\n\n    d3.json(\"assets/data/cb_2018_us_state_5m.json\").then(us => {\n        svg.append(\"g\")\n            .selectAll(\"path\")\n            .data(topojson.feature(us, us.objects.cb_2018_us_state_5m).features)\n            .enter()\n            .append(\"path\")\n            .attr(\"d\", path)\n            .attr(\"class\", \"states\")\n            .style(\"fill\", \"lightgray\");\n        colorGeoMap(dataset);\n    });\n}\n\nconst colorGeoMap = (dataset, year = \"2006\") => {\n\n    d3.csv(dataset).then(data => {\n        const filteredData = data.filter(datum => datum.year === year);\n        let searchFreqByState = {};\n        filteredData.forEach(datum => {\n            if (datum.sriracha === \"0\" && datum.tabasco === \"0\") {\n                searchFreqByState[datum.Region] = -0.2;\n            } else {\n                searchFreqByState[datum.Region] = parseFloat(datum.sriracha);\n            }\n        });\n\n        d3.selectAll(\".states\")\n            .transition().duration(150) // may get rid of this\n            .style(\"fill\", d => {\n                let searchFreq = searchFreqByState[d.properties.NAME];\n                return geoColor(searchFreq);\n            });\n    });\n}\n\n\n\n\n\n\n    // TUTORIAL CODE\n    // Global variables to store slider state and \"dictionary\" (or reference values for input)\n    // var inputValue = null;\n    // var month = [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"];\n\n    // // MAP *****************************************************************\n\n    // // RODENT DATA *****************************************************************\n    // let rodents = svg.append('g')\n    // rodents.selectAll('path')\n    //     .data(rodents_json.features)    // how does d3's .features method know to extract the coordinates?\n    //     .enter()\n    //     .append('path')\n    //     .attr('fill', initialDate)\n    //     .attr('stroke', '#999')\n    //     .attr('d', geoPath)    // position the dots based on the geoPath function?\n    //     .attr('class', 'incident') // add class to each data point (dot) so it can be styled with css (defined in head)\n    //     // .on('mouseover', d => {      // NOTE: using a fat arrow function yields this error: this.setAttribute is not a function (b/c it binds this?)\n    //     //     d3.select('h2').text(d.properties.LOCATION_STREET_NAME);\n    //     //     d3.select(this).attr('class', 'incident hover');\n    //     // })\n    //     // .on('mouseout', d => {\n    //     //     d3.select('h2').text('');\n    //     //     d3.select(this).attr('class', 'incident');\n    //     // });\n    //     // EVENT LISTENERS FOR INTERACTIVITY (HOVER)\n    //     .on('mouseover', function (d) {\n    //         d3.select('h2').text(d.properties.LOCATION_STREET_NAME);\n    //         d3.select(this).attr('class', 'incident hover');\n    //     })\n    //     .on('mouseout', function (d) {\n    //         d3.select('h2').text('');\n    //         d3.select(this).attr('class', 'incident');\n    //     });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2VvbWFwLmpzPzg5MGQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHVHQUF1RztBQUN2RywwR0FBMEc7QUFDMUcsMEdBQTBHOztBQUVuRyxtQ0FBbUM7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsS0FBSztBQUNMOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsWUFBWSIsImZpbGUiOiIuL3NyYy9nZW9tYXAuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnZW9Db2xvciA9IGQzLnNjYWxlVGhyZXNob2xkKClcbiAgICAuZG9tYWluKFswLCAwLjE1LCAwLjMwLCAwLjQ1LCAwLjU1LCAwLjcwLCAwLjg1LCAxLjBdKVxuICAgIC5yYW5nZShbXCJsaWdodGdyYXlcIiwgXCIjMDA5MzkyXCIsIFwiIzM5QjE4NVwiLCBcIiM5Q0NCODZcIiwgXCIjRTlFMjlDXCIsIFwiI0VFQjQ3OVwiLCBcIiNFODg0NzFcIiwgXCIjQ0Y1OTdFXCJdKTsgLy8gY29sb3Igc2NoZW1lIDEgKGdyZWVuLXJlZClcbiAgICAvLyAucmFuZ2UoW1wibGlnaHRncmF5XCIsIFwiIzIyOEIzQlwiLCBcIiM2Q0JBN0RcIiwgXCIjQ0RFNUQyXCIsIFwiI0ZDRTFBNFwiLCBcIiNGQUJGN0JcIiwgXCIjRTA1QzVDXCIsIFwiI0FCMTg2NlwiXSk7IC8vIGNvbG9yIHNjaGVtZSAyIChncmVlbi1tYWdlbnRhKVxuICAgIC8vIC5yYW5nZShbXCJsaWdodGdyYXlcIiwgXCIjM0M5M0MyXCIsIFwiIzZDQjBENlwiLCBcIiM5RUM5RTJcIiwgXCIjRTFGMkUzXCIsIFwiI0ZFQjI0Q1wiLCBcIiNGRDhEM0NcIiwgXCIjRkM0RTJBXCJdKTsgLy8gY29sb3Igc2NoZW1lIDMgKGJsdWUtb3JhbmdlKVxuXG5leHBvcnQgY29uc3QgcmVuZGVyR2VvTWFwID0gKGRhdGFzZXQpID0+IHsgIC8vIHJlbmRlckdlb01hcCBkb2Vzbid0IHVzZSBkYXRhc2V0IGRpcmVjdGx5LCBidXQgcGFzc2VzIGl0IHRvIGNvbG9yR2VvTWFwKClcbiAgICBjb25zdCB3aWR0aCA9IDcyMDtcbiAgICBjb25zdCBoZWlnaHQgPSA1MDA7XG5cbiAgICBjb25zdCBwcm9qZWN0aW9uID0gZDMuZ2VvQWxiZXJzVXNhKClcbiAgICAgICAgLnNjYWxlKDEwMDApXG4gICAgICAgIC50cmFuc2xhdGUoW3dpZHRoIC8gMiwgaGVpZ2h0IC8gMl0pO1xuXG4gICAgY29uc3QgcGF0aCA9IGQzLmdlb1BhdGgoKVxuICAgICAgICAucHJvamVjdGlvbihwcm9qZWN0aW9uKTtcblxuICAgIGxldCBzdmcgPSBkMy5zZWxlY3QoXCIuZ2VvbWFwLWNvbnRhaW5lclwiKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcblxuICAgIGQzLmpzb24oXCJhc3NldHMvZGF0YS9jYl8yMDE4X3VzX3N0YXRlXzVtLmpzb25cIikudGhlbih1cyA9PiB7XG4gICAgICAgIHN2Zy5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAgICAgLmRhdGEodG9wb2pzb24uZmVhdHVyZSh1cywgdXMub2JqZWN0cy5jYl8yMDE4X3VzX3N0YXRlXzVtKS5mZWF0dXJlcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIHBhdGgpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3RhdGVzXCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIFwibGlnaHRncmF5XCIpO1xuICAgICAgICBjb2xvckdlb01hcChkYXRhc2V0KTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbG9yR2VvTWFwID0gKGRhdGFzZXQsIHllYXIgPSBcIjIwMDZcIikgPT4ge1xuXG4gICAgZDMuY3N2KGRhdGFzZXQpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkRGF0YSA9IGRhdGEuZmlsdGVyKGRhdHVtID0+IGRhdHVtLnllYXIgPT09IHllYXIpO1xuICAgICAgICBsZXQgc2VhcmNoRnJlcUJ5U3RhdGUgPSB7fTtcbiAgICAgICAgZmlsdGVyZWREYXRhLmZvckVhY2goZGF0dW0gPT4ge1xuICAgICAgICAgICAgaWYgKGRhdHVtLnNyaXJhY2hhID09PSBcIjBcIiAmJiBkYXR1bS50YWJhc2NvID09PSBcIjBcIikge1xuICAgICAgICAgICAgICAgIHNlYXJjaEZyZXFCeVN0YXRlW2RhdHVtLlJlZ2lvbl0gPSAtMC4yO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWFyY2hGcmVxQnlTdGF0ZVtkYXR1bS5SZWdpb25dID0gcGFyc2VGbG9hdChkYXR1bS5zcmlyYWNoYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGQzLnNlbGVjdEFsbChcIi5zdGF0ZXNcIilcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKCkuZHVyYXRpb24oMTUwKSAvLyBtYXkgZ2V0IHJpZCBvZiB0aGlzXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzZWFyY2hGcmVxID0gc2VhcmNoRnJlcUJ5U3RhdGVbZC5wcm9wZXJ0aWVzLk5BTUVdO1xuICAgICAgICAgICAgICAgIHJldHVybiBnZW9Db2xvcihzZWFyY2hGcmVxKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5cblxuXG5cblxuICAgIC8vIFRVVE9SSUFMIENPREVcbiAgICAvLyBHbG9iYWwgdmFyaWFibGVzIHRvIHN0b3JlIHNsaWRlciBzdGF0ZSBhbmQgXCJkaWN0aW9uYXJ5XCIgKG9yIHJlZmVyZW5jZSB2YWx1ZXMgZm9yIGlucHV0KVxuICAgIC8vIHZhciBpbnB1dFZhbHVlID0gbnVsbDtcbiAgICAvLyB2YXIgbW9udGggPSBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXTtcblxuICAgIC8vIC8vIE1BUCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gICAgLy8gLy8gUk9ERU5UIERBVEEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAvLyBsZXQgcm9kZW50cyA9IHN2Zy5hcHBlbmQoJ2cnKVxuICAgIC8vIHJvZGVudHMuc2VsZWN0QWxsKCdwYXRoJylcbiAgICAvLyAgICAgLmRhdGEocm9kZW50c19qc29uLmZlYXR1cmVzKSAgICAvLyBob3cgZG9lcyBkMydzIC5mZWF0dXJlcyBtZXRob2Qga25vdyB0byBleHRyYWN0IHRoZSBjb29yZGluYXRlcz9cbiAgICAvLyAgICAgLmVudGVyKClcbiAgICAvLyAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgLy8gICAgIC5hdHRyKCdmaWxsJywgaW5pdGlhbERhdGUpXG4gICAgLy8gICAgIC5hdHRyKCdzdHJva2UnLCAnIzk5OScpXG4gICAgLy8gICAgIC5hdHRyKCdkJywgZ2VvUGF0aCkgICAgLy8gcG9zaXRpb24gdGhlIGRvdHMgYmFzZWQgb24gdGhlIGdlb1BhdGggZnVuY3Rpb24/XG4gICAgLy8gICAgIC5hdHRyKCdjbGFzcycsICdpbmNpZGVudCcpIC8vIGFkZCBjbGFzcyB0byBlYWNoIGRhdGEgcG9pbnQgKGRvdCkgc28gaXQgY2FuIGJlIHN0eWxlZCB3aXRoIGNzcyAoZGVmaW5lZCBpbiBoZWFkKVxuICAgIC8vICAgICAvLyAub24oJ21vdXNlb3ZlcicsIGQgPT4geyAgICAgIC8vIE5PVEU6IHVzaW5nIGEgZmF0IGFycm93IGZ1bmN0aW9uIHlpZWxkcyB0aGlzIGVycm9yOiB0aGlzLnNldEF0dHJpYnV0ZSBpcyBub3QgYSBmdW5jdGlvbiAoYi9jIGl0IGJpbmRzIHRoaXM/KVxuICAgIC8vICAgICAvLyAgICAgZDMuc2VsZWN0KCdoMicpLnRleHQoZC5wcm9wZXJ0aWVzLkxPQ0FUSU9OX1NUUkVFVF9OQU1FKTtcbiAgICAvLyAgICAgLy8gICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdjbGFzcycsICdpbmNpZGVudCBob3ZlcicpO1xuICAgIC8vICAgICAvLyB9KVxuICAgIC8vICAgICAvLyAub24oJ21vdXNlb3V0JywgZCA9PiB7XG4gICAgLy8gICAgIC8vICAgICBkMy5zZWxlY3QoJ2gyJykudGV4dCgnJyk7XG4gICAgLy8gICAgIC8vICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignY2xhc3MnLCAnaW5jaWRlbnQnKTtcbiAgICAvLyAgICAgLy8gfSk7XG4gICAgLy8gICAgIC8vIEVWRU5UIExJU1RFTkVSUyBGT1IgSU5URVJBQ1RJVklUWSAoSE9WRVIpXG4gICAgLy8gICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAvLyAgICAgICAgIGQzLnNlbGVjdCgnaDInKS50ZXh0KGQucHJvcGVydGllcy5MT0NBVElPTl9TVFJFRVRfTkFNRSk7XG4gICAgLy8gICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignY2xhc3MnLCAnaW5jaWRlbnQgaG92ZXInKTtcbiAgICAvLyAgICAgfSlcbiAgICAvLyAgICAgLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgLy8gICAgICAgICBkMy5zZWxlY3QoJ2gyJykudGV4dCgnJyk7XG4gICAgLy8gICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignY2xhc3MnLCAnaW5jaWRlbnQnKTtcbiAgICAvLyAgICAgfSk7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/geomap.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _geomap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geomap */ \"./src/geomap.js\");\n/* harmony import */ var _line_chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./line_chart */ \"./src/line_chart.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n\n    // Years for time slider\n    const year = [\n        \"2006\", \"2007\", \"2008\", \n        \"2009\", \"2010\", \"2011\", \n        \"2012\", \"2013\", \"2014\", \n        \"2015\", \"2016\", \"2017\", \n        \"2018\", \"2019\"\n    ];\n\n    // // This dataset should dynamically change based on the comparison selected\n    // // (Will prob have a menu allowing users to select food comparison)\n    // // Refactor later to assign dataset based on the input value\n    // // ...may need a dictionary or to rename data files to faciliate interpolation\n    // let dataset = \"assets/data/sriracha/sriracha_vs_tabasco_geo_trended.csv\";\n\n    // d3.select(\"#timeslide\").on(\"input\", function() {\n    //     document.getElementById(\"range\").innerHTML = year[this.value];\n    //     colorGeoMap(dataset, `${year[this.value]}`);\n    // });\n\n    // renderGeoMap(dataset);\n    \n    let dataset = \"assets/data/sriracha_tabasco_timeline_2004_to_present.csv\";\n    Object(_line_chart__WEBPACK_IMPORTED_MODULE_1__[\"renderLineChart\"])(dataset);\n});\n\n// Something to think about later: do I need to clean up event listeners & timers?\n// Check for closures, memory leak sources?//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBcUQ7QUFDTjs7QUFFL0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsaUJBQWlCO0FBQ3BELFFBQVE7O0FBRVI7O0FBRUE7QUFDQSxJQUFJLG1FQUFlO0FBQ25CLENBQUM7O0FBRUQ7QUFDQSIsImZpbGUiOiIuL3NyYy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlckdlb01hcCwgY29sb3JHZW9NYXAgfSBmcm9tICcuL2dlb21hcCc7XG5pbXBvcnQgeyByZW5kZXJMaW5lQ2hhcnQgfSBmcm9tICcuL2xpbmVfY2hhcnQnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgICAvLyBZZWFycyBmb3IgdGltZSBzbGlkZXJcbiAgICBjb25zdCB5ZWFyID0gW1xuICAgICAgICBcIjIwMDZcIiwgXCIyMDA3XCIsIFwiMjAwOFwiLCBcbiAgICAgICAgXCIyMDA5XCIsIFwiMjAxMFwiLCBcIjIwMTFcIiwgXG4gICAgICAgIFwiMjAxMlwiLCBcIjIwMTNcIiwgXCIyMDE0XCIsIFxuICAgICAgICBcIjIwMTVcIiwgXCIyMDE2XCIsIFwiMjAxN1wiLCBcbiAgICAgICAgXCIyMDE4XCIsIFwiMjAxOVwiXG4gICAgXTtcblxuICAgIC8vIC8vIFRoaXMgZGF0YXNldCBzaG91bGQgZHluYW1pY2FsbHkgY2hhbmdlIGJhc2VkIG9uIHRoZSBjb21wYXJpc29uIHNlbGVjdGVkXG4gICAgLy8gLy8gKFdpbGwgcHJvYiBoYXZlIGEgbWVudSBhbGxvd2luZyB1c2VycyB0byBzZWxlY3QgZm9vZCBjb21wYXJpc29uKVxuICAgIC8vIC8vIFJlZmFjdG9yIGxhdGVyIHRvIGFzc2lnbiBkYXRhc2V0IGJhc2VkIG9uIHRoZSBpbnB1dCB2YWx1ZVxuICAgIC8vIC8vIC4uLm1heSBuZWVkIGEgZGljdGlvbmFyeSBvciB0byByZW5hbWUgZGF0YSBmaWxlcyB0byBmYWNpbGlhdGUgaW50ZXJwb2xhdGlvblxuICAgIC8vIGxldCBkYXRhc2V0ID0gXCJhc3NldHMvZGF0YS9zcmlyYWNoYS9zcmlyYWNoYV92c190YWJhc2NvX2dlb190cmVuZGVkLmNzdlwiO1xuXG4gICAgLy8gZDMuc2VsZWN0KFwiI3RpbWVzbGlkZVwiKS5vbihcImlucHV0XCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhbmdlXCIpLmlubmVySFRNTCA9IHllYXJbdGhpcy52YWx1ZV07XG4gICAgLy8gICAgIGNvbG9yR2VvTWFwKGRhdGFzZXQsIGAke3llYXJbdGhpcy52YWx1ZV19YCk7XG4gICAgLy8gfSk7XG5cbiAgICAvLyByZW5kZXJHZW9NYXAoZGF0YXNldCk7XG4gICAgXG4gICAgbGV0IGRhdGFzZXQgPSBcImFzc2V0cy9kYXRhL3NyaXJhY2hhX3RhYmFzY29fdGltZWxpbmVfMjAwNF90b19wcmVzZW50LmNzdlwiO1xuICAgIHJlbmRlckxpbmVDaGFydChkYXRhc2V0KTtcbn0pO1xuXG4vLyBTb21ldGhpbmcgdG8gdGhpbmsgYWJvdXQgbGF0ZXI6IGRvIEkgbmVlZCB0byBjbGVhbiB1cCBldmVudCBsaXN0ZW5lcnMgJiB0aW1lcnM/XG4vLyBDaGVjayBmb3IgY2xvc3VyZXMsIG1lbW9yeSBsZWFrIHNvdXJjZXM/Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/line_chart.js":
/*!***************************!*\
  !*** ./src/line_chart.js ***!
  \***************************/
/*! exports provided: renderLineChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderLineChart\", function() { return renderLineChart; });\nconst renderLineChart = dataset => {\n    const width = 720;\n    const height = 500;\n    const padding = 40;\n\n    let svg = d3.select(\".line-chart-container\").append(\"svg\")\n        .attr(\"width\", width)\n        .attr(\"height\", height);\n    \n    d3.csv(dataset).then(data => {\n\n        // Define x & y scales based on dataset\n        let maxX = data.length;\n        let maxY = 100;\n        let xScale = d3.scaleLinear()\n            .domain([0, maxX])\n            .range([padding, width - padding]);\n        let yScale = d3.scaleLinear()\n            .domain([0, maxY])\n            .range([height - padding, padding]);\n\n        // Define axes based on x & y scales\n        let xAxis = d3.axisBottom(xScale);\n        let yAxis = d3.axisLeft(yScale);\n\n        // Render axes onto DOM\n        svg.append(\"g\")\n            .attr(\"class\", \"axis\")\n            .attr(\"transform\", \"translate(0,\" + (height - padding) + \")\")\n            .call(xAxis);\n        svg.append(\"g\")\n            .attr(\"class\", \"axis\")\n            .attr(\"transform\", \"translate(\" + padding + \", 0)\")\n            .call(yAxis);\n\n        // Render data as circles on the chart\n        svg.selectAll('circle')\n            .data(data)\n            .enter()\n            .append(\"circle\")\n            .attr(\"cx\", (_, idx) => {\n                debugger\n                return xScale(idx)\n            })\n            .attr(\"cy\", datum => yScale(datum.tabasco))\n            .attr(\"r\", \"2\")\n            .attr(\"fill\", \"green\");\n        svg.selectAll('circle')\n            .data(data)\n            .enter()\n            .append(\"circle\")\n            .attr(\"cx\", (_, idx) => xScale(idx))\n            .attr(\"cy\", datum => yScale(datum.sriracha))\n            .attr(\"r\", \"2\")\n            .attr(\"fill\", \"orange\");\n    });\n}\n\n\n// // plot data as circles\n// let circ = svg.selectAll('circle')  // selects all circles (even though they haven't been create yet!)\n//     .data(dataset)  // bind data to DOM (bind each circle to a data point)\n//     .enter()        // add one circle per data point\n//     .append('circle')\n//     .attr('cx', function (d) { return xScale(d[0]); })   // attributes for each circle are a function of the data points (scaled to the range)\n//     .attr('cy', function (d) { return yScale(d[1]); })\n//     .attr('r', function (d) { return rScale(d[2]); })\n//     .attr('fill', 'purple').attr('opacity', 0.5);\n\n\n// // add axes to svg\n// // NOTE about translate: translate(origin-x-coord, origin-y-coord) ... remember y origin starts at top\n\n// // x axis\n// svg.append('g') // creates a group\n//     .attr('class', 'axis')  // add css class for styling\n    // .attr(\"transform\", \"translate(0,\" + (h - pad) + \")\") // translate(origin-x-coord, origin-y-coord)\n//     .call(xAxis);\n// // y axis\n// svg.append('g')\n//     .attr('class', 'axis')\n//     .attr(\"transform\", \"translate(\" + pad + \", 0)\")\n//     .call(yAxis);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGluZV9jaGFydC5qcz83ZDgwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHFCQUFxQixFQUFFO0FBQ3hELGlDQUFpQyxxQkFBcUIsRUFBRTtBQUN4RCxnQ0FBZ0MscUJBQXFCLEVBQUU7QUFDdkQ7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9zcmMvbGluZV9jaGFydC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCByZW5kZXJMaW5lQ2hhcnQgPSBkYXRhc2V0ID0+IHtcbiAgICBjb25zdCB3aWR0aCA9IDcyMDtcbiAgICBjb25zdCBoZWlnaHQgPSA1MDA7XG4gICAgY29uc3QgcGFkZGluZyA9IDQwO1xuXG4gICAgbGV0IHN2ZyA9IGQzLnNlbGVjdChcIi5saW5lLWNoYXJ0LWNvbnRhaW5lclwiKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcbiAgICBcbiAgICBkMy5jc3YoZGF0YXNldCkudGhlbihkYXRhID0+IHtcblxuICAgICAgICAvLyBEZWZpbmUgeCAmIHkgc2NhbGVzIGJhc2VkIG9uIGRhdGFzZXRcbiAgICAgICAgbGV0IG1heFggPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgbGV0IG1heFkgPSAxMDA7XG4gICAgICAgIGxldCB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCBtYXhYXSlcbiAgICAgICAgICAgIC5yYW5nZShbcGFkZGluZywgd2lkdGggLSBwYWRkaW5nXSk7XG4gICAgICAgIGxldCB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCBtYXhZXSlcbiAgICAgICAgICAgIC5yYW5nZShbaGVpZ2h0IC0gcGFkZGluZywgcGFkZGluZ10pO1xuXG4gICAgICAgIC8vIERlZmluZSBheGVzIGJhc2VkIG9uIHggJiB5IHNjYWxlc1xuICAgICAgICBsZXQgeEF4aXMgPSBkMy5heGlzQm90dG9tKHhTY2FsZSk7XG4gICAgICAgIGxldCB5QXhpcyA9IGQzLmF4aXNMZWZ0KHlTY2FsZSk7XG5cbiAgICAgICAgLy8gUmVuZGVyIGF4ZXMgb250byBET01cbiAgICAgICAgc3ZnLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJheGlzXCIpXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLFwiICsgKGhlaWdodCAtIHBhZGRpbmcpICsgXCIpXCIpXG4gICAgICAgICAgICAuY2FsbCh4QXhpcyk7XG4gICAgICAgIHN2Zy5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYXhpc1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBwYWRkaW5nICsgXCIsIDApXCIpXG4gICAgICAgICAgICAuY2FsbCh5QXhpcyk7XG5cbiAgICAgICAgLy8gUmVuZGVyIGRhdGEgYXMgY2lyY2xlcyBvbiB0aGUgY2hhcnRcbiAgICAgICAgc3ZnLnNlbGVjdEFsbCgnY2lyY2xlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZChcImNpcmNsZVwiKVxuICAgICAgICAgICAgLmF0dHIoXCJjeFwiLCAoXywgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICAgICAgICByZXR1cm4geFNjYWxlKGlkeClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cihcImN5XCIsIGRhdHVtID0+IHlTY2FsZShkYXR1bS50YWJhc2NvKSlcbiAgICAgICAgICAgIC5hdHRyKFwiclwiLCBcIjJcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcImdyZWVuXCIpO1xuICAgICAgICBzdmcuc2VsZWN0QWxsKCdjaXJjbGUnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKFwiY2lyY2xlXCIpXG4gICAgICAgICAgICAuYXR0cihcImN4XCIsIChfLCBpZHgpID0+IHhTY2FsZShpZHgpKVxuICAgICAgICAgICAgLmF0dHIoXCJjeVwiLCBkYXR1bSA9PiB5U2NhbGUoZGF0dW0uc3JpcmFjaGEpKVxuICAgICAgICAgICAgLmF0dHIoXCJyXCIsIFwiMlwiKVxuICAgICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwib3JhbmdlXCIpO1xuICAgIH0pO1xufVxuXG5cbi8vIC8vIHBsb3QgZGF0YSBhcyBjaXJjbGVzXG4vLyBsZXQgY2lyYyA9IHN2Zy5zZWxlY3RBbGwoJ2NpcmNsZScpICAvLyBzZWxlY3RzIGFsbCBjaXJjbGVzIChldmVuIHRob3VnaCB0aGV5IGhhdmVuJ3QgYmVlbiBjcmVhdGUgeWV0ISlcbi8vICAgICAuZGF0YShkYXRhc2V0KSAgLy8gYmluZCBkYXRhIHRvIERPTSAoYmluZCBlYWNoIGNpcmNsZSB0byBhIGRhdGEgcG9pbnQpXG4vLyAgICAgLmVudGVyKCkgICAgICAgIC8vIGFkZCBvbmUgY2lyY2xlIHBlciBkYXRhIHBvaW50XG4vLyAgICAgLmFwcGVuZCgnY2lyY2xlJylcbi8vICAgICAuYXR0cignY3gnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4geFNjYWxlKGRbMF0pOyB9KSAgIC8vIGF0dHJpYnV0ZXMgZm9yIGVhY2ggY2lyY2xlIGFyZSBhIGZ1bmN0aW9uIG9mIHRoZSBkYXRhIHBvaW50cyAoc2NhbGVkIHRvIHRoZSByYW5nZSlcbi8vICAgICAuYXR0cignY3knLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4geVNjYWxlKGRbMV0pOyB9KVxuLy8gICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHJTY2FsZShkWzJdKTsgfSlcbi8vICAgICAuYXR0cignZmlsbCcsICdwdXJwbGUnKS5hdHRyKCdvcGFjaXR5JywgMC41KTtcblxuXG4vLyAvLyBhZGQgYXhlcyB0byBzdmdcbi8vIC8vIE5PVEUgYWJvdXQgdHJhbnNsYXRlOiB0cmFuc2xhdGUob3JpZ2luLXgtY29vcmQsIG9yaWdpbi15LWNvb3JkKSAuLi4gcmVtZW1iZXIgeSBvcmlnaW4gc3RhcnRzIGF0IHRvcFxuXG4vLyAvLyB4IGF4aXNcbi8vIHN2Zy5hcHBlbmQoJ2cnKSAvLyBjcmVhdGVzIGEgZ3JvdXBcbi8vICAgICAuYXR0cignY2xhc3MnLCAnYXhpcycpICAvLyBhZGQgY3NzIGNsYXNzIGZvciBzdHlsaW5nXG4gICAgLy8gLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCxcIiArIChoIC0gcGFkKSArIFwiKVwiKSAvLyB0cmFuc2xhdGUob3JpZ2luLXgtY29vcmQsIG9yaWdpbi15LWNvb3JkKVxuLy8gICAgIC5jYWxsKHhBeGlzKTtcbi8vIC8vIHkgYXhpc1xuLy8gc3ZnLmFwcGVuZCgnZycpXG4vLyAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMnKVxuLy8gICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgcGFkICsgXCIsIDApXCIpXG4vLyAgICAgLmNhbGwoeUF4aXMpOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/line_chart.js\n");

/***/ })

/******/ });