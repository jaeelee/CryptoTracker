// import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
background-color:white;
color:${(props) => props.theme.bgColor};
margin-bottom: 10px;
border-radius: 15px;
a{
    padding:20px;
    transition: color 0.2s ease-in;
    display:flex;
    align-items: center; 
}
&:hover{
    a{
        color:${(props) => props.theme.accentColor};
    }
}
`;

const Title = styled.h1`
font-size: 48px;
color:${(props) => props.theme.accentColor};
`

const Loader = styled.span`
text-align: center;
display: block;
`;

const Img = styled.img`
width: 35px;
height: 35px;
margin-right: 10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    // react-query 사용하기
    // useQuery(queryKey, fetch함수)
    // queryKey : query의 고유 식별자
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    /*     const [coins, setCoins] = useState<ICoin[]>([]);
        const [loading, setLoading] = useState(true);
    
        useEffect(() => {
            (async () => {
                const response = await fetch("https://api.coinpaprika.com/v1/coins");
                const json = await response.json();
                setCoins(json.slice(0, 100));
                setLoading(false);
            })(); // 만들어진 함수 바로 실행
        }, []); */

    return (
        <Conatiner>
            <Helmet>
                <title>Coins</title>
            </Helmet>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? (
                <Loader>loading...</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin) => <Coin key={coin.id}>
                        <Link to={`/${coin.id}/chart`} state={{ name: coin.name }}>
                            <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                            {coin.name} &rarr;
                        </Link >
                    </Coin>
                    )}
                </CoinsList>
            )}
        </Conatiner>
    );
}

export default Coins;