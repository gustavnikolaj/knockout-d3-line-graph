# Knockout.js D3 Line Graph

Making a pretty D3.js graph with a knockout binding.

```html
<div data-bind="d3LineGraph: observableArray"></div>
```

## Complex values
To use data objects with the binding, specify how the binding should access the x/y values:

```js
var data = [
    { pos: 0, value: 1 },
    { pos: 1, value: 3 },
    { pos: 2, value: 4 },
    { pos: 4, value: 5 }
];
```

```html
<div data-bind="d3LineGraph: { 
    value: observableArray, 
    y: function(d) { return d.value; }, 
    x: function(d, index) { return d.pos; } 
    }">
</div>
```
The x accessor is optional, if not specified it will use the index of the element as the x-position.

## Axis and formatting
To show the x and y axis on the graph enable it in the binding options:

```html
<div data-bind="d3LineGraph: { value: observableArray, showAxes: true }"></div>
```

### Axis scale options
The scale used for the axis can be specified using the binding options, any d3 scaling function can be used:

```html
<div data-bind="d3LineGraph: { 
    value: observableArray, 
    yScale: d3.time.scale, 
    xScale: d3.scale.linear 
    }">
</div>
```
By default the binding will use the linear scale. Note that specifying a different scale than linear implies using a complex data source so be sure to also specify the x & y accessors.

### Setting additional axis options
It may be required to set additional options on the axis. This can be done using a callback specified in the binding options. 
For example setting the format of a time scale axis:

```js
function xAxisFormatCallback(axis) {
    axis.tickFormat(d3.time.format("%d %H:%M"));
}
```

```html
<div data-bind="d3LineGraph: { 
    value: observableArray, 
    xScale: d3.time.scale, 
    xAxisOptions: xAxisFormatCallback 
    }">
</div>
```
When the graph is rendered the callback will be invoked and additional options included.

# Graph styling
Styling is handled with CSS, see the example for more details.

# Examples

Examples are available: https://gustavnikolaj.github.io/knockout-d3-line-graph
