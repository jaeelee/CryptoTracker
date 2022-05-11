import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

function Routers() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                {/* <Route path="/:coinId/*" element={<Coin />}> */}
                <Route path="/:coinId" element={<Coin />}>
                    <Route path="price" element={<Price />} />
                    <Route path="chart" element={<Chart />} />
                </Route>
                <Route path="/" element={<Coins />}></Route>
            </Routes>
        </Router>
    )

}

export default Routers;