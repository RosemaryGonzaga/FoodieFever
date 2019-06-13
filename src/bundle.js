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

eval("document.addEventListener(\"DOMContentLoaded\", () => {\n    // IMPORTANT NOTE: RIGHT NOW, THIS IS CODE I WROTE FOR A TUTORIAL, AS PROOF OF CONCEPT\n    // NOT MY OWN PROJECT CODE (but I didn't just copy / paste)\n    // Tutorial source: http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/\n\n    // alert('hello!!!');\n    // console.log('this should print in the console!')\n    // debugger\n\n    const width = 720,\n        height = 500;\n\n    const projection = d3.geoAlbersUsa()\n        .scale(1000)\n        .translate([width / 2, height / 2]);\n\n    const path = d3.geoPath()\n        .projection(projection);\n\n    let svg = d3.select(\"body\").append(\"svg\")\n        .attr(\"width\", width)\n        .attr(\"height\", height);\n\n    d3.json(\"assets/data/cb_2018_us_state_5m.json\").then(us => {\n\n        // Note: I should prob refactor the below line later to interpolate the food comparison into the filepath\n        // d3.csv(\"assets/data/sriracha_tabasco_timeline_2004_to_present.csv\").then(hotsauceTimelineData => {\n        // d3.csv(\"assets/data/sriracha/sriracha_tabasco_geomap_2006.csv\").then(hotsauceGeoData2006 => {\n        d3.csv(\"assets/data/sriracha/sriracha_vs_tabasco_geo_trended.csv\").then(srirachaGeoData => {\n            // console.log(us);\n            // console.log(us.objects.cb_2018_us_state_5m);\n            // console.log(topojson.feature(us, us.objects.cb_2018_us_state_5m));\n            console.log(srirachaGeoData);\n            console.log(srirachaGeoData[0]);\n            console.log(srirachaGeoData[srirachaGeoData.length - 1]);\n\n            svg.append(\"g\")\n                .attr(\"class\", \"states\")\n                .selectAll(\"path\")\n                .data(topojson.feature(us, us.objects.cb_2018_us_state_5m).features)\n                .enter()\n                .append(\"path\")\n                .attr(\"d\", path)\n                .style(\"fill\", \"#1a6b1a\");  // ultimately, we want to fill the color dynamically\n\n            function colorThresholds(year) {\n                \n            }\n        });\n    });\n\n\n    // TUTORIAL CODE\n    // d3.json(\"assets/data/us.json\").then(us => {\n    //     d3.tsv(\"assets/data/us_unemployment_2008.tsv\").then(unemployment => {   // load real Google trends data here\n    //         console.log(us.objects.states);\n    //         console.log(unemployment);\n\n    //         let rateById = {};  // empty object to hold dataset\n    //         unemployment.forEach(d => {\n    //             rateById[d.id] = d.rate;    // populate object with each county's rate (retrieve and set at a key of each county's id)\n    //         });\n    //         // console.log(rateById);\n\n    //         svg.append(\"g\")\n    //             .attr(\"class\", \"states\")\n    //             .selectAll(\"path\")\n    //             .data(topojson.feature(us, us.objects.states).features) // Bind TopoJSON data elements\n    //             .enter().append(\"path\")\n    //             .attr(\"d\", path)\n    //             // .style(\"fill\", d => {\n    //             //     let rateValue = rateById[d.id]; // get unemployment rate for the given data point (match by id)\n    //             //     return color(rateValue);    // pass unemployment rate into color function (defined below) to get the correct fill color\n    //             // });\n    //             .style(\"fill\", \"#008080\");\n    //     });\n\n    //     let color = d3.scaleThreshold()\n    //         .domain([0.02, 0.04, 0.06, 0.08, 0.10])\n    //         .range([\"#F0F0F0\", \"#b2d8d8\", \"#66b2b2\", \"#008080\", \"#006666\", \"#004c4c\"]);\n    //         // .range([\"#f2f0f7\", \"#dadaeb\", \"#bcbddc\", \"#9e9ac8\", \"#756bb1\", \"#54278f\"]);  // different color palette\n    // });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7O0FBRTFDOztBQUVBO0FBQ0EsU0FBUztBQUNULEtBQUs7OztBQUdMO0FBQ0E7QUFDQSxnRkFBZ0Y7QUFDaEY7QUFDQTs7QUFFQSxpQ0FBaUM7QUFDakM7QUFDQSwyQ0FBMkM7QUFDM0MsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pELGtEQUFrRDtBQUNsRCx1QkFBdUI7QUFDdkI7QUFDQSxZQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBLDZGQUE2RjtBQUM3RixRQUFRO0FBQ1IsQ0FBQyIsImZpbGUiOiIuL3NyYy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICAvLyBJTVBPUlRBTlQgTk9URTogUklHSFQgTk9XLCBUSElTIElTIENPREUgSSBXUk9URSBGT1IgQSBUVVRPUklBTCwgQVMgUFJPT0YgT0YgQ09OQ0VQVFxuICAgIC8vIE5PVCBNWSBPV04gUFJPSkVDVCBDT0RFIChidXQgSSBkaWRuJ3QganVzdCBjb3B5IC8gcGFzdGUpXG4gICAgLy8gVHV0b3JpYWwgc291cmNlOiBodHRwOi8vZHVzcHZpei5taXQuZWR1L2QzLXdvcmtzaG9wL21hcHBpbmctZGF0YS13aXRoLWQzL1xuXG4gICAgLy8gYWxlcnQoJ2hlbGxvISEhJyk7XG4gICAgLy8gY29uc29sZS5sb2coJ3RoaXMgc2hvdWxkIHByaW50IGluIHRoZSBjb25zb2xlIScpXG4gICAgLy8gZGVidWdnZXJcblxuICAgIGNvbnN0IHdpZHRoID0gNzIwLFxuICAgICAgICBoZWlnaHQgPSA1MDA7XG5cbiAgICBjb25zdCBwcm9qZWN0aW9uID0gZDMuZ2VvQWxiZXJzVXNhKClcbiAgICAgICAgLnNjYWxlKDEwMDApXG4gICAgICAgIC50cmFuc2xhdGUoW3dpZHRoIC8gMiwgaGVpZ2h0IC8gMl0pO1xuXG4gICAgY29uc3QgcGF0aCA9IGQzLmdlb1BhdGgoKVxuICAgICAgICAucHJvamVjdGlvbihwcm9qZWN0aW9uKTtcblxuICAgIGxldCBzdmcgPSBkMy5zZWxlY3QoXCJib2R5XCIpLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpO1xuXG4gICAgZDMuanNvbihcImFzc2V0cy9kYXRhL2NiXzIwMThfdXNfc3RhdGVfNW0uanNvblwiKS50aGVuKHVzID0+IHtcblxuICAgICAgICAvLyBOb3RlOiBJIHNob3VsZCBwcm9iIHJlZmFjdG9yIHRoZSBiZWxvdyBsaW5lIGxhdGVyIHRvIGludGVycG9sYXRlIHRoZSBmb29kIGNvbXBhcmlzb24gaW50byB0aGUgZmlsZXBhdGhcbiAgICAgICAgLy8gZDMuY3N2KFwiYXNzZXRzL2RhdGEvc3JpcmFjaGFfdGFiYXNjb190aW1lbGluZV8yMDA0X3RvX3ByZXNlbnQuY3N2XCIpLnRoZW4oaG90c2F1Y2VUaW1lbGluZURhdGEgPT4ge1xuICAgICAgICAvLyBkMy5jc3YoXCJhc3NldHMvZGF0YS9zcmlyYWNoYS9zcmlyYWNoYV90YWJhc2NvX2dlb21hcF8yMDA2LmNzdlwiKS50aGVuKGhvdHNhdWNlR2VvRGF0YTIwMDYgPT4ge1xuICAgICAgICBkMy5jc3YoXCJhc3NldHMvZGF0YS9zcmlyYWNoYS9zcmlyYWNoYV92c190YWJhc2NvX2dlb190cmVuZGVkLmNzdlwiKS50aGVuKHNyaXJhY2hhR2VvRGF0YSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1cyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1cy5vYmplY3RzLmNiXzIwMThfdXNfc3RhdGVfNW0pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codG9wb2pzb24uZmVhdHVyZSh1cywgdXMub2JqZWN0cy5jYl8yMDE4X3VzX3N0YXRlXzVtKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzcmlyYWNoYUdlb0RhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coc3JpcmFjaGFHZW9EYXRhWzBdKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNyaXJhY2hhR2VvRGF0YVtzcmlyYWNoYUdlb0RhdGEubGVuZ3RoIC0gMV0pO1xuXG4gICAgICAgICAgICBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdGF0ZXNcIilcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAgICAgICAgIC5kYXRhKHRvcG9qc29uLmZlYXR1cmUodXMsIHVzLm9iamVjdHMuY2JfMjAxOF91c19zdGF0ZV81bSkuZmVhdHVyZXMpXG4gICAgICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBwYXRoKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgXCIjMWE2YjFhXCIpOyAgLy8gdWx0aW1hdGVseSwgd2Ugd2FudCB0byBmaWxsIHRoZSBjb2xvciBkeW5hbWljYWxseVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBjb2xvclRocmVzaG9sZHMoeWVhcikge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgLy8gVFVUT1JJQUwgQ09ERVxuICAgIC8vIGQzLmpzb24oXCJhc3NldHMvZGF0YS91cy5qc29uXCIpLnRoZW4odXMgPT4ge1xuICAgIC8vICAgICBkMy50c3YoXCJhc3NldHMvZGF0YS91c191bmVtcGxveW1lbnRfMjAwOC50c3ZcIikudGhlbih1bmVtcGxveW1lbnQgPT4geyAgIC8vIGxvYWQgcmVhbCBHb29nbGUgdHJlbmRzIGRhdGEgaGVyZVxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2codXMub2JqZWN0cy5zdGF0ZXMpO1xuICAgIC8vICAgICAgICAgY29uc29sZS5sb2codW5lbXBsb3ltZW50KTtcblxuICAgIC8vICAgICAgICAgbGV0IHJhdGVCeUlkID0ge307ICAvLyBlbXB0eSBvYmplY3QgdG8gaG9sZCBkYXRhc2V0XG4gICAgLy8gICAgICAgICB1bmVtcGxveW1lbnQuZm9yRWFjaChkID0+IHtcbiAgICAvLyAgICAgICAgICAgICByYXRlQnlJZFtkLmlkXSA9IGQucmF0ZTsgICAgLy8gcG9wdWxhdGUgb2JqZWN0IHdpdGggZWFjaCBjb3VudHkncyByYXRlIChyZXRyaWV2ZSBhbmQgc2V0IGF0IGEga2V5IG9mIGVhY2ggY291bnR5J3MgaWQpXG4gICAgLy8gICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJhdGVCeUlkKTtcblxuICAgIC8vICAgICAgICAgc3ZnLmFwcGVuZChcImdcIilcbiAgICAvLyAgICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3RhdGVzXCIpXG4gICAgLy8gICAgICAgICAgICAgLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAvLyAgICAgICAgICAgICAuZGF0YSh0b3BvanNvbi5mZWF0dXJlKHVzLCB1cy5vYmplY3RzLnN0YXRlcykuZmVhdHVyZXMpIC8vIEJpbmQgVG9wb0pTT04gZGF0YSBlbGVtZW50c1xuICAgIC8vICAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcInBhdGhcIilcbiAgICAvLyAgICAgICAgICAgICAuYXR0cihcImRcIiwgcGF0aClcbiAgICAvLyAgICAgICAgICAgICAvLyAuc3R5bGUoXCJmaWxsXCIsIGQgPT4ge1xuICAgIC8vICAgICAgICAgICAgIC8vICAgICBsZXQgcmF0ZVZhbHVlID0gcmF0ZUJ5SWRbZC5pZF07IC8vIGdldCB1bmVtcGxveW1lbnQgcmF0ZSBmb3IgdGhlIGdpdmVuIGRhdGEgcG9pbnQgKG1hdGNoIGJ5IGlkKVxuICAgIC8vICAgICAgICAgICAgIC8vICAgICByZXR1cm4gY29sb3IocmF0ZVZhbHVlKTsgICAgLy8gcGFzcyB1bmVtcGxveW1lbnQgcmF0ZSBpbnRvIGNvbG9yIGZ1bmN0aW9uIChkZWZpbmVkIGJlbG93KSB0byBnZXQgdGhlIGNvcnJlY3QgZmlsbCBjb2xvclxuICAgIC8vICAgICAgICAgICAgIC8vIH0pO1xuICAgIC8vICAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgXCIjMDA4MDgwXCIpO1xuICAgIC8vICAgICB9KTtcblxuICAgIC8vICAgICBsZXQgY29sb3IgPSBkMy5zY2FsZVRocmVzaG9sZCgpXG4gICAgLy8gICAgICAgICAuZG9tYWluKFswLjAyLCAwLjA0LCAwLjA2LCAwLjA4LCAwLjEwXSlcbiAgICAvLyAgICAgICAgIC5yYW5nZShbXCIjRjBGMEYwXCIsIFwiI2IyZDhkOFwiLCBcIiM2NmIyYjJcIiwgXCIjMDA4MDgwXCIsIFwiIzAwNjY2NlwiLCBcIiMwMDRjNGNcIl0pO1xuICAgIC8vICAgICAgICAgLy8gLnJhbmdlKFtcIiNmMmYwZjdcIiwgXCIjZGFkYWViXCIsIFwiI2JjYmRkY1wiLCBcIiM5ZTlhYzhcIiwgXCIjNzU2YmIxXCIsIFwiIzU0Mjc4ZlwiXSk7ICAvLyBkaWZmZXJlbnQgY29sb3IgcGFsZXR0ZVxuICAgIC8vIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });