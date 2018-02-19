// Angular Imports
import { Directive, ElementRef, Input, NgModule, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import * as d3 from 'd3-format';
import * as c3 from 'c3';
import 'c3/c3.min.css'

@Directive({
    selector: 'c3-gauge'
})
export class GaugeDirective implements OnChanges, OnInit {

    @Input() public data: any;
    @Input() public chartOptions: any;
    @Input() public configs: c3.ChartConfiguration;
    @Input() public type: any;

    private element: ElementRef;
    private chart: c3.ChartAPI;
    private _f: (n: number) => string = (n: number) => { return n < 100 ? d3.format('.1f')(n) : d3.format('.0f')(n) };

    constructor(el: ElementRef) { this.element = el; }

    ngOnInit() {
        let options: c3.ChartConfiguration = {
            bindto: this.element.nativeElement,
            data: {
                columns: [[this.data[0] || ' ', this.data[1] || 0]],
                type: this.type || 'gauge',
            },
            legend: {
                show: false
            },
            gauge: {
                label: {
                    format: (valor) => {
                        //console.log(valor);
                        return this._f(valor) + ' ' + (this.chartOptions.unidade || '')
                    }
                },
                max: this.chartOptions.max || 50,
                // units: this.chartOptions.unidade || '',
                width: 20
            },
            color: {
                pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'].reverse(), // the three color levels for the percentage values.
                threshold: {
                    max: this.chartOptions.max,
                    values: [60, 80, 90, 100]
                }
            },
            size: {
                height: 100,
                width: 250
            }
        }
        this.chart = c3.generate(options);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data && !changes.data.isFirstChange()) {
            //console.log(changes.data.currentValue);
            this.chart.load({ columns: [changes.data.currentValue] });
            //this.chart.resize();
        }
    }
}

@NgModule({
    imports: [],
    declarations: [GaugeDirective],
    exports: [GaugeDirective]
})
export class GaugeDirectiveModule {

}
