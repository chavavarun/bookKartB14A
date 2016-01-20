import * as React from "react";
import * as _ from "lodash";

const Rcslider = require("rc-slider")
import "../styles/index.scss";

import {
	SearchkitManager,
	SearchkitComponent,
	SearchkitComponentProps,
	FastClick,
	RangeAccessor
} from "../../../../../core"

export interface RangeFilterProps extends SearchkitComponentProps {
	field:string
  min:number
  max:number
  id:string
	title:string
	showHistogram?:boolean
}

export class RangeFilter extends SearchkitComponent<RangeFilterProps, any> {
	accessor:RangeAccessor

	static propTypes = _.defaults({
		field:React.PropTypes.string.isRequired,
		title:React.PropTypes.string.isRequired,
		id:React.PropTypes.string.isRequired
	}, SearchkitComponent.propTypes)

	defineAccessor() {
		return new RangeAccessor(
			this.props.id,
			{id: this.props.id, title:this.props.title, min:this.props.min, max:this.props.max, field:this.props.field}
		)
	}

	defineBEMBlocks() {
		let block = this.props.mod || "range-filter"
		return {
			container: block,
			labels: block+"-value-labels"
		}
	}

  sliderUpdate(newValues) {
    this.accessor.state = this.accessor.state.setValue({min:newValues[0], max:newValues[1]})
		this.forceUpdate()
	}
	sliderUpdateAndSearch(newValues){
		this.sliderUpdate(newValues)
		this.searchkit.performSearch()
	}

	getMaxValue() {
		if (this.accessor.getBuckets() == 0) return 0
		return _.max(_.pluck(this.accessor.getBuckets(), "doc_count"))
	}

	getHistogram() {
		if (!this.props.showHistogram) return null

		let maxValue = this.getMaxValue()

		if (maxValue === 0) return null

		let bars = _.map(this.accessor.getBuckets(), (value:any, i) => {
			return (
				<div className="bar-chart__bar"
					key={value.key}
					style={{
						height:`${(value.doc_count/maxValue)*100}%`
					}}>
				</div>
			)
		})

		return (
			<div className="bar-chart">
				{bars}
			</div>
		)

	}

	render() {
		var block = this.bemBlocks.container
		var histogram = this.getHistogram()

		var classname = block().state({
			disabled:this.getMaxValue() == 0,
			"no-histogram": histogram == null
		})
		var sliderClassname = block("bar-chart").toString()

		return (
			<div className={classname}>
				<div className={block("header")}>{this.translate(this.props.title)}</div>
				{histogram}
        <Rcslider
          min={this.props.min}
          max={this.props.max}
          range={true}
					value={[
						_.get(this.accessor.state.getValue(), "min", this.props.min),
						_.get(this.accessor.state.getValue(), "max", this.props.max)
					]}
					onChange={this.sliderUpdate.bind(this)}
          onAfterChange={this.sliderUpdateAndSearch.bind(this)}/>
					<div className={block("x-label").mix(this.bemBlocks.labels())}>
						<div className={this.bemBlocks.labels("min")}>{this.props.min}</div>
						<div className={this.bemBlocks.labels("max")}>{this.props.max}</div>
					</div>
			</div>
		);
	}
}
