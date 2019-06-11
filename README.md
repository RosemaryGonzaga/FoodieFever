# Foodie Fever: A visualization of select food trends from the past decade

### Background and Overview
Google Trends provides a wealth of data ripe for analysis. This project aims to leverage that data to chart the course of various food trends of the past decade, as gauged by internet search volume.

### Functionality and MVP Features
Users will be able to:
- [ ] View a single chart overlaying the timecourses of search popularity for a select list of trendy ingredients or dishes (e.g., avocado toast, bacon, kale, quinoa, sriracha).
- [ ] View a chorepleth (geographic heat map) of regional differences (by state in the U.S.) in popularity for at least one of the select food items.
- [ ] Select from a menu to view a static choropleth for EACH of the select food items. (Interactive element)
- [ ] For at least one food item's choropleth, incorporate a slider for viewing different temporal snapshots of the food's popularity by state. This would allow users to view the propagation of interest across geographic regions over the course of the food's rise and fall in popularity.

Bonus MVPs:
- [ ] Add a play button to automatically loop through all choropleths for a given item for a time lapse effect.
- [ ] Add a pie chart, sunburst, or treemap visualization showing the breakdown of related searches for a particular food item (e.g., bacon ice cream, bacon donuts, bacon vodka...)
- [ ] Incorporate animations using D3 functions
- [ ] Add data captions to highlight interesting patterns, stories, or tidbits
- [ ] Add more food / drink items to the analysis (moscow mule, kombucha, froyo, poke bowls...)

### Architecture and Technologies
* Vanilla Javascript to manipulate data and toggle between different views
* D3.js for data-to-DOM binding and data-based DOM manipulation
* HTML, CSS, SVG for styling of data visuals
* Webpack to bundle files

### Data & APIs
Data will be exported as CSV files (and stored locally) from Google Trends, with a focus on internet searches within the United States: https://trends.google.com/trends/?geo=US

I'll slice the data by region (state) and timeframe. Temporal resolution may vary based on the steepness of each food item's rise and / or fall in popularity.

### Implementation Timeline
Monday
- [ ] Basic D3 tutorials
- [ ] View visualization samples and select a graph type(s)
- [ ] Select a topic and data source(s)
- [ ] Complete proposal

Tuesday
- [ ] D3 tutorials: choropleths
- [ ] Download data for local storage
- [ ] Format data (CSV, JSON)

Wednesday
- [ ] Get familiar with D3 documentation
- [ ] Learn to read data in D3
- [ ] Start manipulating data: create line chart overlay

Thursday
- [ ] Create one choropleth, anchored by a single food item and a single timeframe
- [ ] Create temporal snapshot choropleths for the same food item 
- [ ] Create a slidebar to allow users to interact with the choropleths (to filter by timeframe)

Friday
- [ ] Build out static choropleths for the remaining select food items
- [ ] Create menu allowing user to filter by food item and visualization type
- [ ] Style visualizations with CSS

Saturday
- [ ] Continue styling
- [ ] Deploy site to live URL
- [ ] Work on enhancements / bonuses: temporal snapshot choropleths for other select food items

Sunday
- [ ] Enhancement / bonus: play button for time lapse effect
- [ ] Enhancement / bonus: pie chart, sunburst, or treemap to visualize related searches for a single food item
- [ ] Style enhancements
- [ ] Deploy enhancements