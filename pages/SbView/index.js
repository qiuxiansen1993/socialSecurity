import { get, post } from "../utils/main";
import {
    querySbData
  } from "../utils/api/tool";
import "./index.scss";
const handleRefreshEvent = ()=>{
    document.getElementById('refresh').addEventListener("tap",async function (e) {
        window.location = `${document.location.protocol}//${window.location.host}${'/sbinfo/querySbData.php?refresh=1'}`;
    }); 
}
handleRefreshEvent();