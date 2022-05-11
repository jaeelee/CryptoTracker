// import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, Outlet, useLocation, useParams, useMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTicker } from "../api";
import { Helmet } from "react-helmet-async";

const Conatiner = styled.div`
padding:0px 20px;
margin:0 auto;
max-width: 480px;
`;
const Header = styled.header`
height:15vh;
display:flex;
justify-content: center;
align-items: center;
`;
const Title = styled.h1`
font-size: 48px;
color:${(props) => props.theme.accentColor};
`
const Loader = styled.span`
text-align: center;
display: block;
`;
const Overview = styled.div`
   display: flex;
   justify-content: space-around;
   background-color: rgba(0, 0, 0, 0.5);
   padding: 10px 20px;
   border-radius: 10px;
 `;
const OverviewItem = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;

   span:first-child {
     font-size: 10px;
     font-weight: 400;
     text-transform: uppercase;
     margin-bottom: 5px;
   }
 `;
const Description = styled.p`
   margin: 20px 0px;
 `;
const Tabs = styled.div`
display:grid;
grid-template-columns: repeat(2,1fr);
margin:25px 0px;
gap:10px;

`;
const Tab = styled.span<{ isActive: boolean }>`
text-align:center;
text-transform: uppercase;
font-size: 16px;
font-weight: 400;
/* background-color: rgba(0,0,0,0.5); */
background-color: ${(props) => props.isActive ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)"};
/* padding: 7px 0px; */
border-radius: 10px;
/* color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor}; */
a{
    display: block;
    padding: 7px 0px;
}
`;

// interface RouterParams {
//     coinId: string;
// }
interface IRouteState {
    name: string;
}
interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}
interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

function Coin() {
    // react-router-dom v6 useLocation에 타입 지정
    const state = useLocation().state as IRouteState;
    const priceMatch = useMatch("/:coinId/price");;
    const chartMatch = useMatch("/:coinId/chart");
    // react-router-dom v6 이상이신 분들은 
    //const { coinId } = useParams(); 이렇게만 해주셔도 됩니다. 
    //useParams쓰는 순간 타입이 string or undefined로 됩니다.
    const { coinId } = useParams();
    // react-router-dom v6 미만
    // const { coinId } = useParams<RouterParams>();

    const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId!));// ! :  확장 할당 어션셜로 값이 무조건 할당되어있다고 컴파일러에게 전달해 값이 없어도 변수를 사용할 수 있게 함
    const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
        ["tickers", coinId],
        () => fetchCoinTicker(coinId!),
        {
            refetchInterval: 5000, // 5초마다 refetch
        });
    /*     const [loading, setLoading] = useState(true);
        const [info, setInfo] = useState<IInfoData>();
        const [priceInfo, setPriceInfo] = useState<IPriceData>()
        useEffect(() => {
            (async () => {
                const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
                const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
                setInfo(infoData);
                setPriceInfo(priceData);
                setLoading(false);
            })();
        }, [coinId]); */

    const loading = infoLoading || tickersLoading;
    return (
        <Conatiner>
            <Helmet><title>{state?.name ? state?.name : loading ? "loading..." : infoData?.name}</title></Helmet>

            <Header>
                <Title>{state?.name ? state?.name : loading ? "loading..." : infoData?.name}</Title>
            </Header>
            {loading ? (
                <Loader>loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>
                    <Outlet context={{ coinId }} />
                    {/* <Routes>
                        <Route path="/price" element={<Price />} />
                        <Route path="/chart" element={<Chart />} />
                    </Routes> */}
                </>
            )
            }
        </Conatiner>
    );
}

export default Coin;