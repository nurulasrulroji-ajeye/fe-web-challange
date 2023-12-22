import axios from "axios";

const connect = axios.create({
  baseURL: "https://swapi.dev/api"
})
export class FilmServices {
  async getAllFilm() {
    const { data } = await connect.get("/people")
    return data
  }
}
