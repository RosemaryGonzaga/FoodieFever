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

eval("document.addEventListener(\"DOMContentLoaded\", () => {\n    // alert('hello!!!');\n    // console.log('this should print in the console!')\n    // debugger\n\n    const width = 720,\n        height = 500;\n\n    const projection = d3.geoAlbersUsa()\n        .scale(1000)\n        .translate([width / 2, height / 2]);\n\n    const path = d3.geoPath()\n        .projection(projection);\n\n    let svg = d3.select(\"body\").append(\"svg\")\n        .attr(\"width\", width)\n        .attr(\"height\", height);\n\n    let color = d3.scaleThreshold()\n        .domain([0, 0.15, 0.30, 0.45, 0.55, 0.70, 0.85, 1.0])\n        .range([\"lightgray\", \"#009392\", \"#39B185\", \"#9CCB86\", \"#E9E29C\", \"#EEB479\", \"#E88471\", \"#CF597E\"]);\n        // .domain([0.02, 0.04, 0.06, 0.08, 0.10])\n        // .range([\"#F0F0F0\", \"#b2d8d8\", \"#66b2b2\", \"#008080\", \"#006666\", \"#004c4c\"]);\n\n    d3.json(\"assets/data/cb_2018_us_state_5m.json\").then(us => {\n\n        // Note: I should prob refactor the below line later to interpolate the food comparison into the filepath\n        // d3.csv(\"assets/data/sriracha_tabasco_timeline_2004_to_present.csv\").then(hotsauceTimelineData => {\n        // d3.csv(\"assets/data/sriracha/sriracha_tabasco_geomap_2006.csv\").then(hotsauceGeoData2006 => {\n        d3.csv(\"assets/data/sriracha/sriracha_vs_tabasco_geo_trended.csv\").then(data => {\n            // console.log(us);\n            // console.log(us.objects.cb_2018_us_state_5m);\n            // console.log(topojson.feature(us, us.objects.cb_2018_us_state_5m));\n            // console.log(data);\n            // console.log(data[0]);\n            // console.log(data[data.length - 1]);\n            // console.log(getSrirachaSearchFreqByState(data, \"2013\"));\n            // console.log(data);\n            // console.log(filteredData);\n            // console.log(srirachaSearchFreqByState);\n\n            const filteredData = data.filter(datum => datum.year === \"2006\"); // the year is hardcoded right now --> need to use a year variable that will get passed in from outside\n            let srirachaSearchFreqByState = {};\n            filteredData.forEach(datum => {\n                if (datum.sriracha === \"0\" && datum.tabasco === \"0\") {\n                    srirachaSearchFreqByState[datum.Region] = -0.2; // or should it be 0.5?\n                } else {\n                    srirachaSearchFreqByState[datum.Region] = parseFloat(datum.sriracha);\n                }\n            });\n\n            svg.append(\"g\")\n                .attr(\"class\", \"states\")\n                .selectAll(\"path\")\n                .data(topojson.feature(us, us.objects.cb_2018_us_state_5m).features)\n                .enter()\n                .append(\"path\")\n                .attr(\"d\", path)\n                // .style(\"fill\", \"#1a6b1a\");  // ultimately, we want to fill the color dynamically\n                .style(\"fill\", d => {\n                    let searchFreq = srirachaSearchFreqByState[d.properties.NAME];\n                    // console.log(d);\n                    // console.log(d.properties.NAME);\n                    return color(searchFreq);\n                    // return \"purple\";\n                });\n\n        });\n    });\n\n\n    // IMPORTANT NOTE: RIGHT NOW, THIS IS CODE I WROTE FOR A TUTORIAL, AS PROOF OF CONCEPT\n    // NOT MY OWN PROJECT CODE (but I didn't just copy / paste)\n    // Tutorial source: http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/\n\n    // TUTORIAL CODE\n    // d3.json(\"assets/data/us.json\").then(us => {\n    //     d3.tsv(\"assets/data/us_unemployment_2008.tsv\").then(unemployment => {   // load real Google trends data here\n    //         console.log(us.objects.states);\n    //         console.log(unemployment);\n\n    //         let rateById = {};  // empty object to hold dataset\n    //         unemployment.forEach(d => {\n    //             rateById[d.id] = d.rate;    // populate object with each county's rate (retrieve and set at a key of each county's id)\n    //         });\n    //         // console.log(rateById);\n\n    //         svg.append(\"g\")\n    //             .attr(\"class\", \"states\")\n    //             .selectAll(\"path\")\n    //             .data(topojson.feature(us, us.objects.states).features) // Bind TopoJSON data elements\n    //             .enter().append(\"path\")\n    //             .attr(\"d\", path)\n    //             // .style(\"fill\", d => {\n    //             //     let rateValue = rateById[d.id]; // get unemployment rate for the given data point (match by id)\n    //             //     return color(rateValue);    // pass unemployment rate into color function (defined below) to get the correct fill color\n    //             // });\n    //             .style(\"fill\", \"#008080\");\n    //     });\n\n    //     let color = d3.scaleThreshold()\n    //         .domain([0.02, 0.04, 0.06, 0.08, 0.10])\n    //         .range([\"#F0F0F0\", \"#b2d8d8\", \"#66b2b2\", \"#008080\", \"#006666\", \"#004c4c\"]);\n    //         // .range([\"#f2f0f7\", \"#dadaeb\", \"#bcbddc\", \"#9e9ac8\", \"#756bb1\", \"#54278f\"]);  // different color palette\n    // });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkVBQTZFO0FBQzdFO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRTtBQUNuRSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQixTQUFTO0FBQ1QsS0FBSzs7O0FBR0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnRkFBZ0Y7QUFDaEY7QUFDQTs7QUFFQSxpQ0FBaUM7QUFDakM7QUFDQSwyQ0FBMkM7QUFDM0MsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pELGtEQUFrRDtBQUNsRCx1QkFBdUI7QUFDdkI7QUFDQSxZQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBLDZGQUE2RjtBQUM3RixRQUFRO0FBQ1IsQ0FBQyIsImZpbGUiOiIuL3NyYy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICAvLyBhbGVydCgnaGVsbG8hISEnKTtcbiAgICAvLyBjb25zb2xlLmxvZygndGhpcyBzaG91bGQgcHJpbnQgaW4gdGhlIGNvbnNvbGUhJylcbiAgICAvLyBkZWJ1Z2dlclxuXG4gICAgY29uc3Qgd2lkdGggPSA3MjAsXG4gICAgICAgIGhlaWdodCA9IDUwMDtcblxuICAgIGNvbnN0IHByb2plY3Rpb24gPSBkMy5nZW9BbGJlcnNVc2EoKVxuICAgICAgICAuc2NhbGUoMTAwMClcbiAgICAgICAgLnRyYW5zbGF0ZShbd2lkdGggLyAyLCBoZWlnaHQgLyAyXSk7XG5cbiAgICBjb25zdCBwYXRoID0gZDMuZ2VvUGF0aCgpXG4gICAgICAgIC5wcm9qZWN0aW9uKHByb2plY3Rpb24pO1xuXG4gICAgbGV0IHN2ZyA9IGQzLnNlbGVjdChcImJvZHlcIikuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbiAgICBsZXQgY29sb3IgPSBkMy5zY2FsZVRocmVzaG9sZCgpXG4gICAgICAgIC5kb21haW4oWzAsIDAuMTUsIDAuMzAsIDAuNDUsIDAuNTUsIDAuNzAsIDAuODUsIDEuMF0pXG4gICAgICAgIC5yYW5nZShbXCJsaWdodGdyYXlcIiwgXCIjMDA5MzkyXCIsIFwiIzM5QjE4NVwiLCBcIiM5Q0NCODZcIiwgXCIjRTlFMjlDXCIsIFwiI0VFQjQ3OVwiLCBcIiNFODg0NzFcIiwgXCIjQ0Y1OTdFXCJdKTtcbiAgICAgICAgLy8gLmRvbWFpbihbMC4wMiwgMC4wNCwgMC4wNiwgMC4wOCwgMC4xMF0pXG4gICAgICAgIC8vIC5yYW5nZShbXCIjRjBGMEYwXCIsIFwiI2IyZDhkOFwiLCBcIiM2NmIyYjJcIiwgXCIjMDA4MDgwXCIsIFwiIzAwNjY2NlwiLCBcIiMwMDRjNGNcIl0pO1xuXG4gICAgZDMuanNvbihcImFzc2V0cy9kYXRhL2NiXzIwMThfdXNfc3RhdGVfNW0uanNvblwiKS50aGVuKHVzID0+IHtcblxuICAgICAgICAvLyBOb3RlOiBJIHNob3VsZCBwcm9iIHJlZmFjdG9yIHRoZSBiZWxvdyBsaW5lIGxhdGVyIHRvIGludGVycG9sYXRlIHRoZSBmb29kIGNvbXBhcmlzb24gaW50byB0aGUgZmlsZXBhdGhcbiAgICAgICAgLy8gZDMuY3N2KFwiYXNzZXRzL2RhdGEvc3JpcmFjaGFfdGFiYXNjb190aW1lbGluZV8yMDA0X3RvX3ByZXNlbnQuY3N2XCIpLnRoZW4oaG90c2F1Y2VUaW1lbGluZURhdGEgPT4ge1xuICAgICAgICAvLyBkMy5jc3YoXCJhc3NldHMvZGF0YS9zcmlyYWNoYS9zcmlyYWNoYV90YWJhc2NvX2dlb21hcF8yMDA2LmNzdlwiKS50aGVuKGhvdHNhdWNlR2VvRGF0YTIwMDYgPT4ge1xuICAgICAgICBkMy5jc3YoXCJhc3NldHMvZGF0YS9zcmlyYWNoYS9zcmlyYWNoYV92c190YWJhc2NvX2dlb190cmVuZGVkLmNzdlwiKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXMpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXMub2JqZWN0cy5jYl8yMDE4X3VzX3N0YXRlXzVtKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRvcG9qc29uLmZlYXR1cmUodXMsIHVzLm9iamVjdHMuY2JfMjAxOF91c19zdGF0ZV81bSkpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhWzBdKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGFbZGF0YS5sZW5ndGggLSAxXSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnZXRTcmlyYWNoYVNlYXJjaEZyZXFCeVN0YXRlKGRhdGEsIFwiMjAxM1wiKSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGZpbHRlcmVkRGF0YSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzcmlyYWNoYVNlYXJjaEZyZXFCeVN0YXRlKTtcblxuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWREYXRhID0gZGF0YS5maWx0ZXIoZGF0dW0gPT4gZGF0dW0ueWVhciA9PT0gXCIyMDA2XCIpOyAvLyB0aGUgeWVhciBpcyBoYXJkY29kZWQgcmlnaHQgbm93IC0tPiBuZWVkIHRvIHVzZSBhIHllYXIgdmFyaWFibGUgdGhhdCB3aWxsIGdldCBwYXNzZWQgaW4gZnJvbSBvdXRzaWRlXG4gICAgICAgICAgICBsZXQgc3JpcmFjaGFTZWFyY2hGcmVxQnlTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgZmlsdGVyZWREYXRhLmZvckVhY2goZGF0dW0gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXR1bS5zcmlyYWNoYSA9PT0gXCIwXCIgJiYgZGF0dW0udGFiYXNjbyA9PT0gXCIwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3JpcmFjaGFTZWFyY2hGcmVxQnlTdGF0ZVtkYXR1bS5SZWdpb25dID0gLTAuMjsgLy8gb3Igc2hvdWxkIGl0IGJlIDAuNT9cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzcmlyYWNoYVNlYXJjaEZyZXFCeVN0YXRlW2RhdHVtLlJlZ2lvbl0gPSBwYXJzZUZsb2F0KGRhdHVtLnNyaXJhY2hhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc3ZnLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3RhdGVzXCIpXG4gICAgICAgICAgICAgICAgLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAgICAgICAgICAgICAuZGF0YSh0b3BvanNvbi5mZWF0dXJlKHVzLCB1cy5vYmplY3RzLmNiXzIwMThfdXNfc3RhdGVfNW0pLmZlYXR1cmVzKVxuICAgICAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAgICAgLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgICAgICAuYXR0cihcImRcIiwgcGF0aClcbiAgICAgICAgICAgICAgICAvLyAuc3R5bGUoXCJmaWxsXCIsIFwiIzFhNmIxYVwiKTsgIC8vIHVsdGltYXRlbHksIHdlIHdhbnQgdG8gZmlsbCB0aGUgY29sb3IgZHluYW1pY2FsbHlcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VhcmNoRnJlcSA9IHNyaXJhY2hhU2VhcmNoRnJlcUJ5U3RhdGVbZC5wcm9wZXJ0aWVzLk5BTUVdO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZC5wcm9wZXJ0aWVzLk5BTUUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sb3Ioc2VhcmNoRnJlcSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiBcInB1cnBsZVwiO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICAvLyBJTVBPUlRBTlQgTk9URTogUklHSFQgTk9XLCBUSElTIElTIENPREUgSSBXUk9URSBGT1IgQSBUVVRPUklBTCwgQVMgUFJPT0YgT0YgQ09OQ0VQVFxuICAgIC8vIE5PVCBNWSBPV04gUFJPSkVDVCBDT0RFIChidXQgSSBkaWRuJ3QganVzdCBjb3B5IC8gcGFzdGUpXG4gICAgLy8gVHV0b3JpYWwgc291cmNlOiBodHRwOi8vZHVzcHZpei5taXQuZWR1L2QzLXdvcmtzaG9wL21hcHBpbmctZGF0YS13aXRoLWQzL1xuXG4gICAgLy8gVFVUT1JJQUwgQ09ERVxuICAgIC8vIGQzLmpzb24oXCJhc3NldHMvZGF0YS91cy5qc29uXCIpLnRoZW4odXMgPT4ge1xuICAgIC8vICAgICBkMy50c3YoXCJhc3NldHMvZGF0YS91c191bmVtcGxveW1lbnRfMjAwOC50c3ZcIikudGhlbih1bmVtcGxveW1lbnQgPT4geyAgIC8vIGxvYWQgcmVhbCBHb29nbGUgdHJlbmRzIGRhdGEgaGVyZVxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2codXMub2JqZWN0cy5zdGF0ZXMpO1xuICAgIC8vICAgICAgICAgY29uc29sZS5sb2codW5lbXBsb3ltZW50KTtcblxuICAgIC8vICAgICAgICAgbGV0IHJhdGVCeUlkID0ge307ICAvLyBlbXB0eSBvYmplY3QgdG8gaG9sZCBkYXRhc2V0XG4gICAgLy8gICAgICAgICB1bmVtcGxveW1lbnQuZm9yRWFjaChkID0+IHtcbiAgICAvLyAgICAgICAgICAgICByYXRlQnlJZFtkLmlkXSA9IGQucmF0ZTsgICAgLy8gcG9wdWxhdGUgb2JqZWN0IHdpdGggZWFjaCBjb3VudHkncyByYXRlIChyZXRyaWV2ZSBhbmQgc2V0IGF0IGEga2V5IG9mIGVhY2ggY291bnR5J3MgaWQpXG4gICAgLy8gICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJhdGVCeUlkKTtcblxuICAgIC8vICAgICAgICAgc3ZnLmFwcGVuZChcImdcIilcbiAgICAvLyAgICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3RhdGVzXCIpXG4gICAgLy8gICAgICAgICAgICAgLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAvLyAgICAgICAgICAgICAuZGF0YSh0b3BvanNvbi5mZWF0dXJlKHVzLCB1cy5vYmplY3RzLnN0YXRlcykuZmVhdHVyZXMpIC8vIEJpbmQgVG9wb0pTT04gZGF0YSBlbGVtZW50c1xuICAgIC8vICAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcInBhdGhcIilcbiAgICAvLyAgICAgICAgICAgICAuYXR0cihcImRcIiwgcGF0aClcbiAgICAvLyAgICAgICAgICAgICAvLyAuc3R5bGUoXCJmaWxsXCIsIGQgPT4ge1xuICAgIC8vICAgICAgICAgICAgIC8vICAgICBsZXQgcmF0ZVZhbHVlID0gcmF0ZUJ5SWRbZC5pZF07IC8vIGdldCB1bmVtcGxveW1lbnQgcmF0ZSBmb3IgdGhlIGdpdmVuIGRhdGEgcG9pbnQgKG1hdGNoIGJ5IGlkKVxuICAgIC8vICAgICAgICAgICAgIC8vICAgICByZXR1cm4gY29sb3IocmF0ZVZhbHVlKTsgICAgLy8gcGFzcyB1bmVtcGxveW1lbnQgcmF0ZSBpbnRvIGNvbG9yIGZ1bmN0aW9uIChkZWZpbmVkIGJlbG93KSB0byBnZXQgdGhlIGNvcnJlY3QgZmlsbCBjb2xvclxuICAgIC8vICAgICAgICAgICAgIC8vIH0pO1xuICAgIC8vICAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgXCIjMDA4MDgwXCIpO1xuICAgIC8vICAgICB9KTtcblxuICAgIC8vICAgICBsZXQgY29sb3IgPSBkMy5zY2FsZVRocmVzaG9sZCgpXG4gICAgLy8gICAgICAgICAuZG9tYWluKFswLjAyLCAwLjA0LCAwLjA2LCAwLjA4LCAwLjEwXSlcbiAgICAvLyAgICAgICAgIC5yYW5nZShbXCIjRjBGMEYwXCIsIFwiI2IyZDhkOFwiLCBcIiM2NmIyYjJcIiwgXCIjMDA4MDgwXCIsIFwiIzAwNjY2NlwiLCBcIiMwMDRjNGNcIl0pO1xuICAgIC8vICAgICAgICAgLy8gLnJhbmdlKFtcIiNmMmYwZjdcIiwgXCIjZGFkYWViXCIsIFwiI2JjYmRkY1wiLCBcIiM5ZTlhYzhcIiwgXCIjNzU2YmIxXCIsIFwiIzU0Mjc4ZlwiXSk7ICAvLyBkaWZmZXJlbnQgY29sb3IgcGFsZXR0ZVxuICAgIC8vIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });