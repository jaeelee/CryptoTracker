import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart() {
    const { coinId } = useOutletContext<ChartProps>();
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
        { refetchInterval: 5000, });

    return (
        <>
            {
                isLoading ? ("Loading..."
                ) : (
                    <ApexChart
                        type="line"
                        series={[
                            {
                                name: "Price",
                                data: data?.map((price) => price.close) as number[], // data를 못읽어 오는 경우 undefind가 되서 오류가 발생 -> as를 이용해 데이터가 number배열임을 강제
                            }
                        ]}
                        options={{
                            yaxis: {
                                show: false,
                            },
                            xaxis: {
                                type: "datetime",
                                categories: data?.map((price) => price.time_close),
                                labels: {
                                    show: false,
                                },
                                axisTicks: {
                                    show: false,
                                }
                            },
                            theme: {
                                mode: "dark",
                            },
                            chart: {
                                background: "transparent",
                                height: 300,
                                width: 500,
                                toolbar: {
                                    show: false,
                                },
                            },
                            stroke: {
                                curve: 'smooth',
                                width: 3,
                            },
                            colors: ["#f1c40f"],
                            tooltip: {
                                y: {
                                    formatter: (value) => `$ ${value.toFixed(3)}`,

                                }
                            }
                        }} />
                )}
        </>
    );
}

export default Chart;