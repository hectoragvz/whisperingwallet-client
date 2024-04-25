/* eslint-disable react/prop-types */
import { VictoryPie, VictoryLabel } from "victory";

function Chart({ data }) {
  return (
    <div className="sm:size-60 size-72">
      <VictoryPie
        animate={{ duration: 200 }}
        colorScale="cool"
        data={data}
        labelComponent={
          <VictoryLabel angle={0} style={[{ fill: "black", fontSize: 20 }]} />
        }
      />
    </div>
  );
}

export default Chart;
