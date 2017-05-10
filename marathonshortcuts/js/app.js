(function () {
    $(document).ready(function () {

        function drawChart(runner) {
            var svg = d3.select("." + runner),
                margin = {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 50
                },
                width = +svg.attr("width") - margin.left - margin.right,
                height = +svg.attr("height") - margin.top - margin.bottom,
                g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var x = d3.scaleLinear()
                .range([0, width])
                .domain([0, 42.195]);

            var y = d3.scaleLinear()
                .range([height, 0])
                .domain(data[runner].domain);

            var line = d3.line()
                .x(function (d) {
                    return x(d.distance_marker);
                })
                .y(function (d) {
                    return y(d.speed);
                });

            g.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .select(".domain"); 
            
            g.append('text')
                .attr('x', x(42.195))
                .attr('y', height + 30)
                .attr('class', 'annotation')
                .attr("text-anchor", "end")
                .text('Checkpoints (km)');
            
            g.append('text')
                .attr('x', '6')
                .attr('y', y(10))
                .attr('dy', '4px')
                .attr('class', 'annotation')
                .text('- - - Usain Bolt top speed');
            
            g.append('text')
                .attr('x', '6')
                .attr('y', y(5.2))
                .attr('dy', '5px')
                .attr('class', 'annotation')
                .text('- - - Marathon winner');
            
            g.append('text')
                .attr('x', x(21.0975))
                .attr('dx', '-0.2em')
                .attr("dy", "0.5em")
                .attr('y', height + 10.5)
                .attr('class', 'annotation axisAnnotation')
                .text('Half');
            
            g.append('rect')
                .attr('x', x(21.0975))
                .attr('y', height)
                .attr('fill', 'black')
                .attr('height', '6px')
                .attr('width', '1px');

            g.append("g")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "-3.2em")
                .attr("dx", "0.71em")
                .attr("text-anchor", "end")
                .attr('class', 'annotation')
                .text("Speed (m/s)");

            g.selectAll('.column')
                .data(data[runner].misssingCheckpoints)
                .enter()
                .append("rect")
                .attr('fill', 'red')
                .attr('fill-opacity', '0.7')
                .attr('x', function (d) {
                    console.log(d);
                    return x(d) - 1.5;
                })
                .attr('y', 0)
                .attr('height', height)
                .attr('width', '4px')

            g.append("path")
                .datum(data[runner].raceData)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("d", line);

        }
        
        $('svg').attr('width', $('.container').width());

        $.each(data, function (key, value) {
            drawChart(key);
        });
    })
})();