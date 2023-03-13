import axios from "axios";

export default class ApiService {
    private static mainUrl: string = 'https://hacker-news.firebaseio.com';
    private static limit: number = 100;

    static fetchIds(): Promise<number[]> {
        return axios.get(`${this.mainUrl}/v0/newstories.json?print=pretty&orderBy="$key"&limitToFirst=${this.limit}`)
            .then(res => res.data);
    }

    static fetchOne<T>(id: number): Promise<T> {
        return axios.get<T>(`${this.mainUrl}/v0/item/${id}.json`)
            .then(res => res.data);
    }

    static async fetchList<T>(ids: number[]): Promise<T[]> {

        return await Promise.all(
            ids.map(id => {
                return this.fetchOne<T>(id)
            })
        )
    }
}