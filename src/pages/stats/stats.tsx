import { useEffect, useRef } from 'preact/hooks';
import './style.css';
import * as d3 from 'd3';

interface DataPoint {
    date: Date;
    value: number;
}

const MyDataViz: preact.FunctionalComponent = () => {
    const d3Container = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (d3Container.current) {
            const margin = { top: 40, right: 30, bottom: 50, left: 60 },
                width = 600 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            const svg = d3
                .select(d3Container.current)
                .attr('viewBox', `0 0 600 400`)
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            svg.append('text')
                .attr('x', (width + margin.left + margin.right) / 2)
                .attr('y', margin.top / 2)
                .attr('text-anchor', 'middle')
                .style('font-size', '16px')
                .style('text-decoration', 'underline')
                .text('Gráfico de Ejemplo');

            d3.csv<DataPoint>(
                '../../../connectedscatter.csv',
                (d) => ({
                    date: d3.timeParse('%Y-%m-%d')(d.date) as Date,
                    value: +d.value,
                })
            ).then((data) => {
                if (data) {
                    const x = d3
                        .scaleTime()
                        .domain(d3.extent(data, (d) => d.date) as [Date, Date])
                        .range([0, width]);

                    svg.append('g')
                        .attr('transform', `translate(0,${height})`)
                        .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%b %d'))) 
                        .style('font-size', '18px')
                        .selectAll('text')
                        .style('fill', '#bbb7b2')
                        .attr('transform', 'rotate(-45)') 
                        .style('text-anchor', 'end'); 

                    const y = d3.scaleLinear().domain([30, 120]).range([height, 0]);
                    svg.append('g')
                        .call(d3.axisLeft(y))
                        .style('color', '#bbb7b2')
                        .style('font-size', '18px')
                        .selectAll('text')
                        .style('fill', '#bbb7b2');

                    svg.append('path')
                        .datum(data)
                        .attr('fill', 'none')
                        .attr('stroke', '#413a3a')
                        .attr('stroke-width', 1.5)
                        .attr(
                            'd',
                            d3.line<DataPoint>()
                                .x((d) => x(d.date))
                                .y((d) => y(d.value))
                        );

                    svg.append('g')
                        .selectAll('dot')
                        .data(data)
                        .enter()
                        .append('circle')
                        .attr('cx', (d) => x(d.date))
                        .attr('cy', (d) => y(d.value))
                        .attr('r', 5)
                        .attr('fill', '#d42020');
                }
            });
        }
    }, []);

    return (
        <div id="my_dataviz" class="chart-container">
            <svg ref={d3Container}></svg>
        </div>
    );
};

export default MyDataViz;
