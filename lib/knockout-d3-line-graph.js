/*global ko, d3, define*/
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('knockout'), require('d3'));
    } else if (typeof define === 'function' && define.amd) {
        define(['knockout', 'd3'], factory);
    } else {
        factory(ko, d3);
    }
}(this, function (ko, d3) {

    function getPaintingMethods(data, element) {
        var elementRect = element.getBoundingClientRect(),
            width = elementRect.width,
            height = elementRect.height,
            x = d3.scale.linear().domain([0, data.length - 1]).range([0, width]),
            y = d3.scale.linear().domain([-1, d3.max(data) + 1]).range([height, 0]);

        return {
            line: d3.svg.line().interpolate('basis')
                .x(function (d, i) { return x(i); })
                .y(function (d) { return y(d); }),
            area: d3.svg.area().interpolate('basis')
                .x(function (d, i) { return x(i); })
                .y0(height)
                .y1(function (d) { return y(d); })
        };
    }


    ko.bindingHandlers.d3LineGraph = {
        init: function (element, valueAccessor) {
            var bindingContext = ko.utils.unwrapObservable(valueAccessor());
            var elementRect = element.getBoundingClientRect();
            var data = bindingContext;
            var shapes = getPaintingMethods(data, element);

            var svg = d3.select(element).append('svg');

            svg.attr('width', elementRect.width)
               .attr('height', elementRect.height);

            svg.append('path').attr('class', 'area').attr('d', shapes.area(data));
            svg.append('path').attr('class', 'path').attr('d', shapes.line(data));
        },
        update: function (element, valueAccessor) {
            var bindingContext = ko.utils.unwrapObservable(valueAccessor());
            var data = bindingContext;
            var shapes = getPaintingMethods(data, element);

            var svg = d3.select(element).select('svg');

            svg.select('path.area')
               .interrupt()
               .transition()
               .ease('linear')
               .duration(250)
               .attr('d', shapes.area(data));

            svg.select('path.path')
               .interrupt()
               .transition()
               .ease('linear')
               .duration(250)
               .attr('d', shapes.line(data));
        }
    };

    return ko.bindingHandlers.d3LineGraph;

}));
