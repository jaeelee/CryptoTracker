import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { getParseTreeNode } from "typescript";

const PriceView = styled.div`
display: flex;
background-color: ${(props) => props.theme.cardColor};
padding:10px;
border-radius: 10px;
justify-content: space-between;
margin-bottom: 10px;

`;

const Text = styled.span<{ isDown?: boolean }>`
color:${(props) => props.isDown === undefined ? props.theme.textColor : props.isDown ? "#FF1700" : "#4E944F"};
`;

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

interface PriceProps {
    coinId: string;
    tickersData: IPriceData;
}

function Price() {
    const { coinId, tickersData } = useOutletContext<PriceProps>();

    return (
        <>
            <PriceView >
                <Text>Price:</Text>
                <Text>$ {tickersData.quotes.USD.price.toFixed(2)}</Text>
            </PriceView>
            <PriceView >
                <Text>ATH: </Text>
                <Text>$ {tickersData.quotes.USD.ath_price.toFixed(2)}</Text>
            </PriceView>
            <PriceView >
                <Text>market cap: </Text>
                <Text>$ {tickersData.quotes.USD.market_cap.toFixed(2)}</Text>
            </PriceView>
            <PriceView >
                <Text>Percent Chagne(24h):</Text>
                <Text isDown={tickersData.quotes.USD.percent_change_24h < 0}>
                    {tickersData.quotes.USD.percent_change_24h}%
                </Text>
            </PriceView>
            <PriceView >
                <Text>Volume(24h):</Text>
                <Text>
                    $ {tickersData.quotes.USD.volume_24h.toFixed(2)}
                </Text>
            </PriceView>
        </>
    );
}

export default Price;
