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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderGeoMap\", function() { return renderGeoMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"colorGeoMap\", function() { return colorGeoMap; });\nconst geoColor = d3.scaleThreshold()\n    .domain([0, 0.15, 0.30, 0.45, 0.55, 0.70, 0.85, 1.0])\n    .range([\"lightgray\", \"#009392\", \"#39B185\", \"#9CCB86\", \"#E9E29C\", \"#EEB479\", \"#E88471\", \"#CF597E\"]); // color scheme 1 (green-red)\n    // .range([\"lightgray\", \"#228B3B\", \"#6CBA7D\", \"#CDE5D2\", \"#FCE1A4\", \"#FABF7B\", \"#E05C5C\", \"#AB1866\"]); // color scheme 2 (green-magenta)\n    // .range([\"lightgray\", \"#3C93C2\", \"#6CB0D6\", \"#9EC9E2\", \"#E1F2E3\", \"#FEB24C\", \"#FD8D3C\", \"#FC4E2A\"]); // color scheme 3 (blue-orange)\n\nconst renderGeoMap = () => {\n    const width = 720;\n    const height = 500;\n\n    const projection = d3.geoAlbersUsa()\n        .scale(1000)\n        .translate([width / 2, height / 2]);\n\n    const path = d3.geoPath()\n        .projection(projection);\n\n    let svg = d3.select(\".geomap-container\").append(\"svg\")\n        .attr(\"width\", width)\n        .attr(\"height\", height);\n\n    d3.json(\"assets/data/cb_2018_us_state_5m.json\").then(us => {\n        svg.append(\"g\")\n            .selectAll(\"path\")\n            .data(topojson.feature(us, us.objects.cb_2018_us_state_5m).features)\n            .enter()\n            .append(\"path\")\n            .attr(\"d\", path)\n            .attr(\"class\", \"states\")\n            .style(\"fill\", \"lightgray\");\n        colorGeoMap();\n    });\n}\n\nconst colorGeoMap = (year = \"2006\") => { // later, this should take in a dataset too\n\n    // Note: I should prob refactor the below line later to interpolate the food comparison into the filepath\n    d3.csv(\"assets/data/sriracha/sriracha_vs_tabasco_geo_trended.csv\").then(data => {\n        const filteredData = data.filter(datum => datum.year === year); // year should come in as a string\n        let searchFreqByState = {};\n        filteredData.forEach(datum => {\n            if (datum.sriracha === \"0\" && datum.tabasco === \"0\") {\n                searchFreqByState[datum.Region] = -0.2;\n            } else {\n                searchFreqByState[datum.Region] = parseFloat(datum.sriracha);\n            }\n        });\n\n        d3.selectAll(\".states\")\n            .style(\"fill\", d => {\n                let searchFreq = searchFreqByState[d.properties.NAME];\n                return geoColor(searchFreq);\n            });\n    });\n}\n\n\n\n\n\n\n    // TUTORIAL CODE\n    // Global variables to store slider state and \"dictionary\" (or reference values for input)\n    // var inputValue = null;\n    // var month = [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"];\n\n    // // MAP *****************************************************************\n\n    // // RODENT DATA *****************************************************************\n    // let rodents = svg.append('g')\n    // rodents.selectAll('path')\n    //     .data(rodents_json.features)    // how does d3's .features method know to extract the coordinates?\n    //     .enter()\n    //     .append('path')\n    //     .attr('fill', initialDate)\n    //     .attr('stroke', '#999')\n    //     .attr('d', geoPath)    // position the dots based on the geoPath function?\n    //     .attr('class', 'incident') // add class to each data point (dot) so it can be styled with css (defined in head)\n    //     // .on('mouseover', d => {      // NOTE: using a fat arrow function yields this error: this.setAttribute is not a function (b/c it binds this?)\n    //     //     d3.select('h2').text(d.properties.LOCATION_STREET_NAME);\n    //     //     d3.select(this).attr('class', 'incident hover');\n    //     // })\n    //     // .on('mouseout', d => {\n    //     //     d3.select('h2').text('');\n    //     //     d3.select(this).attr('class', 'incident');\n    //     // });\n    //     // EVENT LISTENERS FOR INTERACTIVITY (HOVER)\n    //     .on('mouseover', function (d) {\n    //         d3.select('h2').text(d.properties.LOCATION_STREET_NAME);\n    //         d3.select(this).attr('class', 'incident hover');\n    //     })\n    //     .on('mouseout', function (d) {\n    //         d3.select('h2').text('');\n    //         d3.select(this).attr('class', 'incident');\n    //     });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2VvbWFwLmpzPzg5MGQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBLHVHQUF1RztBQUN2RywwR0FBMEc7QUFDMUcsMEdBQTBHOztBQUVuRztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVPLHdDQUF3Qzs7QUFFL0M7QUFDQTtBQUNBLHVFQUF1RTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixLQUFLO0FBQ0w7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxZQUFZIiwiZmlsZSI6Ii4vc3JjL2dlb21hcC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdlb0NvbG9yID0gZDMuc2NhbGVUaHJlc2hvbGQoKVxuICAgIC5kb21haW4oWzAsIDAuMTUsIDAuMzAsIDAuNDUsIDAuNTUsIDAuNzAsIDAuODUsIDEuMF0pXG4gICAgLnJhbmdlKFtcImxpZ2h0Z3JheVwiLCBcIiMwMDkzOTJcIiwgXCIjMzlCMTg1XCIsIFwiIzlDQ0I4NlwiLCBcIiNFOUUyOUNcIiwgXCIjRUVCNDc5XCIsIFwiI0U4ODQ3MVwiLCBcIiNDRjU5N0VcIl0pOyAvLyBjb2xvciBzY2hlbWUgMSAoZ3JlZW4tcmVkKVxuICAgIC8vIC5yYW5nZShbXCJsaWdodGdyYXlcIiwgXCIjMjI4QjNCXCIsIFwiIzZDQkE3RFwiLCBcIiNDREU1RDJcIiwgXCIjRkNFMUE0XCIsIFwiI0ZBQkY3QlwiLCBcIiNFMDVDNUNcIiwgXCIjQUIxODY2XCJdKTsgLy8gY29sb3Igc2NoZW1lIDIgKGdyZWVuLW1hZ2VudGEpXG4gICAgLy8gLnJhbmdlKFtcImxpZ2h0Z3JheVwiLCBcIiMzQzkzQzJcIiwgXCIjNkNCMEQ2XCIsIFwiIzlFQzlFMlwiLCBcIiNFMUYyRTNcIiwgXCIjRkVCMjRDXCIsIFwiI0ZEOEQzQ1wiLCBcIiNGQzRFMkFcIl0pOyAvLyBjb2xvciBzY2hlbWUgMyAoYmx1ZS1vcmFuZ2UpXG5cbmV4cG9ydCBjb25zdCByZW5kZXJHZW9NYXAgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2lkdGggPSA3MjA7XG4gICAgY29uc3QgaGVpZ2h0ID0gNTAwO1xuXG4gICAgY29uc3QgcHJvamVjdGlvbiA9IGQzLmdlb0FsYmVyc1VzYSgpXG4gICAgICAgIC5zY2FsZSgxMDAwKVxuICAgICAgICAudHJhbnNsYXRlKFt3aWR0aCAvIDIsIGhlaWdodCAvIDJdKTtcblxuICAgIGNvbnN0IHBhdGggPSBkMy5nZW9QYXRoKClcbiAgICAgICAgLnByb2plY3Rpb24ocHJvamVjdGlvbik7XG5cbiAgICBsZXQgc3ZnID0gZDMuc2VsZWN0KFwiLmdlb21hcC1jb250YWluZXJcIikuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbiAgICBkMy5qc29uKFwiYXNzZXRzL2RhdGEvY2JfMjAxOF91c19zdGF0ZV81bS5qc29uXCIpLnRoZW4odXMgPT4ge1xuICAgICAgICBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAgICAgLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAgICAgICAgIC5kYXRhKHRvcG9qc29uLmZlYXR1cmUodXMsIHVzLm9iamVjdHMuY2JfMjAxOF91c19zdGF0ZV81bSkuZmVhdHVyZXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBwYXRoKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInN0YXRlc1wiKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcImxpZ2h0Z3JheVwiKTtcbiAgICAgICAgY29sb3JHZW9NYXAoKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbG9yR2VvTWFwID0gKHllYXIgPSBcIjIwMDZcIikgPT4geyAvLyBsYXRlciwgdGhpcyBzaG91bGQgdGFrZSBpbiBhIGRhdGFzZXQgdG9vXG5cbiAgICAvLyBOb3RlOiBJIHNob3VsZCBwcm9iIHJlZmFjdG9yIHRoZSBiZWxvdyBsaW5lIGxhdGVyIHRvIGludGVycG9sYXRlIHRoZSBmb29kIGNvbXBhcmlzb24gaW50byB0aGUgZmlsZXBhdGhcbiAgICBkMy5jc3YoXCJhc3NldHMvZGF0YS9zcmlyYWNoYS9zcmlyYWNoYV92c190YWJhc2NvX2dlb190cmVuZGVkLmNzdlwiKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICBjb25zdCBmaWx0ZXJlZERhdGEgPSBkYXRhLmZpbHRlcihkYXR1bSA9PiBkYXR1bS55ZWFyID09PSB5ZWFyKTsgLy8geWVhciBzaG91bGQgY29tZSBpbiBhcyBhIHN0cmluZ1xuICAgICAgICBsZXQgc2VhcmNoRnJlcUJ5U3RhdGUgPSB7fTtcbiAgICAgICAgZmlsdGVyZWREYXRhLmZvckVhY2goZGF0dW0gPT4ge1xuICAgICAgICAgICAgaWYgKGRhdHVtLnNyaXJhY2hhID09PSBcIjBcIiAmJiBkYXR1bS50YWJhc2NvID09PSBcIjBcIikge1xuICAgICAgICAgICAgICAgIHNlYXJjaEZyZXFCeVN0YXRlW2RhdHVtLlJlZ2lvbl0gPSAtMC4yO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWFyY2hGcmVxQnlTdGF0ZVtkYXR1bS5SZWdpb25dID0gcGFyc2VGbG9hdChkYXR1bS5zcmlyYWNoYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGQzLnNlbGVjdEFsbChcIi5zdGF0ZXNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaEZyZXEgPSBzZWFyY2hGcmVxQnlTdGF0ZVtkLnByb3BlcnRpZXMuTkFNRV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlb0NvbG9yKHNlYXJjaEZyZXEpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cblxuXG5cblxuXG4gICAgLy8gVFVUT1JJQUwgQ09ERVxuICAgIC8vIEdsb2JhbCB2YXJpYWJsZXMgdG8gc3RvcmUgc2xpZGVyIHN0YXRlIGFuZCBcImRpY3Rpb25hcnlcIiAob3IgcmVmZXJlbmNlIHZhbHVlcyBmb3IgaW5wdXQpXG4gICAgLy8gdmFyIGlucHV0VmFsdWUgPSBudWxsO1xuICAgIC8vIHZhciBtb250aCA9IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdO1xuXG4gICAgLy8gLy8gTUFQICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbiAgICAvLyAvLyBST0RFTlQgREFUQSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgIC8vIGxldCByb2RlbnRzID0gc3ZnLmFwcGVuZCgnZycpXG4gICAgLy8gcm9kZW50cy5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgIC8vICAgICAuZGF0YShyb2RlbnRzX2pzb24uZmVhdHVyZXMpICAgIC8vIGhvdyBkb2VzIGQzJ3MgLmZlYXR1cmVzIG1ldGhvZCBrbm93IHRvIGV4dHJhY3QgdGhlIGNvb3JkaW5hdGVzP1xuICAgIC8vICAgICAuZW50ZXIoKVxuICAgIC8vICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAvLyAgICAgLmF0dHIoJ2ZpbGwnLCBpbml0aWFsRGF0ZSlcbiAgICAvLyAgICAgLmF0dHIoJ3N0cm9rZScsICcjOTk5JylcbiAgICAvLyAgICAgLmF0dHIoJ2QnLCBnZW9QYXRoKSAgICAvLyBwb3NpdGlvbiB0aGUgZG90cyBiYXNlZCBvbiB0aGUgZ2VvUGF0aCBmdW5jdGlvbj9cbiAgICAvLyAgICAgLmF0dHIoJ2NsYXNzJywgJ2luY2lkZW50JykgLy8gYWRkIGNsYXNzIHRvIGVhY2ggZGF0YSBwb2ludCAoZG90KSBzbyBpdCBjYW4gYmUgc3R5bGVkIHdpdGggY3NzIChkZWZpbmVkIGluIGhlYWQpXG4gICAgLy8gICAgIC8vIC5vbignbW91c2VvdmVyJywgZCA9PiB7ICAgICAgLy8gTk9URTogdXNpbmcgYSBmYXQgYXJyb3cgZnVuY3Rpb24geWllbGRzIHRoaXMgZXJyb3I6IHRoaXMuc2V0QXR0cmlidXRlIGlzIG5vdCBhIGZ1bmN0aW9uIChiL2MgaXQgYmluZHMgdGhpcz8pXG4gICAgLy8gICAgIC8vICAgICBkMy5zZWxlY3QoJ2gyJykudGV4dChkLnByb3BlcnRpZXMuTE9DQVRJT05fU1RSRUVUX05BTUUpO1xuICAgIC8vICAgICAvLyAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2NsYXNzJywgJ2luY2lkZW50IGhvdmVyJyk7XG4gICAgLy8gICAgIC8vIH0pXG4gICAgLy8gICAgIC8vIC5vbignbW91c2VvdXQnLCBkID0+IHtcbiAgICAvLyAgICAgLy8gICAgIGQzLnNlbGVjdCgnaDInKS50ZXh0KCcnKTtcbiAgICAvLyAgICAgLy8gICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdjbGFzcycsICdpbmNpZGVudCcpO1xuICAgIC8vICAgICAvLyB9KTtcbiAgICAvLyAgICAgLy8gRVZFTlQgTElTVEVORVJTIEZPUiBJTlRFUkFDVElWSVRZIChIT1ZFUilcbiAgICAvLyAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZCkge1xuICAgIC8vICAgICAgICAgZDMuc2VsZWN0KCdoMicpLnRleHQoZC5wcm9wZXJ0aWVzLkxPQ0FUSU9OX1NUUkVFVF9OQU1FKTtcbiAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdjbGFzcycsICdpbmNpZGVudCBob3ZlcicpO1xuICAgIC8vICAgICB9KVxuICAgIC8vICAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAvLyAgICAgICAgIGQzLnNlbGVjdCgnaDInKS50ZXh0KCcnKTtcbiAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdjbGFzcycsICdpbmNpZGVudCcpO1xuICAgIC8vICAgICB9KTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/geomap.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _geomap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geomap */ \"./src/geomap.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n\n    // Years for time slider\n    const year = [\n        \"2006\", \"2007\", \"2008\", \n        \"2009\", \"2010\", \"2011\", \n        \"2012\", \"2013\", \"2014\", \n        \"2015\", \"2016\", \"2017\", \n        \"2018\", \"2019\"\n    ];\n\n    d3.select(\"#timeslide\").on(\"input\", function() {\n        document.getElementById(\"range\").innerHTML = year[this.value];\n        Object(_geomap__WEBPACK_IMPORTED_MODULE_0__[\"colorGeoMap\"])(`${year[this.value]}`);\n    });\n\n    Object(_geomap__WEBPACK_IMPORTED_MODULE_0__[\"renderGeoMap\"])();\n    \n    // Something to think about later: do I need to clean up event listeners & timers?\n    // Check for closures, memory leak sources?\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQXFEOztBQUVyRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLDJEQUFXLElBQUksaUJBQWlCO0FBQ3hDLEtBQUs7O0FBRUwsSUFBSSw0REFBWTs7QUFFaEI7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJHZW9NYXAsIGNvbG9yR2VvTWFwIH0gZnJvbSAnLi9nZW9tYXAnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgICAvLyBZZWFycyBmb3IgdGltZSBzbGlkZXJcbiAgICBjb25zdCB5ZWFyID0gW1xuICAgICAgICBcIjIwMDZcIiwgXCIyMDA3XCIsIFwiMjAwOFwiLCBcbiAgICAgICAgXCIyMDA5XCIsIFwiMjAxMFwiLCBcIjIwMTFcIiwgXG4gICAgICAgIFwiMjAxMlwiLCBcIjIwMTNcIiwgXCIyMDE0XCIsIFxuICAgICAgICBcIjIwMTVcIiwgXCIyMDE2XCIsIFwiMjAxN1wiLCBcbiAgICAgICAgXCIyMDE4XCIsIFwiMjAxOVwiXG4gICAgXTtcblxuICAgIGQzLnNlbGVjdChcIiN0aW1lc2xpZGVcIikub24oXCJpbnB1dFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYW5nZVwiKS5pbm5lckhUTUwgPSB5ZWFyW3RoaXMudmFsdWVdO1xuICAgICAgICBjb2xvckdlb01hcChgJHt5ZWFyW3RoaXMudmFsdWVdfWApO1xuICAgIH0pO1xuXG4gICAgcmVuZGVyR2VvTWFwKCk7XG4gICAgXG4gICAgLy8gU29tZXRoaW5nIHRvIHRoaW5rIGFib3V0IGxhdGVyOiBkbyBJIG5lZWQgdG8gY2xlYW4gdXAgZXZlbnQgbGlzdGVuZXJzICYgdGltZXJzP1xuICAgIC8vIENoZWNrIGZvciBjbG9zdXJlcywgbWVtb3J5IGxlYWsgc291cmNlcz9cbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });