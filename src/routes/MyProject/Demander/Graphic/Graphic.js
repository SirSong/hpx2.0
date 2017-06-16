/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import fetch from '../../../../core/fetch';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import './Graphic.css'

class Graphic extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      graphicData: {
        x: [],
        y: {
          purchaserF: [],
          purchaserS: [],
          purchaserT: [],
        },
      },
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const self = this;
    fetch('/data/GraphicData.json')
        .then(response => response.json()).then((json) => {
          self.setState({ graphicData: json });
        }).catch((ex) => {
          console.log('parsing failed', ex);
        });
  }

  getMin = (y) => {
    let arr = [];
    arr = arr.concat(y.purchaserF).concat(y.purchaserS).concat(y.purchaserT)
    return Math.min.apply(this,arr);
  }

  getMax = (y) => {
    let arr = [];
    arr = arr.concat(y.purchaserF).concat(y.purchaserS).concat(y.purchaserT);
    return Math.max.apply(this,arr);
  }

  getOption = data => ({
    tooltip: {
      trigger: 'axis',
      formatter: '{a0}: {c0}%<br />{a1}: {c1}%<br />{a2}: {c2}%',
    },
    legend: {
      data: ['采购方1', '采购方2', '采购方3'],
      x: 'center',
      y: 'bottom',
    },
    
    grid: {
      top: 40,
      left: 32,
      right: 32,
      bottom: 32,
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: data.x,
      },
    ],
    yAxis: [
      {
        type: 'value',
        "max": parseInt(this.getMax(data.y)+1),
        "min": parseInt(this.getMin(data.y)),
        name: '采购额(万元)',
        // nameLocation:'left',
      },
    ],
    series: [
      {
        name: '采购方1',
        type: 'bar',
        stack: '',
        data: data.y.purchaserF,
        itemStyle: {
          normal: {
            color: '#2485fb',
          },
        },
      },
      {
        name: '采购方2',
        type: 'bar',
        stack: '',
        data: data.y.purchaserS,
        itemStyle: {
          normal: {
            color: '#00babc',
          },
        },
      },
      {
        name: '采购方3',
        type: 'bar',
        stack: '',
        data: data.y.purchaserT,
        itemStyle: {
          normal: {
            color: '#d0021b',
          },
        },
      },
    ],
  })

  render() {
    return (
      <ReactEcharts
        option={this.getOption(this.state.graphicData)}
        notMerge
        lazyUpdate
        className="echarts-for-echarts"
      />
    );
  }
}

export default Graphic;
