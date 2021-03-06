import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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
    const isDark = useRecoilValue(isDarkAtom);
    const { coinId } = useOutletContext<ChartProps>();
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
        { refetchInterval: 5000, });

    return (
        <>
            {
                isLoading ? ("Loading..."
                ) : (
                    <ApexChart
                        type="candlestick"
                        series={[
                            {
                                name: "Price",
                                data: data?.map((price) => {
                                    return [Date.parse(price.time_open),
                                    price.open.toFixed(2),
                                    price.high.toFixed(2),
                                    price.low.toFixed(2),
                                    price.close.toFixed(2)];
                                }) as []
                            }
                        ]}
                        options={{
                            yaxis: {
                                show: false,
                            },
                            xaxis: {
                                type: "datetime",
                                labels: {
                                    show: false,
                                },
                            },
                            theme: {
                                mode: isDark ? "dark" : "light",
                            },
                            chart: {
                                background: "transparent",
                                height: 300,
                                width: 500,
                                toolbar: {
                                    show: false,
                                },
                            },
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