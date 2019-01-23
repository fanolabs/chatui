import config from "config"
import auth from "./auth";

const {
  accobot_endpoint,
  speech_endpoint,
  auth_key, corp_id,
  input_language, output_language,
  scope
} = config.accobot


const objToQuery = (obj) => {
  return Object.keys(obj).map(key =>
    (encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
  ).join("&");
}

const api = {

  talk(text) {
    let params = {
      content: text,
      content_type: "text/plain",
      expect_type: "text/plain",
    }
    if (input_language) {
      params["input_language"] = input_language;
    }
    if (output_language) {
      params["output_language"] = output_language;
    }
    return this.call("post", `${accobot_endpoint}`, JSON.stringify(params), {
      "Content-Type": "application/json",
      "scope": scope || "MegaCorp"
    });
  },

  recognize(data) {
    return this.call("post", `${speech_endpoint}`, data);
  },

  call(method, uri, data, headers) {
    const user_id = auth.getUserId() || config.accobot.user_id;
    const authParams = objToQuery({ corp_id, auth_key, user_id });

    let payload = {
      method, mode: 'cors', body: data
    }
    if (headers) {
      payload.headers = headers;
    }

    return window.fetch(`${uri}?${authParams}`, payload)
      .then(res => {
        if (res.status === 200) {
          return res.status === 200 ? res.json() : {}
        } else {
          const respJSON = res.json();
          console.log("err response: ", respJSON);
          throw respJSON;
        }
      })
      .catch(e => {
        console.log("err: ", e);
        throw e;
      })
  },

  

}

export default api;
