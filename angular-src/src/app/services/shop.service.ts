import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../../../../shared/interfaces";
import { environment } from "../../environments/environment";

@Injectable()
export class ShopService {
    constructor(private readonly http: HttpClient) { }

    private getEndpoint(): string {
        return `${environment.serverUrl}/api/shop`
    }

    getItemsByFilter(filter: string): Observable<Item[]> {
        return this.http.get(`${this.getEndpoint()}?filter=${filter}`) as Observable<Item[]>;
    }
}