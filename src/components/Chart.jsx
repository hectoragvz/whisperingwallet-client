/* eslint-disable react/prop-types */
import { VictoryPie, VictoryLabel } from "victory";

function Chart({ data }) {
  return (
    <div className="size-60">
      <VictoryPie
        animate={{ duration: 200 }}
        colorScale="cool"
        data={data}
        cornerRadius={({ datum }) => datum.y * 1}
        labelComponent={
          <VictoryLabel angle={0} style={[{ fill: "black", fontSize: 20 }]} />
        }
      />
    </div>
  );
}

export default Chart;