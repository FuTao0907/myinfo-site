interface ViewTransition {
  ready: Promise<void>
}

interface Document {
  startViewTransition?: (updateCallback: () => void) => ViewTransition
}

interface Window {
  _AMapSecurityConfig?: {
    securityJsCode: string
  }
}
