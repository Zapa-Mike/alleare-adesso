import { Injectable } from '@angular/core';
@Injectable()
export class RouteNameResolverService {
  constructor() {}

  public resolveRoute(route: string): string {
    if (!route || route == '/') {
      return 'Home';
    }
    let displayRoute = route.substring(1);
    displayRoute = displayRoute[0].toUpperCase() + displayRoute.substring(1);
    return displayRoute;
  }
}
