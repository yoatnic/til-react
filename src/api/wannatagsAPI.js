// @flow

export default class WannatagsAPI {
  static async get(params: {
    postDate?: number,
    limit?: number,
    compare?: "newer" | "older"
  }) {
    const queryParams = [
      params.postDate > 0 ? `postDate=${params.postDate}` : "",
      params.compare ? `compare=${params.compare}` : "",
      params.limit ? `limit=${params.limit}` : ""
    ].filter(s => !!s);
    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    const res = await fetch(`wannatags${queryString}`);
    return res.json();
  }

  static async post(data) {
    const method = "POST";
    const body = JSON.stringify(data);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    return fetch("/wannatags", {
      method,
      headers,
      body
    });
  }

  static async remove(wannatagId) {
    const res = fetch(`/wannatags/${wannatagId}`, {
      method: "DELETE"
    });
    return res.ok;
  }
}
