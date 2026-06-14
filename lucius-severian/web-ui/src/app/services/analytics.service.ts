import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  
  // Use the protobuf-compatible OTLP/HTTP path
  private readonly endpoint = 'http://localhost:4318/v1/traces';
  private readonly serviceName = 'web-ui';
  private sessionId = Math.random().toString(36).substring(2, 15);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initPageTracking();
      this.trackEvent('app_start', { 'session.id': this.sessionId });
    }
  }

  trackEvent(name: string, attributes: Record<string, any> = {}) {
    if (!isPlatformBrowser(this.platformId)) return;

    const now = Date.now();
    const startTimeUnixNano = (now * 1000000).toString();
    // Spans need a non-zero duration
    const endTimeUnixNano = ((now + 1) * 1000000).toString();

    // Ensure traceId is 32 hex chars and spanId is 16 hex chars
    const traceId = this.generateId(16);
    const spanId = this.generateId(8);

    const otlpAttributes = Object.entries(attributes).map(([key, value]) => ({
      key,
      value: this.toOtlpValue(value)
    }));

    otlpAttributes.push({ key: 'session.id', value: { stringValue: this.sessionId } });

    const body = {
      resourceSpans: [{
        resource: {
          attributes: [
            { key: 'service.name', value: { stringValue: this.serviceName } }
          ]
        },
        scopeSpans: [{
          spans: [{
            traceId: traceId,
            spanId: spanId,
            name: name,
            kind: 1, // SPAN_KIND_INTERNAL
            startTimeUnixNano: startTimeUnixNano,
            endTimeUnixNano: endTimeUnixNano,
            attributes: otlpAttributes,
            status: { code: 0 } // STATUS_CODE_UNSET
          }]
        }]
      }]
    };

    fetch(this.endpoint, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      mode: 'cors'
    }).catch(err => console.debug('OTel export failed:', err));
  }

  private initPageTracking() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.trackEvent('page_view', { 
        'http.url': event.urlAfterRedirects,
        'page.title': document.title
      });
    });
  }

  private toOtlpValue(value: any) {
    if (typeof value === 'number') return { doubleValue: value };
    if (typeof value === 'boolean') return { boolValue: value };
    return { stringValue: String(value) };
  }

  private generateId(bytes: number): string {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < bytes * 2; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
