import axios from "axios";
import { PassThrough, Writable } from "stream";
const API_01 = "http://localhost:3000";
const API_02 = "http://localhost:4000";

const request = await Promise.all([
  axios({
    method: "get",
    url: API_01,
    responseType: "stream",
  }),
  axios({
    method: "get",
    url: API_02,
    responseType: "stream",
  }),
]);

const results = request.map((response) => response.data);

const output = new Writable({
  write(chunk, encoding, callback) {
    const data = chunk.toString().replace(/\n/g, "");
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;
    console.log(`[${name.toLowerCase()}] ${data}`);
    callback();
  },
});

function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    // impede que a stream feche sozinha
    current.pipe(prev, { end: false });

    // como colocamos end: false, vamos manipular manualmente quando o nosso current terminar
    // quando ele terminar, vamos verificar se todos no pipeline se encerraram
    // ele vai então forcar a cadeia do anterior a se fechar
    current.on("end", () => items.every((s) => s.ended) && prev.end());
    return prev;
  }, new PassThrough());
}

merge(results).pipe(output);
// results[0].pipe(output);
// results[1].pipe(output);
