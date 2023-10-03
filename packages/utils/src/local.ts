export class LocalService {
    static get<T>(key: string): T | null {
        const data = localStorage.getItem(key);
        if (data !== null) {
            return JSON.parse(data) as T;
        }
        return null;
    }
    static set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}