import { get, post } from "../utils/main";
import { getSmsCode, bindMobile,login } from "../utils/content";
import "./index.scss";
let token = null
const loginres = get(login);
document
  .getElementById("verificationCode")
  .addEventListener("tap", async function () {
    const res = await post(getSmsCode,{
        mobile:18910319561
    })
    console.log(res)
    token = res
  });
  document
  .getElementById("bindMobileSubmit")
  .addEventListener("tap", async function () {
    const res = await post(bindMobile,{
        mobile:'18910319561',
        token:'99aae9c6452bfd6481d7ccfed7a107ed',
        smsCode:'123456',
    })
  });