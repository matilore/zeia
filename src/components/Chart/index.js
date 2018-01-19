import React from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { max } from 'underscore';
import moment from 'moment';

class Chart extends React.Component {

    constructor() {
        super();
        this.state = {};
    }





    render() {
        const { data } = this.props;
        const maxValue = max(data, dataPoint => dataPoint.close);
        const formattedData = data.map((dataPoint) => {
            dataPoint.time = moment(new Date(dataPoint.time)).format("HH");
            return dataPoint;
        })

        return (
            <LineChart width={600} height={300} data={formattedData}>
                <Line type="monotone" dataKey="close" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey='time'/>
                <YAxis domain={[0, maxValue]}/>
            </LineChart>
        )
    }
}

export default Chart