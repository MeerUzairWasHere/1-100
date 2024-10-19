import { PubSubManager } from "./Manager";

setInterval(() => {
  PubSubManager.getInstance().userSubscribe(Math.random().toString(), "APPL");
}, 5000);
